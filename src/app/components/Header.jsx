import { Search } from "lucide-react";

export default function Header(){
    return <main>
        <div className="flex justify-between items-center bg-white text-black px-10 py-3">
            <div>
                <h1 className="font-bold text-2xl text-green-900">BLOG</h1>
            </div>
            <div>
            <h1 className="bg-gray-100 rounded-full py-1 pl-5 pr-3 flex">
                    <input 
                    className="outline-none text-gray-500 md:block hidden"
                    type="text" />
                    <Search className="text-gray-400 hover:ring-1 rounded-full py-1 md:block hidden" size={30}/>
                </h1>
            </div>
            <div className="flex gap-3 items-center">
                
                <div className="md:block hidden">
                <h1 className="flex justify-end">User Name</h1>
                <h2 className="text-sm text-gray-400">user@gmail.com</h2>
                </div>
                <h1 className="bg-gray-200 px-5 py-5 rounded-full flex jus items-center"></h1>
            </div>
        </div>
    </main>
}