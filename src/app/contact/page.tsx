"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusCircleIcon,
  Trash2,
  PhoneCallIcon,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Contact() {
  const periods = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last7days", label: "Last 7 days" },
    { value: "last30days", label: "Last 30 days" },
    { value: "last90days", label: "Last 90 days" },
    { value: "last365days", label: "Last 365 days" },
    { value: "custom", label: "Custom" },
  ];
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
        <Card className="rounded-lg space-y-4 px-6 py-6 mt-28 ">
          <form className="flex flex-col gap-6 pt-2">
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
                <div className="flex flex-col  gap-4">
                  <Label htmlFor="patient" className="w-auto">
                    Patient Name
                  </Label>
                  <Input />
                </div>
                <div className="flex flex-col  gap-4">
                  <Label htmlFor="number" className="w-auto">
                    Patient Phone Number
                  </Label>
                  <Input />
                </div>
              </>
            )}

            {selectedOption === "ehr" &&
              journeys.map((journey, index) => (
                <div
                  key={journey.id}
                  className="md:grid md:grid-cols-3 gap-6  flex flex-col items-end mb-4 border-b pb-4 mt-6"
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

                  {/* <div className="flex flex-col space-y-4">
                    <Label
                      htmlFor="patient"
                      className=" w-auto font-semibold text-slate-600 "
                    >
                      Objective
                    </Label>
                    <Textarea />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Label
                      htmlFor="number"
                      className=" w-auto font-semibold text-slate-600 "
                    >
                      Additional Details
                    </Label>
                    <Textarea />
                  </div> */}
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
            <Link href={"/status"} className="flex gap-1 justify-start">
              <Button className="px-14 py-6 bg-blue-900">
                <PhoneCallIcon /> Call the patient
              </Button>
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
}
