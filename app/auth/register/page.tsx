'use client';

import Image from "next/image";
import RegisterForm from "../components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* LEFT SIDE - ORANGE IMAGE SECTION */}
      <div className="hidden md:flex w-1/2 h-full bg-orange-600 items-center justify-center">
        <div className="flex items-center justify-center w-full h-full p-10">
          <Image
            src="/assets/images/burger.jpg" // use same image as login
            alt="Food Image"
            width={500}
            height={500}
            className="object-contain max-h-[80%] w-auto"
            priority
          />
        </div>
      </div>

      {/* RIGHT SIDE - REGISTER SECTION */}
      <div className="w-full md:w-1/2 h-full bg-[#d9d3c3] flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <RegisterForm />
        </div>
      </div>

    </div>
  );
}