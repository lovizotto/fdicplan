import React from "react";

interface SearchInputProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

export function SearchInput({ searchTerm, onChange, defaultValue }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search by name, email, or status"
      value={searchTerm}
      defaultValue={defaultValue}
      onChange={onChange}
      className="w-full border-gray-300 bg-white text-black rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
    />
  );
}
