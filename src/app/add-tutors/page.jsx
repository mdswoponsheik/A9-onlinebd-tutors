

"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

import { toast } from "react-hot-toast";
export const dynamic = "force-dynamic";

const AddTutorsPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const tutorsData = Object.fromEntries(formData.entries());

    console.log(tutorsData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tutorsData),
      });

      const data = await res.json();

      console.log("Data received:", data);

      if (data.insertedId) {
        toast.success("Tutor Added Successfully");
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Tutor");
    }
  };

  return (
    <div>
      <div className="max-w-6/10 mx-auto shadow-2xl my-8">
        <Form onSubmit={onSubmit} className="p-10 space-y-8">
          <h1 className="text-center text-xl  sm:text-3xl font-bold ">ADD TUTORS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tutor Name */}
            <div className="md:col-span-2">
              <TextField name="tutorName" isRequired>
                <Label>Tutor Name</Label>
                <Input
                  placeholder="Enter Tutor Name"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Experience */}
            <div className="md:col-span-2">
              <TextField name="institutionExperience" isRequired>
                <Label>Experience</Label>
                <Input
                  placeholder="institutionExperience"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField name="photo" isRequired>
                <Label>Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Subject */}
            <div>
              <TextField name="subject" isRequired>
                <Label>Subject</Label>
                <Input placeholder="Bangla" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            {/* Date */}
            
            <TextField name="sessionStartDate" isRequired>
              <Label>Session Date Range</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Input
                  type="date"
                  name="startDate"
                  className="rounded-2xl"
                />

                <Input
                  type="date"
                  name="endDate"
                  className="rounded-2xl"
                />

              </div>

              <FieldError />
            </TextField>
          

            {/* <TextField name="sessionStartDate" isRequired>
              <Label>Date</Label>
              <Input type="date" className="rounded-2xl" />
              <FieldError />
            </TextField> */}

            {/* Location */}
            <TextField name="location" isRequired>
              <Label>Location</Label>
              <Input
                type="text"
                placeholder="Dhaka"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            {/* Hourly Fee */}
            <TextField name="hourlyFee" isRequired>
              <Label>Hourly Fee</Label>
              <Input placeholder="300" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Available Days */}
            <div>
              <TextField name="availableDays" isRequired>
                <Label>Available Days</Label>
                <Input
                  type="text"
                  placeholder="Sun-Fri"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Available Time */}
            <div>
              <TextField name="availableTime" isRequired>
                <Label>Time</Label>
                <Input
                  type="text"
                  placeholder="6:00 PM - 9:00 PM"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Teaching Mode */}
            <div>
              <Label>Teaching Mode</Label>

              <select
                name="teachingMode"
                className="w-full rounded-3xl border p-3"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Teaching Mode
                </option>

                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Total Slot */}

            <div>
              <TextField name="totalSlot" isRequired>
                <Label>Total Slot</Label>
                <Input
                  type="number"
                  placeholder="100"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
          <Button
            type="submit"
            variant="outline"
            className="rounded-xl w-1/2 bg-cyan-400 text-white"
          >
            Add Tutor
          </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddTutorsPage;
