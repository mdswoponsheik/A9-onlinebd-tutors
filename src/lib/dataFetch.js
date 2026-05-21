export const allTutors =async () =>{
    const res = await fetch("http://localhost:5000/tutors");
  const tutorsData = await res.json();
  console.log(tutorsData)
}