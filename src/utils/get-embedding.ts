import type { FeatureExtractionPipeline } from '@huggingface/transformers';

async function getEmbedding(
  extractor: FeatureExtractionPipeline,
  text: string
): Promise<Float32Array> {
  const out = await extractor(text, { pooling: 'cls', normalize: true });

  return new Float32Array(out.data as ArrayLike<number>);
}

export default getEmbedding;
