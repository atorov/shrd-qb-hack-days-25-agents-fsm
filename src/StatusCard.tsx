import type { StateValue } from 'xstate';
import formatStateValue from './utils/format-state-value';

type StatusCardProps = {
  stateValue: StateValue;
  isBusy: boolean;
  isLoading: boolean;
  isPreparing: boolean;
  isSummarizing: boolean;
  isEmbedding: boolean;
  isScoring: boolean;
};

function StatusCard({
  stateValue,
  isBusy,
  isLoading,
  isPreparing,
  isSummarizing,
  isEmbedding,
  isScoring,
}: StatusCardProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Analysis Status</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md border border-blue-200">
          <div
            className={`w-2 h-2 rounded-full ${
              isBusy ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}
          ></div>
          <span className="text-sm font-medium text-gray-700 capitalize">
            {formatStateValue(stateValue)}
          </span>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md">
          <div className="w-4 h-4 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium text-blue-700">Loading AI models...</p>
        </div>
      )}
      {isPreparing && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-purple-100 rounded-md">
          <div className="w-4 h-4 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium text-purple-700">
            Preparing topic vectors...
          </p>
        </div>
      )}
      {isSummarizing && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-green-100 rounded-md">
          <div className="w-4 h-4 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium text-green-700">Summarizing your text...</p>
        </div>
      )}
      {isEmbedding && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-md">
          <div className="w-4 h-4 border-3 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium text-yellow-700">Creating embeddings...</p>
        </div>
      )}
      {isScoring && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-md">
          <div className="w-4 h-4 border-3 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-medium text-orange-700">
            Calculating topic scores...
          </p>
        </div>
      )}
    </>
  );
}

export default StatusCard;
