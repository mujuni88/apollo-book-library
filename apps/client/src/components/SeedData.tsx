import { useSeedData } from "../hooks/useSeedData";

export const SeedData = () => {
  const { seedData, loading } = useSeedData();

  return (
    <div className="flex gap-2">
      <button 
        onClick={seedData} 
        disabled={loading}
        className="px-4 py-2 text-sm font-medium rounded-md shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Populating...' : 'Populate Data'}
      </button>
    </div>
  );
};
