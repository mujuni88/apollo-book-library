import { useState } from "react";
import { useAddCategory } from "../../hooks/categories/useAddCategory";

export function AddCategory() {
  const [name, setName] = useState("");
  const { addCategory, loading } = useAddCategory();

  return (
    <div>
      <form
        className="grid grid-cols-[1fr_auto] gap-3 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          addCategory({
            variables: { name },
            optimisticResponse: {
              addCategory: {
                id: "temp-id",
                __typename: "Category",
                name,
              },
            },
          });
          setName("");
        }}
      >
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-1 py-1 text-sm bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-indigo-500 dark:text-white"
        />
        <button
          type="submit"
          disabled={!name || loading} // Disable if no name or loading
          className="px-4 py-1.5 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
}
