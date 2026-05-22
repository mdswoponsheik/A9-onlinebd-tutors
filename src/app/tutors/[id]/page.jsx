


import StudentModal from "@/components/StudentModal";
import Image from "next/image";


const Details = async ({ params }) => {

    const { id } = await params;

    const res = await fetch(`http://localhost:5000/tutors/${id}`, {
        cache: "no-store",
    });

    const details = await res.json();

    // Current Date
    const today = new Date();

    // Tutor Session Date
    const sessionDate = new Date(details?.sessionStartDate);

    // Validation
    const noSlot = details?.totalSlot <= 0;
    const bookingEnded = today > sessionDate;








    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-10">

            <div className="card grid grid-cols-1 lg:grid-cols-2 w-11/12 lg:w-9/10 p-6 lg:p-10 mx-auto shadow-2xl bg-white rounded-3xl">

                {/* LEFT SIDE IMAGE */}
                <figure className="overflow-hidden rounded-2xl">
                    <Image
                        src={details?.photo}
                        alt={`${details?.tutorName}'s Image`}
                        className="rounded-2xl object-cover w-full h-full hover:scale-105 duration-500"
                        width={600}
                        height={600}
                    />
                </figure>

                {/* RIGHT SIDE CONTENT */}
                <div className="lg:pl-10 mt-8 lg:mt-0 flex flex-col justify-between">

                    {/* TOP */}
                    <div>

                        {/* NAME */}
                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-800">
                                {details?.tutorName}
                            </h2>

                            <p className="text-gray-500 mt-2 text-sm lg:text-base">
                                {details?.institutionExperience}
                            </p>

                            <div className="mt-4 flex justify-center lg:justify-start">
                                <span className="badge badge-secondary px-5 py-4 text-lg">
                                    {details?.subject}
                                </span>
                            </div>
                        </div>

                        {/* INFO BOX */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                                <h3 className="font-bold text-lg text-gray-700 mb-2">
                                    Session Start
                                </h3>

                                <p className="text-xl font-semibold text-green-600">
                                    {details?.sessionStartDate}
                                </p>
                            </div>

                            <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-100">
                                <h3 className="font-bold text-lg text-gray-700 mb-2">
                                    Location
                                </h3>

                                <p className="text-xl font-semibold text-yellow-600">
                                    {details?.location}
                                </p>
                            </div>

                            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                                <h3 className="font-bold text-lg text-gray-700 mb-2">
                                    Available Time
                                </h3>

                                <p className="font-semibold">
                                    {details?.availableDays}
                                </p>

                                <p>
                                    {details?.availableTime}
                                </p>
                            </div>

                            <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
                                <h3 className="font-bold text-lg text-gray-700 mb-2">
                                    Slots Available
                                </h3>

                                <p className="text-3xl font-extrabold text-red-500">
                                    {details?.totalSlot}
                                </p>
                            </div>

                        </div>

                        {/* STATUS MESSAGE */}
                        <div className="mt-6">

                            {
                                noSlot &&
                                <div className="alert alert-error shadow-lg">
                                    <span className="font-semibold">
                                        No available slots left.
                                    </span>
                                </div>
                            }

                            {
                                !noSlot && bookingEnded &&
                                <div className="alert alert-warning shadow-lg">
                                    <span className="font-semibold">
                                        Booking is not available yet for this tutor.
                                    </span>
                                </div>
                            }

                            {
                                !noSlot && !bookingEnded &&
                                <div className="alert alert-success shadow-lg">
                                    <span className="font-semibold">
                                        Booking is available now.
                                    </span>
                                </div>
                            }

                        </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="mt-10">

                        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

                            {/* MODE + FEE */}
                            <div className="flex items-center gap-5">

                                <div className="badge badge-primary px-5 py-4 text-lg font-bold">
                                    {details?.teachingMode}
                                </div>

                                <div className="text-3xl font-extrabold text-yellow-500">
                                    ৳ {details?.hourlyFee}/h
                                </div>

                            </div>

                            {/* BUTTON */}
                            {
                                noSlot ? (

                                    <button
                                        disabled
                                        className="btn btn-error rounded-2xl text-lg px-8"
                                    >
                                        Fully Booked
                                    </button>

                                ) : bookingEnded ? (

                                    <button
                                        disabled
                                        className="btn btn-warning rounded-2xl text-lg px-8"
                                    >
                                        Booking End
                                    </button>

                                ) : (

                                    <div className="">


                                        {/* <StudentModal tutor={details}></StudentModal> */}

                                        <StudentModal tutor={details} />
                                        
                                    </div>



                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Details;

