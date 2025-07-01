import { IoAddCircle } from "react-icons/io5";

export function BalanceCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Balance</h3>
        <button className="text-[#049601]">
          <IoAddCircle size={24} />
        </button>
      </div>
      <p className="text-2xl font-semibold text-gray-800 mb-4">
        $ <span className="text-[#049601]">100.23</span>
      </p>
      <div className="w-[250px] p-1 rounded-lg">
        <img src="/glassy.png" />
      </div>
    </div>
  );
}

