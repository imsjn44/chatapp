"use client";

import { useEffect, useState } from "react";
import { useAppData, user_service } from "../context/AppContext";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { ArrowLeft, Divide, Save, User, UserCircle } from "lucide-react";

const Profile = () => {
  const { user, isAuth, loading, setUser } = useAppData();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  const editHandler = () => {
    setIsEdit(!isEdit);
    setName(user?.name);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      const { data } = await axios.post(
        `${user_service}/api/v1/update/user`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      });
      toast.success(data.message);
      setUser(data.user);
      setIsEdit(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, router, loading]);

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/chat")}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg  border border-gray-700"
          >
            <ArrowLeft className="text-white" />
          </button>
        </div>
        <div>
          <h1 className="text-white font-bold text-3xl">Profile Settings</h1>
          <p className="text-xl text-gray-400">
            Manage your account information
          </p>
        </div>

        <div className="bg-gray-800 rounded-full border border-gray-700 shadow-lg">
          <div className="bg-gray-800 border-b border-gray-600 p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-700">
                  <UserCircle className="w-12 h-12 text-gray-300" />
                </div>
                <div className="absolute bg-green-600 rounded-full w-5 h-5 top-0.5"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-white text-2xl font-bold mb-1">
                  {user?.name || null}
                </h2>
                <p className="text-gray-300 text-sm">Active now</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-800">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300  ">
                Display name
              </label>
              {isEdit ? (
                <form onSubmit={submitHandler}>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      placeholder="Enter the new name"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-700 w-full px-4 py-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 mt-2 text-sm "
                    />
                    <User className="absolute right-3 top-1/3 w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md mt-4 text-gray-900 text-sm cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 rounded-md mt-4 text-sm cursor-pointer"
                        onClick={editHandler}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-gray-800 rounded-lg border border-gray-700 mt-3 px-2 py-2">
                  <span className="text-white font-medium text-lg">
                    {user?.name || "Not set"}
                  </span>
                  <button
                    className="text-blue-600 hover:text-blue-700 text-sm "
                    onClick={editHandler}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
