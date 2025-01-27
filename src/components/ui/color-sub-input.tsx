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

export default function ColorSubInput({ formik }: any) {
  const [isAddingColor, setIsAddingColor] = useState(false);
  const [newColor, setNewColor] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (formik && formik.values && !formik.values.colors) {
      formik.setFieldValue("colors", {});
    }
  }, [formik]);

  const maxUnits = parseInt(formik?.values?.availableUnit, 10) || 0;

  const getTotalUnits = () =>
    Object.values(formik?.values?.colors || {}).reduce(
      (total, unit) => total + unit,
      0
    );

  const handleAddColor = () => {
    const unitValue = Number(newUnit);

    if (newColor && (!unitValue || unitValue <= 0)) {
      setError("Enter a valid positive number for units if color is provided.");
      return;
    }

    if (getTotalUnits() + unitValue > maxUnits) {
      setError(`Total units cannot exceed ${maxUnits}.`);
      return;
    }

    if (newColor && unitValue > 0) {
      formik.setFieldValue(`colors.${newColor}`, unitValue);
      setNewColor("");
      setNewUnit("");
      setError("");
    }
  };

  const handleRemoveColor = (color) => {
    const updatedColors = { ...formik?.values?.colors };
    delete updatedColors[color];
    formik.setFieldValue("colors", updatedColors);
  };

  return (
    <div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setIsAddingColor(!isAddingColor)}
          className="flex justify-between items-center w-full"
        >
          <h2 className="font-medium">Click to add Product color</h2>
          {isAddingColor ? (
            <Image src={RemoveIcon} alt="remove" />
          ) : (
            <Image src={AddIcon} alt="add" />
          )}
        </button>
      </div>
      {isAddingColor && (
        <div className="bg-[#F2F3F5] p-4 mt-4 rounded-lg">
          <div className="flex gap-4">
            <span className="flex flex-col gap-4">
              <Label className="text-sm">Add Color</Label>
              <Input
                className="py-6"
                placeholder="Enter product color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
            </span>
            <span className="flex flex-col gap-4">
              <Label className="text-sm">Units</Label>
              <Input
                className="py-6"
                type="number"
                min="1"
                placeholder="Enter number of units"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
              />
            </span>
            <span className="flex items-center mt-8">
              <Button
                className="px-8 rounded-sm"
                onClick={handleAddColor}
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
        <p className="text-red-500 text-xs"></p>
        <div className="flex gap-4">
          <ul className="flex flex-wrap gap-4">
            {Object.entries(formik?.values?.colors || {}).map(
              ([color, unit], index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-primary text-white font-medium rounded-md px-4 py-2"
                >
                  <span>
                    Color {color} / {unit} units
                  </span>
                  <button onClick={() => handleRemoveColor(color)}>
                    <Image
                      src={CancelIcon}
                      alt="cancel"
                      className="bg-white rounded-full"
                      width={15}
                      height={15}
                    />
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
