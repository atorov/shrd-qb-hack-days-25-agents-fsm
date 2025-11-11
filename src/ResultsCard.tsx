import TopicRadarChart from './TopicRadarChart';

type ResultsCardProps = {
  scores: Record<string, number>;
};

function ResultsCard({ scores }: ResultsCardProps) {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-end gap-2 mb-3">
        <h3 className="text-xl font-bold text-gray-800">Topic Analysis</h3>
      </div>

      {/* Radar Chart */}
      <div className="mb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-md p-4 border border-blue-100">
        <TopicRadarChart scores={scores} />
      </div>

      {/* Topic Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(scores)
          .sort(([, a], [, b]) => Number(b) - Number(a))
          .map(([topic, value]) => {
            const numValue = Number(value);
            const getColorClasses = () => {
              if (numValue >= 70)
                return 'from-green-50 to-emerald-100 border-green-300 text-green-700';
              if (numValue >= 50)
                return 'from-blue-50 to-cyan-100 border-blue-300 text-blue-700';
              if (numValue >= 30)
                return 'from-yellow-50 to-amber-100 border-yellow-300 text-yellow-700';
              return 'from-gray-50 to-slate-100 border-gray-300 text-gray-700';
            };

            return (
              <div
                key={topic}
                className={`relative overflow-hidden rounded-md border-2 p-3 transition-transform hover:scale-105 hover:shadow-lg bg-gradient-to-br ${getColorClasses()}`}
              >
                {/* Topic label and score */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold capitalize text-base">
                    {topic}
                  </span>
                  <span className="text-xl font-bold">{String(value)}%</span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ResultsCard;
