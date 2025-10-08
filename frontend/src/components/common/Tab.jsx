export default function Tab({ tabData, field, setField }) {
  return (
    <div className="flex bg-gray-700 p-1 gap-x-1 my-6 rounded-full max-w-max shadow-inner">
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`py-2 px-5 rounded-full font-medium transition-all duration-200
            ${field === tab.type 
              ? "bg-yellow-400 text-gray-900 shadow" 
              : "bg-transparent text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
        >
          {tab.tabName}
        </button>
      ))}
    </div>
  );
}
