export default function Contactus() {
    return <main>
        <div className="flex flex-col p-10 w-full md:w-[600px]">
            <h1 className="text-xl font-semibold pb-5">Contact Us</h1>
            <div className="grid sm:grid-row-2 grid-row-1 gap-10 pb-5">
                <div className="grid grid-row-2 gap-2">
                    <h1 className="text-green-800">Email</h1>
                    <input
                        className="rounded-full ring-1 ring-green-400 px-4 py-2 bg-green-200 outline-none"
                        type="text"
                    />
                </div>
                <div className="grid grid-row-2 gap-2">
                    <h1 className="text-green-800">Contact No.</h1>
                    <input
                        className="rounded-full ring-1 ring-gray-400 px-4 py-2 bg-green-200 outline-none"
                        type="text"
                    />
                </div>
            </div>
            <div className="grid grid-row-2 gap-2">
                <h1 className="text-green-800">Message Box</h1>
                <textarea
                    className="rounded-lg ring-1 ring-gray-400 px-4 py-2 bg-green-200 outline-none"
                    type="text"
                />
            </div>
            <button className="bg-green-800 text-white px-3 py-2 rounded-full mt-10">Submit</button>
        </div>
    </main>
}