"use client"
import { useEffect, useState } from "react";

export default function Category() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch('/api/category')
                const data = await res.json();
                setCategory(data.data);
                console.log(data.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategory();
    }, [])

    return <main>
        <div className="flex flex-col p-10 w-[600px]">
            <h1 className="text-xl font-semibold">Type of Blog</h1>
            <div className="flex flex-wrap gap-3 mt-5">
                {category.map((category, index) => {
                    return (
                        <div key={index} className="bg-gray-300 px-4 py-1 rounded-full">
                            {category?.name}
                        </div>
                    )
                })}
            </div>
        </div>
    </main>
}