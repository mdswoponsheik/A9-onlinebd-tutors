
import { IoStar, IoStarHalf } from "react-icons/io5";


import Image from "next/image";
import Link from "next/link";



const Details = async ({ params }) => {

    const { id } = await params;

  
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // });

    // const user = session?.user;
    // if (!user) {
    //     redirect("/login");-
    // }

     const res = await fetch(`http://localhost:5000/tutors/${id}`);
    const details = await res.json();

    // const courseDetails = details.find(c => c.id == id);
    console.log(details);


    return (
        <div className="bg-green-50 py-10">

            <div className="card  grid grid-cols-1 lg:grid-cols-2 w-9/10 p-10 mx-auto shadow-2xl">
                <figure className="">
                    <Image
                        src={details?.photo}
                        alt={`${details?.tutorName}'s Image`}
                        className=" rounded-xl" width={600} height={600} />
                </figure>

                <div className="">
                    <div className="text-center mb-7">
                        <h2 className=" pr-8 text-2xl sm:text-4xl font-bold mb-2">{details?.tutorName}</h2>
                        <p className="text-sm">{details?.institutionExperience}</p>
                        <p className="text-xl font-semibold">{details?.subject}</p>
                      
                    </div>
                    <div className="flex text-lg gap-10">
                        <div className="space-y-3 ">
                            <h4 className="text-xl">Start <span className="font-semibold">{details?.sessionStartDate}</span> in  
                            <span className="font-semibold text-yellow-400"> {details?.location}</span></h4>
                            <h4>{details?.availableDays}, {details?.availableTime}</h4>
                            <p><span className="text-xl font-bold underline text-red-500 ">{details?.totalSlot}</span> slots available</p>
                        </div>
                        
                        
                    </div>
                     <div className="flex justify-between  mt-10">
                     <div className="flex gap-5">
                     <div className=" font-bold text-black-400 text-xl "><h4 className="">{details?.teachingMode}</h4></div>

                     <div className=" font-bold text-yellow-400 underline text-xl"><h4>{details?.hourlyFee}h</h4></div>
                        </div> 

                        <Link href={`/`}><button className="btn btn-secondary text-xl">Booking</button></Link> 
                        </div> 
                    
                </div>
            </div>




            

        </div>
    )
}

export default Details