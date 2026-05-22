"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const StudentModal = ({tutor}) => {
   const { data: session } = authClient.useSession();
    const user = session?.user;
  
    const [studentName, setStudentName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSuccess("");
  
      try {
        const res = await fetch("http://localhost:5000/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentName,
            phone,
            studentEmail: user?.email,
            tutorId: tutor?._id,
            tutorName: tutor?.tutorName,
            status: "pending",
          }),
        });
  
        if (!res.ok) throw new Error("Booking failed");
  
        setSuccess("Session booked successfully!");
        setStudentName("");
        setPhone("");
      } catch (error) {
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
  return (
    <div>
      
{/* The button to open modal */}
<label htmlFor="my_modal_7" className="btn btn-primary ">Booking Setion</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <div className="mb-3 text-sm text-gray-600">
            <p><b>Tutor:</b> {tutor?.tutorName}</p>
            <p><b>Email:</b> {user?.email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Student Name"
              className="w-full border p-2 rounded-xl"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Phone"
              className="w-full border p-2 rounded-xl"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded-xl"
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </form>

          {success && (
            <p className="text-green-600 text-sm mt-3">{success}</p>
          )}
  </div>
  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
</div>
    </div>
  )
}

export default StudentModal
