"use client"
import Link from 'next/link'
import React from 'react'
import NavLink from './share/NavLink'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;



      const router = useRouter();


    return (
        <div>
            <div className="navbar flex justify-between bg-green-50 shadow-2xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>

                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><NavLink href="/">Home</NavLink></li>
                            <li><NavLink href="/tutors">All Tutors</NavLink></li>
                            <li><NavLink href="/add-tutors">Add Tutors</NavLink></li>
                            <li><NavLink href="/my-tutors">My Tutors</NavLink></li>
                            <li><NavLink href="/my-booked-sessions">My Booked Sessions</NavLink></li>
                        </ul>
                    </div>
                    <Link href={`/profile`} className="ml-0 md:ml-4 text-xl md:text-3xl font-bold normal-case">
                        <span>Online<span className='text-green-500'>BD</span></span><samp className='text-yellow-400 pl-2'>Tutors</samp></Link>
                </div>
                <div className="navbar-center  rounded-full bg-green-100 hidden lg:flex">
                    <ul className=" flex gap-4 p-3">
                        <li><NavLink href="/">Home</NavLink></li>
                        <li><NavLink href="/tutors">All Tutors</NavLink></li>
                        <li><NavLink href="/add-tutors">Add Tutors</NavLink></li>
                        <li><NavLink href="/my-tutors">My Tutors</NavLink></li>
                        <li><NavLink href="/my-booked-sessions">My Booked Sessions</NavLink></li>
                    </ul>
                </div>


                {!user ? <div className="navbar-end gap-2 mr-0 md:mr-4 ">
                    <Link href="/login" className="p-2 md:btn bg-[#FFCC31] rounded-lg border border-white text-white hover:bg-white hover:text-[#FFCC31] hover:border hover:border-[#FFCC31] text-md md:text-xl">Login</Link>
                    <Link href="/signup" className="p-2 md:btn border border-[#FFCC31] text-[#FFCC31] hover:bg-white hover:text-[#FFCC31] rounded-lg text-md md:text-xl">SignUp</Link>

                </div> : <div className="dropdown">
                    <div tabIndex={0} role="button" className="">
                        <Image src={user?.image} alt={user.name} width={60} height={60} className='rounded-full mr-6 w-16 h-16' />
                    </div>
                    <ul tabIndex={0} className=" dropdown-content bg-base-100 rounded-box z-1 mt-2  mr-10  p-2 shadow flex flex-col gap-2 items-center">
                        <li ><Link href={`/profile`}>Profile</Link></li>
                        <li className="mt-2">
                            <Button onClick={async () => {
                                await authClient.signOut();
                                router.push("/")
                            }}
                            >LogOut</Button></li>
                    </ul>
                </div> }





            </div>
        </div>
    )
}

export default Navbar
