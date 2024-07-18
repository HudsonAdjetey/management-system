"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/components/constants/img";
import RegisterForm from "@/components/Forms/RegisterForm";
const Page = ({ params }) => {
  console.log(params.users);
  const router = useRouter();
  const userID = router.query;
  const searchParams = useSearchParams();
  const search = searchParams.get("userID");
  console.log(search);
  console.log(searchParams);
  console.log(userID);

  return (
    <section className="flex justify-between h-screen max-h-screen">
      <div className="section_main remove-scrollbar flex flex-col justify-between">
        <div className="flex gap-3 items-center mt-3">
          <Image
            src={Images.logo}
            alt="Logo"
            width={40}
            height={40}
            className="aspect-square"
          />
          <h1>Management System</h1>
        </div>
        {/* REGISTER FORM CONTENT HERE */}
        <RegisterForm />
        {/* REGISTER FORM CONTENT HERE */}
        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 SwiftTech
          </p>
          <span onClick={() => router.push("/")}>
            <a href="/" className="text-blue-500">
              Back to Home
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Page;