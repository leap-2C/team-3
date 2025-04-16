import { Mail, Lock, UserRound } from "lucide-react";

interface InputFieldProps {
  icon: "mail" | "lock" | "user";
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export default function InputField({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
}: InputFieldProps) {
  const IconComponent =
    icon === "mail" ? Mail : icon === "lock" ? Lock : UserRound;

  return (
    <div className="flex flex-col">
      <div className="bg-[var(--background)] rounded-2xl border-[#EEEEEE] border-2 w-full flex flex-row justify-center items-center gap-4 py-1">
        <IconComponent width={23} strokeWidth={1.5} className="ml-5" />
        <hr className="border-r-1 border-[#EEEEEE] h-8" />
        <div className="flex flex-col w-full py-2 px-1">
          <p className="text-[10px] text-[var(--foreground)]/50 font-bold -mb-[2px]">
            {label}
          </p>
          <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="bg-[var(--background)] text-sm text-[var(--foreground)] shadow-none w-full h-6 border-none pl-0 rounded-none font-bold focus:outline-none"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
