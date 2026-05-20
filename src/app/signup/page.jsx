"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { CgGoogle } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";







const SignUpPage = () => {

    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log(userData)
        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            image: userData.photo,
            password: userData.password,
            callbackURL: "/",
        })

        console.log("response", { data, error });

        if (error) {
            toast.error(`Signup error: ${error.message}`);
            router.push("/");
        }

        if (data) {
            toast.success("Signup successful! Please check your email for confirmation.");
            router.push("/");
        }
    };

    const handleGoogle = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            image: "photo",
            callbackURL: "/",
        });
        // console.log("Google sign-in response:", data);
    };
    return (
        <div className=" p-10 ">


            <Form className="flex w-120 mx-auto flex-col gap-4  rounded-2xl shadow-2xl p-6" onSubmit={onSubmit}>
                <h1 className="text-center text-xl italic sm:text-3xl font-bold ">Create Your Account</h1>
                <p className="text-center ">Start your learning with <span className="font-semibold">OnlineBD</span></p>
                <TextField
                    isRequired

                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Full Name</Label>
                    <Input name="name" placeholder="Enter Your Name" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired

                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email Address</Label>
                    <Input name="email" placeholder="Enter Your Email" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    type="text"
                >
                    <Label>Photo</Label>
                    <Input name="photo" placeholder="Enter photo URL" />
                    <FieldError />
                </TextField>


                <TextField
                    className="relative"
                    isRequired
                    minLength={8}

                    type={isPasswordVisible ? "text" : "password"}
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input name="password" placeholder="Enter your password" />
                    <span className="absolute right-4 top-9 cursor-pointer" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>



                <div className=" flex justify-center flex-col gap-2 ">
                    <Button className="w-full flex justify-center text-xl" type="submit">
                        <Check />
                        Submit
                    </Button>

                    <h3>Or signup with</h3>

                    <div className="w-full flex items-center justify-center mt-5">
                        <button onClick={handleGoogle}
                            className="w-full text-xl border border-blue-500 text-black  py-2 rounded-full flex justify-center items-center gap-2">
                            <CgGoogle />
                            Google</button>
                    </div>

                    <h2>If you have an account. <Link href="/login" className="text-blue-500 hover:underline">Login</Link></h2>
                </div>
            </Form>
        </div>
    )
}

export default SignUpPage
