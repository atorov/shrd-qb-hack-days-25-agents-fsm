import cosineSim from './cosine-sim';

async function computeTopicScores(
  topicVectors: Record<string, Float32Array>,
  embedding: Float32Array
): Promise<Record<string, number>> {
  const scores: Record<string, number> = {};

  for (const [topic, v] of Object.entries(topicVectors)) {
    const sim = cosineSim(embedding, v);
    // const percent = ((sim + 1) / 2) * 100;
    // const percent = ((sim + 1) / 2) ** 2 * 100;
    // const percent = ((sim + 1) / 2) ** 3 * 100;
    // const percent = ((sim + 1) / 2) ** 4 * 100;

    let percent = (sim + 1) / 2;
    if (percent < 0.837) percent **= 2;
    percent *= 100;

    scores[topic] = Math.round(percent);
  }

  return scores;
}

export default computeTopicScores;
