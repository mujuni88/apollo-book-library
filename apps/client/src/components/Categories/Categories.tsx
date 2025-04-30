import { useGetCategories } from "../../hooks/categories/useGetCategories";
import { AddCategory } from "./AddCategory";
import { CategoryItem } from "./CategoryItem";

export function Categories() {
  const { categories, loading, error } = useGetCategories();
  const isEmpty = !categories.length && !loading && !error;

  return (
    <div className="max-w-[500px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl">Categories</h1>
      </div>
      <div className="p-4">
        <AddCategory />
        {isEmpty && (
          <p className="text-center my-5 text-zinc-400">No categories found</p>
        )}
        <ul className="mt-10 p-5 flex flex-col gap-3">
          {categories.map((c) => (
            <CategoryItem key={c.id} name={c.name} id={c.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
