import React from "react";
import { Link2, LinkIcon, BarChart3, CheckCircle, Timer } from "lucide-react";

const AnalyticsPage: React.FC = () => {
  const totalLinks = 0;
  const totalClicks = 0;
  const activeLinks = 0;
  const rateLimit = 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6 font-sans">
      {/* Page Title */}
      <div className="text-center mb-10 mt-0">
  <h2 className="text-4xl font-bold mb-4">
    Analytics <span className="text-pink-300">Dashboard</span>
  </h2>
  <p className="text-lg max-w-2xl mx-auto text-gray-300">
    Track the performance of your shortened URLs.
  </p>
</div>


      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 text-gray-300">
        <StatCard title="Total Links" value={totalLinks} icon={<LinkIcon className="w-6 h-6 text-pink-300" />} />
        <StatCard title="Total Clicks" value={totalClicks} icon={<BarChart3 className="w-6 h-6 text-purple-300" />} />
        <StatCard title="Active Links" value={activeLinks} icon={<CheckCircle className="w-6 h-6 text-indigo-300" />} />
        <StatCard title="Rate Limit" value={rateLimit} icon={<Timer className="w-6 h-6 text-orange-300" />} />
      </div>

      {/* Recent URLs Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-60 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 text-white">Recent URLs</h2>
        <div className="flex flex-col items-center text-gray-300">
          <Link2 className="w-12 h-12 mb-2 text-pink-400" />
          <p className="text-lg font-medium">No URLs shortened yet</p>
          <p className="text-sm text-purple-200">Create your first short link to see analytics</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

// Reusable Stat Card Component
const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl shadow-md border border-gray-700 flex justify-between items-center transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-pink-500/30">
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
    <div>{icon}</div>
  </div>
);
