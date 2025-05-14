"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function MyLineChart() {

    const [blog, setBlog] = useState([]);

    useEffect(() => {
        fetchBlog();
    }, [])

    const fetchBlog = async () => {
        try {
            const res = await fetch('/api/blog')
            const data = await res.json();
            const len = data.data.length;
            console.log(data);
            console.log("this is lenght", len);
            setBlog(len);
        } catch (error) {
            console.log(error)
        }
    }
    const [contact, setContact] = useState([]);

    useEffect(() => {
        fetchContact();
    }, [])

    const fetchContact = async () => {
        try {
            const res = await fetch('/api/contact')
            const data = await res.json();
            const len = data.data.length;
            console.log(data);
            console.log("this is lenght", len);
            setContact(len);
        } catch (error) {
            console.log(error)
        }
    }
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/user')
            const data = await res.json();
            const len = data.data.length;
            console.log(data);
            console.log("this is lenght", len);
            setUser(len);
        } catch (error) {
            console.log(error)
        }
    }

    return <div className='p-5 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 bg-gray-900 h-screen'>
        {/* <Line data={data} /> */}
        <div className='h-[180px] w-[350px] bg-slate-200 text-black rounded-lg p-10 flex flex-col gap-5'>
            <Link href={'/admin/blogform/listview'}>
                <h1 className='text-xl font-bold'>Blogs</h1>
                <div className='text-6xl pl-5'>
                    {blog}
                </div>
            </Link>
        </div>

        <div className='h-[180px] w-[350px] bg-blue-200 text-black rounded-lg p-10 flex flex-col gap-5'>
            <Link href={'/admin/contact'}>
                <h1 className='text-xl font-bold'>Contact Messages</h1>
                <div className='text-6xl pl-5'>
                    {contact}
                </div>
            </Link>
        </div>

        <div className='h-[180px] w-[350px] bg-red-200 text-black rounded-lg p-10 flex flex-col gap-5'>
            <Link href={'/admin/contact'}>
                <h1 className='text-xl font-bold'>User</h1>
                <div className='text-6xl pl-5'>
                    {user}
                </div>
            </Link>
        </div>
    </div>
}
