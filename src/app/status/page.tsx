import { Card } from "@/components/ui/card";
import CustomCard from "@/components/ui/custom-card";
import { ChevronDown, Lightbulb } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Status() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50 border border-b-2 border-gray-200 bg-white">
        <div className="flex justify-between pt-6 pb-2 px-8 relative">
          <div className="flex gap-2 justify-center items-center text-lg">
            <p className="font-bold">Delegate</p>
            <span className="flex justify-items-start font-semibold rounded-full bg-green-600 text-white px-2 h-4 text-xs">
              AI
            </span>
          </div>
          <div className="flex justify-between gap-6 pt-2">
            <div className="flex flex-col justify-self-end text-end">
              <p className="text-lg">Happy Dental</p>
              <Link href={""} className="text-primary-blue text-xs underline">
                Demo Mode
              </Link>
            </div>
            <Link href={""} className="flex gap-1">
              <div className="bg-gray-200 rounded-full p-6"></div>
              <ChevronDown className="flex self-center" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-20 h-screen">
        <div className="px-8 flex flex-col gap-4 bg-slate-100 py-12 h-full">
          <p className="text-xl font-bold">Call Status Page </p>
          <p className="flex text-gray-600 text-lg  pt-4">
            <Lightbulb className="text-red-500" />
            Note: Free for to close this browser. A summary of the
            interaction(s) will be sent to your email.
          </p>
          <div className="md:grid md:grid-cols-2 flex flex-col gap-2 md:gap-12 w-full md:mt-14 mt-4 text-lg h-2/3">
            <Card className="rounded-lg space-y-4 px-6 py-6">
              <p className="text-xl font-bold bg-[#E86F2714] text-[#EB6F27] px-2 py-2">
                Call Status
              </p>
              <p className="text-gray-600">
                AI is calling the following patient(s):
              </p>
              <p>Patient name:</p>
              <p>Patient phone number:</p>
              <p>Objective:</p>
            </Card>
            <Card className="h-full rounded-lg space-y-4 px-6 py-6">
              <p className="text-xl font-bold bg-[#24AD4214] text-[#24AD42] px-2 py-2">
                Live transcript
              </p>
              <p className="text-gray-600">Calling Dr.Jones...:</p>
              <p>Patient name:</p>
              <p>8:04 Hi I'm calling to...</p>
              <p>Calling Dr.Jones...</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
