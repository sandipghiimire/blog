"use client";
import { useEffect, useState } from "react";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategory(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return (
    <main>
      <div className="flex flex-col p-10 w-[600px]">
        <h1 className="text-xl font-semibold">Type of Blog</h1>
        <div className="flex flex-wrap gap-3 mt-5">
          {loading
            ? // Skeleton placeholders while loading
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 animate-pulse h-8 w-24 rounded-full"
                ></div>
              ))
            : // Real category chips
              category.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-300 px-4 py-1 rounded-full"
                >
                  {category?.name}
                </div>
              ))}
        </div>
      </div>
    </main>
  );
}
