type InputCardProps = {
  inputText: string;
  canAnalyze: boolean;
  canEnterText: boolean;
  canReset: boolean;
  onTextChange: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
};

function InputCard({
  inputText,
  canAnalyze,
  canEnterText,
  canReset,
  onTextChange,
  onAnalyze,
  onReset,
}: InputCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 p-4">
      <textarea
        rows={10}
        value={inputText}
        onChange={event => onTextChange(event.target.value)}
        disabled={!canEnterText}
        className="w-full border-2 border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all resize-none text-gray-700 leading-relaxed shadow-sm"
        placeholder="Paste your text here to analyze its topic profile and writing style..."
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          ✨ Analyze Text
        </button>

        <button
          onClick={onReset}
          disabled={!canReset}
          className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default InputCard;
