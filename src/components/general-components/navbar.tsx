import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 border border-b-2 border-gray-200 bg-white">
      <div className="flex justify-between pt-6 pb-2 px-8 relative">
        <Link
          href={"/home"}
          className="flex gap-2 justify-center items-center text-lg"
        >
          <p className="font-bold ">Delegate</p>
          <span className="flex justify-items-start font-semibold rounded-full bg-green-600 text-white px-2 h-4 text-xs">
            AI
          </span>
        </Link>
        <div className="flex justify-between gap-6 pt-2">
          <div className="flex flex-col justify-self-end text-end">
            <p className="text-lg">Happy Dental</p>
            <Link
              href={"/contact"}
              className="text-primary-blue text-xs underline"
            >
              Call more patients
            </Link>
          </div>
          <Link href={""} className="flex gap-1">
            <div className="bg-gray-200 rounded-full p-6"></div>
            <ChevronDown className="flex self-center" />
          </Link>
        </div>
      </div>
    </div>
  );
}
