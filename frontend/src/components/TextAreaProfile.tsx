import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import { ProfileFormData } from "@/components/StepTwo";

interface TextareaGroupProps {
  id:
    | "username"
    | "firstname"
    | "lastname"
    | "about"
    | "avatarImage"
    | "backgroundImage";
  label: string;
  placeholder: string;
  className?: string;
  register: UseFormRegister<ProfileFormData>;
  registerOptions?: RegisterOptions<ProfileFormData, keyof ProfileFormData>;
  error?: string;
}

export default function TextareaGroup({
  id,
  label,
  placeholder,
  className = "",
  register,
  registerOptions,
  error,
}: TextareaGroupProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="w-full h-[128px] rounded-2xl bg-[#161616] border border-[#3B3B3B] px-4 py-3 flex flex-col justify-start">
        <Label htmlFor={id as string} className="text-[10px] text-[#7D7D7D]">
          {label}
        </Label>
        <Textarea
          id={id as string}
          placeholder={placeholder}
          {...register(
            id as
              | "username"
              | "firstname"
              | "lastname"
              | "about"
              | "avatarImage"
              | "backgroundImage",
            registerOptions
          )}
          className="p-0 resize-none bg-transparent border-none text-sm text-white focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 px-2">{error}</p>}
    </div>
  );
}

// check
