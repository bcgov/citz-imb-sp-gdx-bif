import * as React from "react";
import { Stack, IStackTokens, SpinButton, Label } from "@fluentui/react";

const StackTokens: Partial<IStackTokens> = { childrenGap: 10 };
const StackStyles = { root: { width: 400 } };

interface NumberFieldProps {
  fieldName: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({ fieldName }) => (
  <SpinButton
    defaultValue='0'
    labelPosition={0}
    label='test'
    min={0}
    step={1}
    incrementButtonAriaLabel={"Increase value by 1"}
    decrementButtonAriaLabel={"Decrease value by 1"}
  />
);
