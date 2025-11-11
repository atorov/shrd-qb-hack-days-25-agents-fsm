import type { SummarizationPipeline } from '@huggingface/transformers';
import splitIntoChunks from './split-into-chunks';

async function recursiveSummarize(
  text: string,
  summarizer: SummarizationPipeline,
  options: { maxLen: number; chunkSize: number }
): Promise<string> {
  const { maxLen, chunkSize } = options;

  if (text.length <= maxLen) return text;

  const chunks = splitIntoChunks(text, chunkSize);
  console.log('::: Number of chunks:', chunks.length);

  const summaries: string[] = [];
  for (const chunk of chunks) {
    console.log('::: Chunk length before summarization:', chunk.length);
    const out = await summarizer(chunk, {
      max_new_tokens: 128,
    } as Parameters<SummarizationPipeline>[1]);
    const firstResult = Array.isArray(out) ? out[0] : out;

    if ('summary_text' in firstResult) {
      console.log(
        '::: Chunk length after summarization:',
        firstResult.summary_text.length
      );
      summaries.push(firstResult.summary_text);
    }
  }

  const combined = summaries.join('\n\n');

  if (combined.length <= maxLen) return combined;

  return recursiveSummarize(combined, summarizer, options);
}

export default recursiveSummarize;
