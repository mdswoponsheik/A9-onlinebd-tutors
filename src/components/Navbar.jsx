import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-green-50 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>

                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link href="/">Home</Link></li>
                        <li><Link href="/tutors">All Tutors</Link></li>
                        <li><Link href="/add-tutors">Add Tutors</Link></li>
                        <li><Link href="/my-tutors">My Tutors</Link></li>
                        <li><Link href="/my-booked-sessions">My Booked Sessions</Link></li>
                        </ul>
                    </div>
                    <Link href={`/profile`} className="ml-0 md:ml-4 text-xl md:text-3xl font-bold normal-case">
                        <span>Online<span className='text-green-500'>BD</span></span><samp className='text-yellow-400 pl-2'>Tutors</samp></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/tutors">All Tutors</Link></li>
                        <li><Link href="/add-tutors">Add Tutors</Link></li>
                        <li><Link href="/my-tutors">My Tutors</Link></li>
                        <li><Link href="/my-booked-sessions">My Booked Sessions</Link></li>
                    </ul>
                </div>
                <div className="navbar-end gap-2 mr-0 md:mr-4 ">
                   <Link href="/login" className="p-2 md:btn bg-[#FFCC31] rounded-lg border border-white text-white hover:bg-white hover:text-[#FFCC31] hover:border hover:border-[#FFCC31] text-md md:text-xl">Login</Link>
                   <Link href="/signup" className="p-2 md:btn border border-[#FFCC31] text-[#FFCC31] hover:bg-white hover:text-[#FFCC31] rounded-lg text-md md:text-xl">SignUp</Link>

                </div>
            </div>
        </div>
    )
}

export default Navbar
