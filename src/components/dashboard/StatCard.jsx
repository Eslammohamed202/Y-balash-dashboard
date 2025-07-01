import { FaArrowTrendUp } from "react-icons/fa6";

export function StatCard({ title, value, icon, change }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] flex items-center justify-between max-w-[210px]">
      <div>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-xs text-[#049601] flex items-center gap-1 mt-2">
          <span className="text-lg"><FaArrowTrendUp /></span> {change}
        </p>
      </div>
      <div className="text-[#124734] text-4xl">{icon}</div>
    </div>
  );
}