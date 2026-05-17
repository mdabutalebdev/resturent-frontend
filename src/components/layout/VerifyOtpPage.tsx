"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/store/api/authApi";
import { successMessage, errorMessage } from "@/lib/toast";

const VerifyOtpPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);
    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

    // Pull email from sessionStorage if they just registered
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedEmail = sessionStorage.getItem("verify_email");
            if (savedEmail) {
                setEmail(savedEmail);
            }
        }
    }, []);

    // Handle resend countdown timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            errorMessage("Email is required", "top-center");
            return;
        }
        if (!otp || otp.length < 4) {
            errorMessage("Please enter a valid OTP", "top-center");
            return;
        }

        try {
            await verifyOtp({ email, otp }).unwrap();
            successMessage("Account verified successfully! You can now log in.", "top-center");
            sessionStorage.removeItem("verify_email");
            router.push("/login");
        } catch (err: any) {
            const errText = err?.data?.error || err?.data?.detail || "Invalid OTP. Please check the code in your email.";
            errorMessage(errText, "top-center");
        }
    };

    const handleResend = async () => {
        if (!email) {
            errorMessage("Please enter your email to resend OTP", "top-center");
            return;
        }

        try {
            await resendOtp({ email }).unwrap();
            successMessage("A new OTP has been sent to your email.", "top-center");
            setTimer(60); // disable button for 60 seconds
        } catch (err: any) {
            const errText = err?.data?.error || err?.data?.detail || "Failed to resend OTP. Please try again.";
            errorMessage(errText, "top-center");
        }
    };

    return (
        <div className="h-[60vh] mt-[13vh] bg-gray-100 flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold mb-2 text-center text-prh2 font-serif">Verify Your Account</h2>
                <p className="text-gray-500 text-sm text-center mb-6 font-montserrat">
                    We sent a verification code (OTP) to your email. Please enter it below to activate your account.
                </p>
                <form onSubmit={handleVerify}>
                    <div className="mb-4">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="w-full font-montserrat px-4 py-2 border-2 border-gray-300 focus:border-btn rounded-full bg-gray-50 cursor-not-allowed"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!!email} // email pre-fills and is locked
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                            OTP Code
                        </label>
                        <input
                            type="text"
                            maxLength={8}
                            className="w-full font-montserrat px-4 py-2 border-2 border-gray-300 focus:border-btn rounded-full text-center text-lg tracking-widest font-bold"
                            placeholder="••••••"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-btn text-white py-2 rounded-full cursor-pointer hover:bg-red-700 transition font-montserrat font-semibold"
                        disabled={isVerifying}
                    >
                        {isVerifying ? "Verifying..." : "Verify Account"}
                    </button>
                </form>

                <div className="mt-6 flex flex-col items-center gap-2">
                    <p className="text-xs text-gray-500 font-montserrat">Didn't receive the email?</p>
                    <button
                        onClick={handleResend}
                        disabled={timer > 0 || isResending}
                        className={`text-sm font-semibold font-montserrat underline transition ${
                            timer > 0 || isResending ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:text-blue-600 cursor-pointer"
                        }`}
                    >
                        {timer > 0 ? `Resend OTP in ${timer}s` : isResending ? "Sending..." : "Resend Verification Code"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpPage;
