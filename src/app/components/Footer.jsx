export default function Footer() {
    return <main className="bg-linear-65 from-gray-800 to-black">
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between px-5 md:px-20 py-5">
            <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold">Blog Technology Pvt. Ltd.</h1>
                <div className="pl-3 gap-3 flex flex-col">
                    <h1>Home</h1>
                    <h1>Contact</h1>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h1 className=" text-xl">Follow Us</h1>
                <div className="flex gap-3">
                    <h1>Facebook</h1>
                    <h1>Instagram</h1>
                </div>
            </div>
            <div>This is private companey</div>
        </div>
        <div className="flex justify-center bg-slate-900">
            <footer className="text-center py-4 text-sm">
                <p>© 2025 Your Company Name. All rights reserved.</p>
            </footer>

        </div>
    </main>
}