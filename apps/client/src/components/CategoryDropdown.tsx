import { Fragment, FC } from 'react';
import { Listbox, Transition, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Category, toCategoryOptions } from "../lib/utils";
import { clsx } from 'clsx';

interface CategoryDropdownProps {
  onCategoryChange: (val: Set<string>) => void;
  categories: Category[];
  selectedCategories: Set<string>;
  placeholder?: string; 
  className?: string; 
}

export const CategoryDropdown: FC<CategoryDropdownProps> = ({
  onCategoryChange,
  categories,
  selectedCategories,
  placeholder = 'Select Category', 
  className,
}) => {
  const options = toCategoryOptions(categories);
  // Convert Set to Array for Headless UI Listbox value prop
  const selectedCategoriesArray = Array.from(selectedCategories);
  // Filter options based on the original Set for display purposes
  const selectedOptions = options.filter(option => selectedCategories.has(option.value));

  return (
    <div className={clsx('w-full relative', className)}> 
      <Listbox 
        value={selectedCategoriesArray} // Pass array to Listbox
        onChange={(newSelectedValues: string[]) => { // Receive array from Listbox
          onCategoryChange(new Set(newSelectedValues)); // Convert back to Set for parent
        }}
        multiple
      >
        {/* {label && <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</Listbox.Label>} */}
        <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
          <span className="block truncate">
            {selectedOptions.length > 0
              ? selectedOptions.map(o => o.label).join(', ')
              : <span className="text-gray-500 dark:text-gray-400">{placeholder}</span> }
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-indigo-100 dark:bg-indigo-600 text-indigo-900 dark:text-white' : 'text-gray-900 dark:text-gray-200'
                  }`
                }
                value={option.value} 
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
};
