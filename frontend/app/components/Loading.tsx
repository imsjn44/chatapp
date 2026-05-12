import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen  flex inset-0 items-center justify-center bg-gray-900">
      <div className="h-12 w-12 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};

export default Loading;
