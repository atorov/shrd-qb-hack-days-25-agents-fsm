function InfoCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg p-4 border-2 border-blue-100">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
          <span className="text-xl">💡</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1.5 text-base">
            How It Works
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Paste your text and our AI analyzes its writing style using advanced
            NLP. Discover how <strong>technical</strong>,{' '}
            <strong>formal</strong>, <strong>emotional</strong>, or{' '}
            <strong>marketing-oriented</strong> your content is - visualized
            with detailed percentages and an interactive radar chart.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
