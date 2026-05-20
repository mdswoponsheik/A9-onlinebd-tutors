"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'


const NavLink = ({ href, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  return (
    <div>
        <Link href={href} className={isActive ? 'text-white font-bold bg-green-400 rounded-full p-3' : 'text-gray-500 hover:text-yellow-500'} >
            {children}
        </Link>
      
    </div>
  )
}

export default NavLink