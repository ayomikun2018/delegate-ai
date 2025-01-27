// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import Image from "next/image";
import { Button } from "./button";
import AddIcon from "../../../public/assets/images/add-icon-product.svg";
import RemoveIcon from "../../../public/assets/images/remove-icon-product.svg";
import CancelIcon from "../../../public/assets/images/cancel-modal-icon.svg";

export default function SizeSubInput({ formik }: any) {
  const [isAddingSize, setIsAddingSize] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!formik?.values?.sizes) {
      formik.setFieldValue("sizes", {});
    }
  }, [formik]);

  const maxUnits = Number(formik?.values?.availableUnit) || 0;

  const getTotalUnits = () =>
    Object.values(formik?.values?.sizes || {}).reduce((total, unit) => total + unit, 0);

  const handleAddSize = () => {
    const unitValue = Number(newUnit);

    if (newSize && (!unitValue || unitValue <= 0)) {
      setError("Enter a valid positive number for units if size is provided.");
      return;
    }

    if (getTotalUnits() + unitValue > maxUnits) {
      setError(`Total units cannot exceed ${maxUnits}.`);
      return;
    }

    if (newSize && unitValue > 0) {
      formik.setFieldValue(`sizes.${newSize}`, unitValue);
      setNewSize("");
      setNewUnit("");
      setError("");
    }
  };

  const handleRemoveSize = (size) => {
    const updatedSizes = { ...formik?.values?.sizes };
    delete updatedSizes[size];
    formik.setFieldValue("sizes", updatedSizes);
  };

  return (
    <div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setIsAddingSize(!isAddingSize)}
          className="flex justify-between items-center w-full"
        >
          <h2 className="font-medium">Click to add Product size</h2>
          <Image src={isAddingSize ? RemoveIcon : AddIcon} alt="toggle icon" />
        </button>
      </div>
      {isAddingSize && (
        <div className="bg-[#F2F3F5] p-4 mt-4 rounded-lg">
          <div className="flex gap-4">
            <span className="flex flex-col gap-4">
              <Label className="text-sm">Add Size</Label>
              <Input
                className="py-6"
                placeholder="Enter product size"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
              />
            </span>
            <span className="flex flex-col gap-4">
              <Label className="text-sm">Units</Label>
              <Input
                className="py-6"
                type="number"
                min="1"
                placeholder="Enter product unit"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
              />
            </span>
            <span className="flex items-center mt-8">
              <Button
                className="px-8 rounded-sm"
                onClick={handleAddSize}
                type="button"
              >
                Add
              </Button>
            </span>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      )}
      <div className="mt-6">
        <ul className="flex flex-wrap gap-4">
          {Object.entries(formik?.values?.sizes || {}).map(([size, unit], index) => (
            <li key={index} className="flex items-center gap-2 bg-primary text-white font-medium rounded-md px-4 py-2">
              <span>Size {size} / {unit} units</span>
              <button onClick={() => handleRemoveSize(size)}>
                <Image src={CancelIcon} alt="cancel" className="bg-white rounded-full" width={15} height={15} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
