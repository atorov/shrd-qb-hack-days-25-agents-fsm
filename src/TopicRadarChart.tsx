import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

type TopicRadarChartProps = {
  scores: Record<string, number>;
};

function TopicRadarChart({ scores }: TopicRadarChartProps) {
  // Transform the scores object into the format recharts expects
  const data = Object.entries(scores).map(([topic, value]) => ({
    topic: topic.charAt(0).toUpperCase() + topic.slice(1),
    score: value,
  }));

  return (
    <div className="w-full relative">
      <ResponsiveContainer width="100%" height={450}>
        <RadarChart data={data} className="drop-shadow-lg">
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <PolarGrid strokeDasharray="3 3" stroke="#cbd5e1" strokeWidth={1.5} />
          <PolarAngleAxis
            dataKey="topic"
            tick={{
              fill: '#1e293b',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
            stroke="#cbd5e1"
            strokeWidth={1.5}
          />
          <Radar
            name="Topic Scores"
            dataKey="score"
            stroke="url(#radarGradient)"
            fill="url(#radarGradient)"
            fillOpacity={0.6}
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{
              r: 7,
              fill: '#8b5cf6',
              stroke: '#fff',
              strokeWidth: 2,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopicRadarChart;
