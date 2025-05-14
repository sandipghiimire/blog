"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function page() {
    const route = useRouter();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Login failed:", data.message);
                return;
            }

            console.log("Login Successfully!", data);
            route.push('/');
        } catch (error) {
            console.error("Error while login!", error);
        }
    };


    return <main className="bg-slate-200 h-screen">
        <form onSubmit={handelSubmit}>
            <div className="grid md:grid-cols-2 grid-row-2">
                <div className=" h-screen flex flex-col justify-center items-center gap-3 border-r-2">
                    <div>
                        <h1 className="text-xl text-black font-semibold">Login Page</h1>
                    </div>
                    <div className="text-black bg-white py-5 px-8 flex flex-col gap-3">
                        <div>
                            <h1>Email</h1>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your Name"
                                type="email"
                                className="px-3 py-2 outline-none ring-2 ring-gray-300 bg-gray-200 rounded-lg w-full"
                            />
                        </div>
                        <div>
                            <h1>Password</h1>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your Name"
                                type="password"
                                className="px-3 py-2 outline-none ring-2 ring-gray-300 bg-gray-200 rounded-lg w-full"
                            />
                        </div>
                        <div>
                            <h1>Don't have an account?
                                <Link href={'/blogsinup'}>SignUp</Link>
                            </h1>
                        </div>
                        <div className="pt-5">
                            <button className="bg-gray-300 w-full px-3 py-1 rounded-full hover:bg-gray-400 hover:text-gray-900 text-gray-600">Login</button>
                        </div>
                    </div>
                </div>
                <div className="md:block hidden">
                    <img src="/buddha.jpg" alt="" className="w-full h-screen object-cover rounded-lg shadow-lg" />
                </div>
            </div>
        </form>
    </main>
}