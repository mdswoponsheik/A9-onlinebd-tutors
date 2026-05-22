"use client";

import { useState, useEffect } from "react";
export const dynamic = "force-dynamic";

export default function MyBookedSessions() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch user-specific bookings on component mount
  useEffect(() => {
    async function fetchBookings() {
      try {
        // In production, your backend/API route should identify the user 
        // via session cookies or a JWT token, ensuring privacy.
        const response = await fetch(`http:/${process.env.NEXT_PUBLIC_SERVER_URL}/booking`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, []);

  // 2. Handle opening the confirmation modal
  const openCancelModal = (id) => {
    setSelectedBookingId(id);
    setIsModalOpen(true);
  };

  // 3. Send the PATCH request to update status to "cancelled"
  const handleConfirmCancel = async () => { 
    if (!selectedBookingId) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (response.ok) {
        // Optimistically update the UI status without a full reload
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === selectedBookingId
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );
        setIsModalOpen(false);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling the session:", error);
    } finally {
      setIsSubmitting(false);
      setSelectedBookingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Booked Sessions</h1>

      {bookings.length === 0 ? (
        /* --- EMPTY STATE --- */
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="text-5xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">
            It looks like you haven't booked any study sessions yet. Explore our available tutors to get started!
          </p>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition">
            Browse Tutors
          </button>
        </div>
      ) : (
        /* --- BOOKINGS TABLE --- */
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm font-semibold border-b border-gray-200">
                <th className="p-4">Tutor Name</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{booking.tutorName}</td>
                  <td className="p-4">{booking.studentName}</td>
                  <td className="p-4 text-gray-500">{booking.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        booking.status === "pending"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : booking.status === "confirmed"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {booking.status !== "cancelled" ? (
                      <button
                        onClick={() => openCancelModal(booking.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800 hover:underline transition"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- CONFIRMATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all scale-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Session</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to cancel this booked session? This action cannot be undone, and your tutor will be notified.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                No, Keep It
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? "Cancelling..." : "Yes, Cancel Session"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}