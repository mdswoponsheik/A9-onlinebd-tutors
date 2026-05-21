"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';




const MyProfilepage = () => {


  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  // console.log(user);



  const noData = !user && !isPending;

  if (noData) {
    return <div className="text-center py-10 w-1/3 mx-auto">
      <h2 className="text-center text-3xl font-bold mt-10">No user data available.</h2>
      <p className="text-center text-lg my-4">Please log in to view your profile.</p>
      <Link href={`/login`}><button
        className='bg-green-50 w-full border-green-500 border rounded-lg text-green-500 text-xl font-semibold mx-3  p-2'>LogIn</button></Link>
    </div>;
  }

  return (
    <div>

      {isPending ? (<span className="navbar-end mr-10 loading loading-spinner loading-lg"></span>) : (

        <div className="w-96 mx-auto gap-5 rounded-2xl shadow-2xl my-10 p-5">
          <h2 className='text-center  mb-2 text-3xl font-bold'>My Profile</h2>
          <div className="  flex flex-col items-center ">
            <div className="">
              <img className='rounded-full w-30 h-30 flex justify-center items-center'
                src={user?.image} alt={user?.name} />
            </div>
            <div className="space-y-4 text-center w-full">
              <h2 className="text-2xl font-bold mt-3 bg-white p-2 rounded-lg w-full"><samp>Name: </samp> {user?.name}</h2>
              <p className="text-md bg-white p-2 rounded-lg w-full"> <span className="font-bold">Email:</span> {user?.email}</p>
            </div>

          </div>
         

        </div>
      )}
    </div>
  )
}

export default MyProfilepage
