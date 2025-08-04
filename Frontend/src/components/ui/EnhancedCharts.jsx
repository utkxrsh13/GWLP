import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const EnhancedCharts = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const getStatusColor = (level) => {
        if (level < 100) return '#ef4444'; // Red
        if (level < 112.5) return '#f59e0b'; // Orange
        return '#10b981'; // Green
      };

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{`Year: ${label}`}</p>
          <p className="text-blue-600">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            {`Level: ${value.toFixed(2)} feet`}
          </p>
          <p className={`text-sm font-medium`} style={{ color: getStatusColor(value) }}>
            {value < 100 ? '🚨 Critical' : value < 112.5 ? '⚠️ Moderate' : '✅ Good'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-6">
      {/* Main Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📈 Groundwater Level Trends
          </h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Critical (&lt;100ft)</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Moderate (100-112ft)</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Good (&gt;112ft)</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `'${value.slice(-2)}`}
            />
            <YAxis 
              domain={["auto", "auto"]} 
              label={{ 
                value: "Depth (feet)", 
                angle: -90, 
                position: "insideLeft",
                style: { textAnchor: 'middle' }
              }}
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="groundwater_level" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fill="url(#colorGradient)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="text-center">
            <div className="text-2xl mb-1">📊</div>
            <p className="text-sm text-green-600 mb-1">Highest Level</p>
            <p className="font-bold text-lg text-green-800">
              {Math.max(...data.map(d => d.groundwater_level)).toFixed(2)} ft
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <div className="text-center">
            <div className="text-2xl mb-1">⬇️</div>
            <p className="text-sm text-red-600 mb-1">Lowest Level</p>
            <p className="font-bold text-lg text-red-800">
              {Math.min(...data.map(d => d.groundwater_level)).toFixed(2)} ft
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="text-center">
            <div className="text-2xl mb-1">📈</div>
            <p className="text-sm text-blue-600 mb-1">Average Level</p>
            <p className="font-bold text-lg text-blue-800">
              {(data.reduce((sum, d) => sum + d.groundwater_level, 0) / data.length).toFixed(2)} ft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCharts;
