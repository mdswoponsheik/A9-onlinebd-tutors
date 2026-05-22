export const dynamic = "force-dynamic";
export const allTutors =async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`);
  const tutorsData = await res.json();
  return tutorsData
 
}