"use client"

import Contactus from "./Contactus";
import Category from "./Categories";
import Blogpost from "./Blog";

export default function Body() {

    return <main>
        <div className="w-full h-auto bg-gray-100 text-black">
            <div className="relative h-[630px] shadow-sm bg-linear-65 from-gray-800 to-black">
                {/* <div
                    className="absolute inset-0 bg-cover bg-center filter blur-2xl"
                    style={{ backgroundImage: "url('/buddha.jpg')" }}
                /> */}

                <div className="relative flex flex-col justify-center gap-3 h-full text-white z-10">
                    <h1 className="flex justify-center text-5xl text-white font-bold pb-5">This is body</h1>
                    <div className="flex justify-center items-center flex-col md:flex-row md:gap-0 gap-3">
                        <h1 className="flex justify-center items-center font-semibold text-2xl text-white">Representation of the Innovation</h1>
                        <p className="bg-white ml-2 px-4 py-1 rounded-full text-green-800 text-2xl font-extralight">and the inventions Technology</p>
                    </div>
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