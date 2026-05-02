"use client";
import axios from "axios";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (
    e: React.SubmitEvent<HTMLElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/login", {
        email,
      });
      alert(data?.message);
      router.push(`/verify?email=${email}`);
    } catch (error: any) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full text-white">
        <div className="bg-gray-800 border  border-gray-700 rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Mail size={40} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-200 mb-1">
              Welcome to ChatApp
            </h1>
            <p className="text-sm text-gray-300 mb-3">
              Enter your email to continue your journey with ChatApp
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 mb-2 block ml-0"
              >
                Email address
              </label>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full h-3/2 px-4 py-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 w-full h-full px-3 py-3 items-center justify-center flex rounded-lg mb-0 cursor-pointer hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5" />
                  Sending OTP to your mail.....
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white font-semibold">
                    Send Verification Code
                  </span>
                  <ArrowRight className="ml-3" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
