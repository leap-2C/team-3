import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import { ProfileFormData } from "../page";
import { ReactNode } from "react";

interface InputGroupProps {
  id: keyof ProfileFormData;
  label: string;
  placeholder: string;
  className?: string;
  register: UseFormRegister<ProfileFormData>;
  registerOptions?: RegisterOptions<ProfileFormData, keyof ProfileFormData>;
  error?: string;
  icon?:ReactNode;
}

export default function InputGroup({
  id,
  label,
  placeholder,
  className = "",
  register,
  registerOptions,
  error,
  icon,
}: InputGroupProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="w-full h-[65px] rounded-2xl bg-[#161616] border border-[#3B3B3B] px-4 py-2 flex items-center gap-4">
        {icon && (
          <div className="flex items-center mx-2 text-white opacity-60">
            {icon}
          </div>
        )}

        {icon && <div className="h-8 w-[1px] bg-[#3B3B3B]" />}

        <div className="flex flex-col flex-1 leading-1.5">
          <Label htmlFor={id} className="text-[10px] text-[#7D7D7D] mb-[2px]">
            {label}
          </Label>
          <Input
            id={id}
            placeholder={placeholder}
            {...register(id, registerOptions)}
            className="h-auto p-0 bg-transparent border-none text-sm text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1 px-2">{error}</p>}
    </div>
  );
}

