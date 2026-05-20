import { Suspense } from "react";
import VerifyOtp from "../components/VerifyOtp";

const VerifyPage = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <VerifyOtp />
    </Suspense>
  );
};

export default VerifyPage;
