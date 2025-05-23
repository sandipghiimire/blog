"use client"
import { LogOutIcon, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Header() {
    const router = useRouter();

    const [user, setUser] = useState("");

    useEffect(() => {
        fetchLoggedinUser();
    }, [])

    const fetchLoggedinUser = async () => {
            try {
                const res = await fetch('/api/me')
                const data = await res.json();
                setUser(data.data)
            } catch (error) {
                console.log(error);
            }
        }


    const handleLogout = async () => {
        try {
            await fetch("/api/logout");
            toast.success("Logged Out Successfully!")
            await fetchLoggedinUser();
        } catch (error) {
            console.log(error)
        }
        router.push("/login");
    };

    return <main>
        <div className="flex justify-between w-full bg-slate-600 items-center text-black px-10 py-3 z-100">
            <div>
                <Link href={'/'}><h1 className="font-bold text-2xl text-white">BLOG</h1></Link>
            </div>
            <div>
                <h1 className="bg-gray-100 rounded-full py-1 pl-5 pr-3 flex">
                    <input
                        className="outline-none text-gray-500 md:block hidden"
                        type="text" />
                    <Search className="text-gray-400 hover:ring-1 rounded-full py-1 md:block hidden" size={30} />
                </h1>
            </div>
            <div className="flex flex-row gap-3 justify-center items-center">
                <div>
                    {user?.isAdmin && (
                        <Link href={'/admin/blogform'}>
                            <button className="bg-slate-100 hover:bg-slate-200 text-gray-500 px-2 py-1 rounded-lg">
                                Dashboard
                            </button>
                        </Link>
                    )}
                </div>
                <div className="flex gap-3 items-center">
                    <div className="md:block hidden text-white">
                        <h1 className="flex justify-end">{user?.name}</h1>
                        <h2 className="text-sm text-gray-400 flex justify-end">{user?.email}</h2>
                    </div>
                    <h1 className="bg-gray-200 px-5 py-5 rounded-full flex jus items-center"></h1>
                </div>
                <div>
                    {user?.name ? (
                        <button onClick={handleLogout} className="bg-slate-100 hover:bg-slate-200 text-gray-500 px-2 py-1 rounded-lg">
                            <LogOutIcon />
                        </button>
                    ) : (
                        <Link href={'/login'}><button className="bg-slate-100 hover:bg-slate-200 text-gray-500 px-2 py-1 rounded-lg">
                            Login
                        </button></Link>
                    )}
                </div>
            </div>
        </div>
    </main>
}

