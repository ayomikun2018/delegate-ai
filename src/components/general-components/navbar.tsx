"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Navbar() {
  const options = [
    { value: "Happy Dental", label: "Happy Dental" },
    { value: "Rejoice Therapy", label: "Rejoice Therapy" },
    { value: "Western Sports Therapy", label: "Western Sports Therapy" },
  ];

  // State to manage selected name
  const [selectedName, setSelectedName] = useState("Happy Dental");

  // Load selected name from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("selectedBusiness");
    if (storedName) {
      setSelectedName(storedName);
    }
  }, []);

  // Handle selection change
  const handleSelectChange = (value: any) => {
    setSelectedName(value);
    localStorage.setItem("selectedBusiness", value);
  };

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
            {/* Selected name updates dynamically */}
            <p className="text-lg">{selectedName}</p>
            <Link
              href={"/home"}
              className="text-primary-blue text-xs underline"
            >
              Demo Mode
            </Link>
          </div>
          <div className="flex gap-1">
            <div className="bg-gray-200 rounded-full p-6  "></div>
            <Select onValueChange={handleSelectChange} value={selectedName}>
              <SelectTrigger>
                {/* <SelectValue placeholder="Choose Business" /> */}
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
