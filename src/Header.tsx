function Header() {
  return (
    <div className="text-center mb-4">
      <div className="inline-flex items-center gap-3 mb-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Text Topic Profiler
        </h1>
      </div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Analyze your writing style with AI-powered topic detection and sentiment
        analysis
      </p>
    </div>
  );
}

export default Header;
