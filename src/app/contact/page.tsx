//@ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  PlusCircleIcon,
  Trash2,
  PhoneCallIcon,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/general-components/navbar";

export default function Contact() {
  const router = useRouter();
  const ehrOptions = [
    { value: "abeldent", label: "ABELDent" },
    { value: "advancedmd", label: "AdvancedMD" },
    { value: "allscripts", label: "Allscripts" },
    { value: "athenahealth", label: "Athenahealth" },
    { value: "carecloud", label: "CareCloud" },
    { value: "carestream_dental", label: "Carestream Dental" },
    { value: "cerner_oracle_health", label: "Cerner (Oracle Health)" },
    { value: "cloud9ortho", label: "Cloud 9 Ortho" },
    { value: "curve_dental", label: "Curve Dental" },
    { value: "dentrix_henry_schein", label: "Dentrix (Henry Schein)" },
    { value: "dentimax", label: "DentiMax" },
    { value: "drchrono", label: "DrChrono" },
    {
      value: "eaglesoft_patterson_dental",
      label: "Eaglesoft (Patterson Dental)",
    },
    { value: "easy_dental", label: "Easy Dental" },
    { value: "eclinicalworks", label: "eClinicalWorks" },
    { value: "epic_systems", label: "Epic Systems" },
    { value: "icanotes", label: "ICANotes" },
    { value: "kareo_behavioral_health", label: "Kareo Behavioral Health" },
    { value: "luminello", label: "Luminello" },
    { value: "mentalyc", label: "Mentalyc" },
    { value: "nextgen_healthcare", label: "NextGen Healthcare" },
    { value: "open_dental", label: "Open Dental" },
    { value: "practice_fusion", label: "Practice Fusion" },
    { value: "simplepractice", label: "SimplePractice" },
    {
      value: "softdent_carestream_dental",
      label: "SoftDent (Carestream Dental)",
    },
    { value: "therabill", label: "TheraBill" },
    { value: "theranest", label: "TheraNest" },
    { value: "therapynotes", label: "TherapyNotes" },
    { value: "valant", label: "Valant" },
  ];

  const patientGroupOptions = [
    {
      value: "new_patients",
      label: "New patients: Joined in the last 3 months.",
    },
    {
      value: "inactive",
      label: "Inactive: Patients who haven’t visited in 12+ months.",
    },
    {
      value: "upcoming_appointments",
      label: "Patients with upcoming appointments.",
    },
    {
      value: "canceled_not_rescheduled",
      label: "Patients who canceled and have not rescheduled.",
    },
    {
      value: "followups_pending_procedures",
      label: "Patients who need follow-ups or pending procedures.",
    },
    {
      value: "preventative",
      label: "Preventative: Patients due for regular cleanings, etc.",
    },
    {
      value: "pediatric",
      label: "Pediatric: Families with young children requiring dental care.",
    },
    {
      value: "orthodontic",
      label: "Orthodontic: Patients interested in braces or clear aligners.",
    },
    {
      value: "cosmetic_dentistry",
      label:
        "Cosmetic dentistry: teeth whitening, veneers, or smile makeovers.",
    },
    { value: "seniors", label: "Seniors" },
    {
      value: "nervous_patients",
      label: "Patients who are nervous of dental visits.",
    },
    { value: "high_risk", label: "High risk patients" },
    { value: "no_insurance", label: "Patients who don't have insurance." },
    {
      value: "specialty_services",
      label: "Specialty services: implants, etc.",
    },
    {
      value: "loyal_referring_patients",
      label: "Loyal patients who refer others to the practice.",
    },
    { value: "pending_payment", label: "Pending payment" },
  ];
  const nextStepsOptions = [
    { value: "schedule_next_appointment", label: "Schedule next appointment" },
    {
      value: "explore_patient_questions",
      label: "Explore if the patient has any questions about our services.",
    },
    {
      value: "enquire_patient_feelings",
      label: "Enquire how the patient is feeling after the last procedure.",
    },
    {
      value: "remind_payment_options",
      label: "Remind about payment and offer payment options",
    },
    {
      value: "confirm_next_appointment_availability",
      label: "Confirm availability for next appointment",
    },
    {
      value: "confirm_earlier_slot_availability",
      label: "Confirm availability for an earlier slot, if available",
    },
  ];

  const [selectedOption, setSelectedOption] = useState("manual");
  const [loading, setLoading] = useState(false);
  const [journeys, setJourneys] = useState([
    { id: 1, ehr: "", group: "", step: "" },
  ]);

  const handleAddJourney = () => {
    setJourneys((prev) => [
      ...prev,
      { id: Date.now(), ehr: "", group: "", step: "" },
    ]);
  };

  const handleRemoveJourney = (id: number) => {
    if (journeys.length > 1) {
      setJourneys((prev) => prev.filter((journey) => journey.id !== id));
    }
  };

  const handleJourneyChange = (id: number, field: string, value: string) => {
    setJourneys((prev) =>
      prev.map((journey) =>
        journey.id === id ? { ...journey, [field]: value } : journey
      )
    );
  };
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number input
  const [patientName, setPatientName] = useState(""); // State for phone number input
  const [email, setEmail] = useState(""); // State for email input
  const [patientHistory, setPatientHistory] = useState(""); // State for email input
  const [objective, setObjective] = useState(""); // State for call objective
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input change
  const handleInputChange = (setter: any) => (e: any) => setter(e.target.value);

  // Function to make the call
  const handleMakeCall = async () => {
    if (!phoneNumber || !patientName || !objective || !patientHistory) {
      setResponseMessage("Please fill in all the fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const backendUrl =
        "https://callai-backend-243277014955.us-central1.run.app/api/v2/initiate-call";

      const selectedBusiness = localStorage.getItem("selectedBusiness");
      const response = await axios.post(backendUrl, {
        patient_number: phoneNumber,
        patient_name: patientName,
        objective,
        patient_history: patientHistory,
        name_of_org: selectedBusiness,
      });

      router.push(
        `/status?ssid=${
          response.data.call_sid
        }&isInitiated=true&patient_number=${encodeURIComponent(
          phoneNumber
        )}&patient_name=${encodeURIComponent(
          patientName
        )}&objective=${encodeURIComponent(
          objective
        )}&patient_history=${encodeURIComponent(
          patientHistory
        )}&selectedBusiness=${encodeURIComponent(selectedBusiness)}`
      );
    } catch (error: any) {
      setResponseMessage(
        `Failed to initiate the call. Error: ${
          error.response?.data?.detail || error.message
        }`
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div className=" ">
      <Navbar />
      <div className="md:px-8 px-2 bg-slate-100 flex flex-col gap-6 pb-16 pt-6 ">
        <Card className="rounded-lg space-y-4 px-8 py-6 mt-28  flex flex-col  self-center  ">
          <div className="flex flex-col gap-6 pt-2">
            <RadioGroup
              value={selectedOption}
              onValueChange={(value) => setSelectedOption(value)}
              className="flex md:gap-12"
            >
              <p className="font-bold md:text-lg text-sm">Patient Group:</p>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="r1" className=" " />
                <Label htmlFor="r1">Enter manually</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ehr" id="r2" className="" />
                <Label htmlFor="r2">Connect to EHR</Label>
              </div>
            </RadioGroup>

            {/* Conditional Rendering */}
            {selectedOption === "manual" && (
              <>
                <div className="flex flex-col  gap-4 pt-4">
                  <Label
                    htmlFor="patient"
                    className="w-auto font-semibold text-slate-600"
                  >
                    Patient Name
                  </Label>
                  <Input
                    value={patientName}
                    onChange={handleInputChange(setPatientName)}
                  />
                </div>
                <div className="flex flex-col  gap-4">
                  <Label
                    htmlFor="number"
                    className="w-auto font-semibold text-slate-600"
                  >
                    Patient Phone Number
                  </Label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handleInputChange(setPhoneNumber)}
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <Label
                    htmlFor="patient"
                    className=" w-auto  font-semibold text-slate-600"
                  >
                    Objective
                  </Label>
                  <Textarea
                    id="objective"
                    value={objective}
                    onChange={handleInputChange(setObjective)}
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <Label
                    htmlFor="number"
                    className=" w-auto text-slate-600 font-semibold "
                  >
                    Additional Details
                  </Label>
                  <Textarea
                    value={patientHistory}
                    onChange={handleInputChange(setPatientHistory)}
                  />
                </div>
              </>
            )}

            {selectedOption === "ehr" &&
              journeys.map((journey) => (
                <div
                  key={journey.id}
                  className="  flex flex-col items-end mb-4 border-b pb-4 mt-6 gap-6"
                >
                  <div className="flex flex-col space-y-4 w-full">
                    <Label
                      className="font-semibold text-slate-600"
                      htmlFor={`ehr-${journey.id}`}
                    >
                      Choose EHR
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleJourneyChange(journey.id, "ehr", value)
                      }
                      value={journey.ehr}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {ehrOptions.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col space-y-4 w-full">
                    <Label
                      className=" font-semibold text-slate-600"
                      htmlFor={`group-${journey.id}`}
                    >
                      Choose Patient Group
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleJourneyChange(journey.id, "group", value)
                      }
                      value={journey.group}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {patientGroupOptions.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-4 w-full">
                    <Label
                      htmlFor={`step-${journey.id}`}
                      className="font-semibold text-slate-600"
                    >
                      Choose Patient Next Step
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleJourneyChange(journey.id, "step", value)
                      }
                      value={journey.step}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {nextStepsOptions.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={() => handleRemoveJourney(journey.id)}
                    disabled={journeys.length === 1}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            {selectedOption === "ehr" && (
              <div className="flex justify-center">
                <Button
                  className="px-14 py-6 bg-blue-900 w-auto flex justify-center"
                  onClick={handleAddJourney}
                  type="button"
                >
                  <PlusCircleIcon />
                  Add another patient journey
                </Button>
              </div>
            )}
            <div className="flex gap-1 justify-center">
              <Button
                onClick={handleMakeCall}
                disabled={loading}
                className="relative bg-blue-900"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3h-4z"
                      ></path>
                    </svg>
                    Calling...
                  </div>
                ) : (
                  <>
                    <PhoneCallIcon className="mr-2 h-5 w-5 " /> Call the Patient
                  </>
                )}
              </Button>
            </div>
          </div>
          {responseMessage && (
            <p
              className={`mt-4 text-center font-medium max-w-full break-words ${
                responseMessage.includes("Failed")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {responseMessage}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
