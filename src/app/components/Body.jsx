"use client"

import Contactus from "./Contactus";
import Category from "./Categories";
import Blogpost from "./Blog";

export default function Body() {

    return <main>
        <div className="w-full h-auto bg-gray-100 text-black">
            <div className="flex flex-col justify-center gap-3 h-[330px] shadow-sm">
                <h1 className="flex justify-center text-3xl text-green-800 font-bold">This is body</h1>
                <div className="flex justify-center items-center flex-col md:flex-row md:gap-1 gap-3">
                    <h1 className="flex justify-center items-center font-semibold text-xl">Representation of the Innovation</h1>
                    <p className="bg-green-700 ml-2 px-4 py-1 rounded-full text-white">and the inventions Tecnology</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center p-5 md:p-20 gap-10">
                <Blogpost />
                <div >
                    <div className="lg:block hidden"><Category /></div>
                    <Contactus />
                </div>
            </div>
        </div>
    </main>
}