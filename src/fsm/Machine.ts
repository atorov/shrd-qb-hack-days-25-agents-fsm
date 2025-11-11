import {
  pipeline,
  type FeatureExtractionPipeline,
  type SummarizationPipeline,
} from '@huggingface/transformers';
import { assign, createMachine, fromPromise } from 'xstate';

import { TOPICS } from '../constants/topics';
import buildTopicVector from '../utils/build-topic-vector';
import computeTopicScores from '../utils/compute-topic-scores';
import delay from '../utils/delay';
import getEmbedding from '../utils/get-embedding';
import recursiveSummarize from '../utils/recursive-summarize';

type Models = {
  extractor: FeatureExtractionPipeline;
  summarizer: SummarizationPipeline;
};

type TopicVectors = Record<keyof typeof TOPICS, Float32Array>;

type TopicScores = Record<keyof typeof TOPICS, number>;

type MachineContext = {
  finalSummary: string;
  inputText: string;
  models: Models | undefined;
  scores: TopicScores | undefined;
  summaryEmbedding: Float32Array | undefined;
  topicVectors: TopicVectors | undefined;
};

type MachineEvents =
  | { type: 'SET_TEXT'; value: string }
  | { type: 'ANALYZE' }
  | { type: 'RESET' };

const Machine = createMachine(
  {
    id: 'TextAnalysis',
    initial: 'LoadingModels',
    types: {} as {
      context: MachineContext;
      events: MachineEvents;
    },
    context: {
      finalSummary: '',
      inputText: '',
      models: undefined,
      scores: undefined,
      summaryEmbedding: undefined,
      topicVectors: undefined,
    },
    states: {
      LoadingModels: {
        invoke: {
          src: 'loadModels',
          onDone: {
            target: 'PreparingTopics',
            actions: assign({
              models: ({ event }) => event.output,
            }),
          },
        },
      },

      PreparingTopics: {
        invoke: {
          src: 'prepareTopics',
          input: ({ context }) => ({ models: context.models }),
          onDone: {
            target: 'Ready',
            actions: assign({ topicVectors: ({ event }) => event.output }),
          },
        },
      },

      Ready: {
        on: {
          SET_TEXT: {
            actions: assign({
              inputText: ({ event }) => event.value,
              finalSummary: () => '',
              summaryEmbedding: () => undefined,
              scores: () => undefined,
            }),
          },
          ANALYZE: {
            target: 'Analyzing',
            guard: ({ context }) =>
              Boolean(context.inputText && context.inputText.trim().length),
          },
        },
      },

      Analyzing: {
        initial: 'Summarizing',
        states: {
          Summarizing: {
            invoke: {
              src: 'summarizeText',
              input: ({ context }) => ({
                models: context.models,
                inputText: context.inputText,
              }),
              onDone: {
                target: 'Embedding',
                actions: assign({ finalSummary: ({ event }) => event.output }),
              },
            },
          },

          Embedding: {
            invoke: {
              src: 'embedSummary',
              input: ({ context }) => ({
                models: context.models,
                finalSummary: context.finalSummary,
              }),
              onDone: {
                target: 'Scoring',
                actions: assign({
                  summaryEmbedding: ({ event }) => event.output,
                }),
              },
            },
          },

          Scoring: {
            invoke: {
              src: 'scoreTopics',
              input: ({ context }) => ({
                topicVectors: context.topicVectors,
                summaryEmbedding: context.summaryEmbedding,
              }),
              onDone: {
                target: '#TextAnalysis.Done',
                actions: assign({ scores: ({ event }) => event.output }),
              },
            },
          },
        },
      },
      Done: {
        on: {
          RESET: {
            target: 'Ready',
            actions: assign({
              inputText: () => '',
              finalSummary: () => '',
              summaryEmbedding: () => undefined,
              scores: () => undefined,
            }),
          },
        },
      },
    },
  },
  {
    actors: {
      loadModels: fromPromise<Models, void>(async () => {
        const extractor = (await pipeline(
          'feature-extraction',
          'mixedbread-ai/mxbai-embed-large-v1'
        )) as unknown as FeatureExtractionPipeline;

        const summarizer = (await pipeline(
          'summarization',
          'Xenova/distilbart-cnn-6-6'
        )) as unknown as SummarizationPipeline;

        return {
          extractor,
          summarizer,
        };
      }),

      prepareTopics: fromPromise<TopicVectors, { models: Models }>(
        async ({ input: { models } }) => {
          await delay();

          const result = {} as Record<string, Float32Array>;
          for (const [topic, examples] of Object.entries(TOPICS)) {
            result[topic] = await buildTopicVector(models.extractor, [
              ...examples,
            ]);
          }

          return result as TopicVectors;
        }
      ),

      summarizeText: fromPromise<string, { models: Models; inputText: string }>(
        async ({ input: { models, inputText } }) => {
          await delay();

          const { summarizer } = models;

          const summary = await recursiveSummarize(inputText, summarizer, {
            maxLen: 1000,
            chunkSize: 1000,
          });
          console.log('::: Final Summary:', summary);

          return summary;
        }
      ),

      embedSummary: fromPromise<
        Float32Array,
        { models: Models; finalSummary: string }
      >(async ({ input: { models, finalSummary } }) => {
        await delay();

        return getEmbedding(models.extractor, finalSummary);
      }),

      scoreTopics: fromPromise<
        TopicScores,
        { topicVectors: TopicVectors; summaryEmbedding: Float32Array }
      >(async ({ input: { topicVectors, summaryEmbedding } }) => {
        await delay();

        return computeTopicScores(
          topicVectors,
          summaryEmbedding
        ) as Promise<TopicScores>;
      }),
    },
  }
);

export default Machine;
