"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { ArrowRight, CircleChevronLeft, Loader2, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

const VerifyPage = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs: any = useRef<HTMLInputElement[]>([]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || null;
  const router = useRouter();
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value: string = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (digits.length === 6) {
      const newOtp = digits.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all six digits of your OTP!");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/verify", {
        email,
        otp: otpString,
      });
      alert(data.message);
      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      });
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus;
      router.push("/home");
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/login", {
        email,
      });
      alert(data.message);
      setTimer(60);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setResendLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full text-white">
        <div className="bg-gray-800 border  border-gray-700 rounded-lg p-8">
          <div className="text-center mb-8 relative">
            <button
              onClick={() => router.push("/login")}
              className="absolute top-0 left-0 text-gray-300 hover:text-white"
            >
              <CircleChevronLeft className="w-6 h-6" />
            </button>
            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Lock size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-200 mb-1">
              Verify your email
            </h1>
            <p className="text-sm text-gray-300 mb-3">
              We have sent a six digit code to
            </p>
            <p className="text-sm text-blue-600 mt-1">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-2">
              <label className="text-sm font-medium text-gray-300 mb-2 block ml-0">
                Enter your six digit OTP here
              </label>
            </div>
            <div className="flex justify-center items-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, e)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(index, e)
                  }
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                />
              ))}
            </div>
            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-3">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 w-full h-full px-3 py-3 items-center justify-center flex rounded-lg mb-0 cursor-pointer hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5" />
                  Verifying Email
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white font-semibold">Verify</span>
                  <ArrowRight className="ml-2" />
                </div>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-300 mt-2">
              Didn't receive the code?
            </p>
            {timer > 0 ? (
              <p className="text-sm text-blue-300 mt-2">
                Resend code in {timer} seconds
              </p>
            ) : (
              <button
                className="text-sm text-blue-600 hover:text-blue-700 mt-2 cursor-pointer disabled:opacity-50"
                disabled={resendLoading}
                onClick={handleResendOtp}
              >
                {resendLoading ? "Resending OTP Code" : "Resend code"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
