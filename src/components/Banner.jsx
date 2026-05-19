"use client"


import Link from 'next/link'
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md'

const banners = [
  {
    title: "The Ultimate Tutors Booking Platform",
    desc: "Build modern mentor booking system easily.",
    img: "/banner-image.png",
  },
  {
    title: "Learn From Expert Mentors",
    desc: "Book sessions with top tutors anytime.",
    img: "/banner2.png",
  },
  {
    title: "Grow Your Skills Fast",
    desc: "Structured learning with real mentors.",
    img: "/banner3.png",
  },
]

const Banner = () => {
     const [index, setIndex] = useState(0)

  const next = () => {
    setIndex((prev) => (prev + 1) % banners.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

    return (
        <div className='h-screen flex flex-col justify-center items-center bg-cover bg-center'
            style={{
                backgroundImage:
                    `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${banners[index].img})`
            }}>
            
            <div className="flex flex-col justify-center items-center ">
                <div className="max-w-4xl text-white  space-y-10 mb-10">
                    <h2 className='text-center text-6xl font-bold'>{banners[index.title]}</h2>
                    <p className='text-center'>{banners[index].desc}</p>
                </div>
                <Link href={`/tutors`}><button className='p-3 md:btn bg-transparent rounded-lg border border-white text-white hover:text-[#FFCC31] hover:border hover:border-[#FFCC31] text-md md:text-xl flex items-center'><FaArrowRight />Booking Tutors</button></Link>
            </div>
            {/* arrows */}
      <div className="absolute bottom-10 flex gap-6">
        <button onClick={prev} className="p-3 bg-white/20 rounded-full">
          <MdKeyboardDoubleArrowLeft />
        </button>

        <button onClick={next} className="p-3 bg-white/20 rounded-full">
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
        </div>
    )
}

export default Banner
