//@ts-nocheck
import { forwardRef } from "react";
import NumberTextField from "./number-textfield";
import { CurrencyEnum } from "@/constants/numberConstants";
const CurrencyTextField = forwardRef(
  /**
   *
@param {CurrencyTextFieldProps} props
@param {import("react").ComponentRef<typeof NumberTextField>} ref
@returns
   */
  function CurrencyTextField(props, ref) {
    const { code, InputProps, ...restProps } = props;
    const currency = CurrencyEnum[code || "NGN"];
    return <NumberTextField ref={ref} {...restProps} />;
  }
);
export default CurrencyTextField;
/**
@typedef {{
code: keyof typeof CurrencyEnum
} & import("./NumberTextField").NumberTextFieldProps} CurrencyTextFieldProps
 */
