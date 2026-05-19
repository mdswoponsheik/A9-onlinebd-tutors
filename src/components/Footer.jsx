import Link from 'next/link'
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { IoLogoTwitter } from 'react-icons/io';
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className=" bg-green-50 p-10">
                <div className="footer sm:footer-horizontal">
                <nav>
                    <h6 className="text-2xl font-semibold text-yellow-400">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="text-2xl font-semibold text-yellow-400">Contact</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="text-2xl font-semibold text-yellow-400 mb-4">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                       <Link href={``}><FaFacebook className='w-10 h-10' /></Link>
                       <Link href={``}><IoLogoTwitter className='w-10 h-10' /></Link>
                       <Link href={``}><BiLogoInstagramAlt className='w-10 h-10'/></Link>
                          
                    </div>
                </nav>
                </div>
                <aside className='mt-10'>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer
