
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomCard from "@/components/ui/custom-card";
import { DataTableDemo } from "@/components/ui/data-table";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { ChevronDown,PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  const callData = [
    { type: "Preventative Follow-Up", count: 56 },
    { type: "Completed Reducing-No-Show Rates", count: 45 },
    { type: "Filling Cancelled Appointments", count: 23 },
    { type: "Post-Treatment Follow-Ups", count: 23 },
    { type: "Billing and Payment Collection", count: 12 },
  ];

  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full z-50 border border-b-2 border-gray-200 bg-white">
        <div className="flex justify-between pt-6 pb-2 px-8 relative">
          <div className="flex gap-2 justify-center items-center text-lg">
            <p className="font-bold ">Delegate</p>
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
      <div className="md:px-8 px-2 bg-slate-100 flex flex-col gap-6 pb-4 ">
        <div
          className="md:flex md:justify-end   
        "
        >
          <div className="mt-28 flex  gap-4">
            <DatePickerDemo />
            <Link href={"/contact"} className="flex gap-1  ">
              <Button className=" bg-blue-900">
                Start a Journey  <PlusCircleIcon />{" "}
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between gap-4 md:flex-row flex-col ">
          <CustomCard
            title="Calls Made"
            amount={"98"}
            bgColor="#24AD4214"
            textColor="#24AD42"
          />
          <CustomCard
            title="Calls picked up"
            amount={"56"}
            bgColor="#E86F2714"
            textColor="#EB6F27"
          />
          <CustomCard
            title="Calls where objective was met"
            amount={"23"}
            bgColor="#7EB2FF1A"
            textColor="#7EB2FF"
          />
        </div>

        <div
          className="text-white outline outline-4 outline-primary-blue rounded-xl relative overflow-hidden my-4 "
          style={{
            background: "linear-gradient(135deg, #100A2C, #321F89)", // Gradient shades of blue
          }}
        >
          <div className="py-6 px-8 grid grid-cols-2 gap-4 ">
            <div className="col-span-2 flex  border-b border-gray-400 pb-2">
              <p className="text-lg font-bold">Type of calls</p>
              <p className="text-lg font-bold md:pl-[34rem] pl-[4rem]">Number of calls</p>
            </div>

            <div>
              {callData.map((call, index) => (
                <p key={index} className="text-md font-medium">
                  {call.type}
                </p>
              ))}
            </div>
            <div>
              {callData.map((call, index) => (
                <p key={index} className="text-md font-semibold">
                  {call.count}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Card className="py-4 px-6">
          <p className=" text-lg  font-bold">Most Recent Calls</p>
          <DataTableDemo />
        </Card>
      </div>
    </div>
  );
}
