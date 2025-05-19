"use client"
import { useEffect, useState } from "react"

export default function Contactus() {
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, number, message }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.log("Error validation!!", data.message);
                return;
            }

            console.log("Submitted Successfully!", data);
        } catch (error) {
            console.log("Error while submitting!", error);
        }
    };

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const res = await fetch("/api/me");
                if (!res.ok) {
                    setIsLoggedIn(false);
                    return;
                }

                const data = await res.json();
                if (data?.data?.email) {
                    setEmail(data.data.email);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log("User not logged in or error in /api/me");
            }
        };
        fetchEmail();
    }, []);

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col p-10 w-full md:w-[600px]">
                    <h1 className="text-xl font-semibold pb-5">Contact Us</h1>

                    <div className="grid sm:grid-row-2 grid-row-1 gap-10 pb-5">
                        <div className="grid grid-row-2 gap-2">
                            <h1 className="text-slate-800">Email</h1>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly={isLoggedIn} 
                                className={`rounded-full ring-1 ring-slate-400 px-4 py-2 bg-slate-200 outline-none ${isLoggedIn ? "opacity-80 cursor-not-allowed" : ""}`}
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="grid grid-row-2 gap-2">
                            <h1 className="text-slate-800">Contact No.</h1>
                            <input
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="rounded-full ring-1 ring-gray-400 px-4 py-2 bg-slate-200 outline-none"
                                type="number"
                                placeholder="Enter your contact number"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-row-2 gap-2">
                        <h1 className="text-slate-800">Message Box</h1>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="rounded-lg ring-1 ring-gray-400 px-4 py-2 bg-slate-200 outline-none"
                            placeholder="Write your message..."
                            required
                        />
                    </div>

                    <button className="bg-slate-800 text-white px-3 py-2 rounded-full mt-10">Submit</button>
                </div>
            </form>
        </main>
    );
}
