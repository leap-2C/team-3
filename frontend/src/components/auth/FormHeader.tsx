interface FormHeaderProps {
  activeTab: string;
}

export default function FormHeader({ activeTab }: FormHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-4xl font-extrabold">
        {activeTab === "signup" ? "Create an Account" : "Welcome Back"}
      </h1>
      <p className="text-balance text-sm text-[var(--foreground)]/40 -mt-2">
        Please enter your details wisely
      </p>
    </div>
  );
}
