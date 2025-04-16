import { AnimatePresence } from "framer-motion";
import * as motion from "framer-motion/client";
import { Check, X } from "lucide-react";
import { getPasswordValidations } from "@/utils/validateAuth";

interface PasswordRequirementsProps {
  password: string;
}

export default function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  const validations = getPasswordValidations(password);
  const animationVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  if (!password) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="enter"
        animate="center"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full h-auto border rounded-2xl border-[#EEEEEE] mt-2">
          <div className="p-4 flex flex-col gap-1">
            <h1 className="text-[var(--foreground)] font-semibold text-base mb-2">
              Your password must contain:
            </h1>
            <p className="text-[var(--foreground)]/60 font-regular text-sm flex items-center">
              {validations.isCharValid ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              At least 8 characters
            </p>
            <p className="text-[var(--foreground)]/60 font-regular text-sm flex items-center">
              {validations.isNumValid ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              At least one number
            </p>
            <p className="text-[var(--foreground)]/60 font-regular text-sm flex items-center">
              {validations.isCapitalValid ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              At least one capital letter
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
