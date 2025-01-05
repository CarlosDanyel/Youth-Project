import { ReactNode } from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

type FieldWrapperProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

const FieldWrapper = ({ children, label, className }: FieldWrapperProps) => {
  return (
    <div className={cn("relative flex flex-col gap-2", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
};

export default FieldWrapper;
