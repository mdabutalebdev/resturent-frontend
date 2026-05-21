"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation, useLazyGetMeQuery } from "@/store/api/authApi";
import { errorMessage, successMessage } from "@/lib/toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { setCookie } from "@/lib/cookies";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const [login, { isLoading }] = useLoginMutation();
    const [triggerGetMe] = useLazyGetMeQuery();

    const handleLogin = async (el: React.FormEvent<HTMLFormElement>) => {
        el.preventDefault();
        if (!email) {
            alert("Please enter email");
        } else if (!password) {
            alert("Please enter password");
        } else {
            try {
                const result = (await login({ email, password }).unwrap()) as any;
                const token = result.access || result.token || result.access_token || result.data?.access || result.data?.tokens?.access;
                
                if (token) {
                    setCookie("token", token);
                    
                    try {
                        const userProfile = await triggerGetMe(undefined).unwrap();
                        const activeUser = (userProfile?.uuid || userProfile?.email) ? userProfile : (userProfile?.data?.user || userProfile?.user);
                        const userType = (activeUser?.user_type || "").toUpperCase();
                        
                        if (userType === "ADMIN" || userType === "STAFF") {
                            successMessage("User logged in successfully", "top-center");
                            router.push("/dashboard");
                        } else {
                            successMessage("User logged in successfully", "top-center");
                            router.push("/");
                        }
                    } catch (profileErr) {
                        successMessage("User logged in successfully", "top-center");
                        router.push("/");
                    }
                } else {
                    errorMessage("Authentication failed, token not found.", "top-left", "dark");
                }
            } catch (err: any) {
                const errText = err?.data?.detail || err?.data?.error || "Invalid Credential";
                
                if (errText.toLowerCase().includes("verify your account") || err?.status === 403) {
                    errorMessage("Please verify your account first. Redirecting to OTP page...", "top-center");
                    sessionStorage.setItem("verify_email", email);
                    setTimeout(() => {
                        router.push("/verify-otp");
                    }, 2000);
                } else {
                    errorMessage(errText, "top-left", "dark");
                }
            }
        }
    };

    return (
        <div className="h-[60vh] mt-[13vh] bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Email / Username
                        </label>
                        <input
                            type="text"
                            className="w-full font-montserrat px-4 py-2 border-2 border-gray-300 focus:border-btn rounded-full"
                            placeholder="Enter your email or username"
                            value={email}
                            onChange={(el) => setEmail(el.target.value)}
                        />
                    </div>
                    <div className="mb-6">
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
                    <button
                        type="submit"
                        className="w-full bg-btn text-white py-2 rounded-full cursor-pointer hover:bg-red-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;