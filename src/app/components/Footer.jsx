export default function Footer() {
    return <main className="bg-green-700">
        <div className="flex flex-row justify-between px-20 py-5 border-b">
            <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold">Blog Technology Pvt. Ltd.</h1>
                <div className="pl-5 gap-3 flex flex-col">
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
        <div className="p-5 flex justify-center">
            <footer className="text-center py-4 text-sm">
                <p>© 2025 Your Company Name. All rights reserved.</p>
            </footer>

        </div>
    </main>
}