// components/PreviewButton.jsx
//@ts-nocheck
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { setFormData } from "@/config/formSliceConfig";
import { RouteEnums } from "../GeneralComponents/layout/routeUrl";

const PreviewButton = ({ formik, id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const url = id
    ? `${RouteEnums.PREVIEW_PRODUCT}?id=${id}`
    : RouteEnums.PREVIEW_PRODUCT;
  const handlePreview = () => {
    const set = setFormData(formik.values);
    dispatch(set);
    router.push(url);
  };

  return (
    <Button
      loading={formik.isSubmitting}
      variant="secondary"
      className="rounded-full md:text-lg md:py-8 md:px-12"
      onClick={handlePreview}
      disabled={!formik.isValid || !formik.dirty}
      type="button"
    >
      Preview
    </Button>
  );
};

export default PreviewButton;
