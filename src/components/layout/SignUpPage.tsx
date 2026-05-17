"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/store/api/authApi";
import { successMessage, errorMessage } from "@/lib/toast"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUpPage = () => {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPasswordShow, setconfirmPasswordShow] = useState(false);
    const [registerUser, { isLoading }] = useRegisterMutation();

    const handleSignup = async (el: React.FormEvent<HTMLFormElement>) => {
        el.preventDefault();
        if (!name) {
            errorMessage("Name is required", "top-center");
        } else if (!email) {
            errorMessage("Email is required", "top-center");
        } else if (!password) {
            errorMessage("Password is required", "top-center");
        } else if (confirmPassword !== password) {
            errorMessage("Password not match", "top-center");
        } else {
            try {
                await registerUser({
                    name: name,
                    email: email,
                    password: password,
                }).unwrap();

                successMessage("Account created! Please verify your email with the OTP sent.", "top-right", "dark");
                sessionStorage.setItem("verify_email", email);
                router.push("/verify-otp");
            } catch (error: any) {
                const errText = error?.data?.error || error?.data?.detail || "Registration failed. Try a different username/email.";
                errorMessage(errText, "top-center");
            }
        }
    };

    return (
        <div className="h-[60vh] mt-[12vw] mb-[4vw] bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-montserrat font-bold mb-6 text-center">
                    Sign Up
                </h2>
                <form onSubmit={handleSignup}>

                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Username / Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 font-montserrat py-2 border-2 border-gray-300 focus:border-btn rounded-full"
                            placeholder="Enter your Username"
                            value={name}
                            onChange={(el) => setName(el.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full font-montserrat px-4 py-2 border-2 border-gray-300 focus:border-btn rounded-full"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(el) => setEmail(el.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full font-montserrat px-4 py-2 border-2 border-gray-300 focus:border-btn rounded-full pr-12"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(el) => setPassword(el.target.value)}
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute cursor-pointer top-[50%] -translate-y-[50%] right-5 text-gray-400 text-2xl"
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={`${confirmPasswordShow ? "text" : "password"}`}
                                className="w-full font-montserrat px-4 py-2 border-2 border-gray-300 focus:border-btn rounded-full"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(el) => setConfirmPassword(el.target.value)}
                            />
                            <div
                                onClick={() => setconfirmPasswordShow(!confirmPasswordShow)}
                                className="absolute cursor-pointer top-[50%] -translate-y-[50%] right-5"
                            >
                                {confirmPasswordShow ? (
                                    <FaRegEyeSlash className="text-gray-400 text-2xl" />
                                ) : (
                                    <FaRegEye className="text-gray-400 text-2xl" />
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full font-montserrat bg-btn text-white py-2 rounded-full cursor-pointer hover:bg-red-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : " Sign Up"}
                    </button>

                </form>

                <p className="mt-4 font-montserrat text-sm text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;