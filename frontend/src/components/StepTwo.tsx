"use client";

import { CircleCheck, ImageUp, Link2, User2 } from "lucide-react";
import InputGroup from "@/components/InputGroup";
import TextareaGroup from "@/components/TextArea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export type ProfileFormData = {
  username: string;
  firstName: string;
  lastName: string;
  about: string;
};

interface StepTwoProps {
  inputValue: {
    url: string;
    username: string;
    firstName: string;
    lastName: string;
    about: string;
  };
  setInputValue: any;
  stepNext: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  inputValue,
  setInputValue,
  stepNext,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: inputValue.username,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      about: inputValue.about,
    },
  });

  const about = watch("about");

  const onSubmit = (data: ProfileFormData) => {
    setInputValue((prev: StepTwoProps["inputValue"]) => ({
      ...prev,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      about: data.about,
    }));
    stepNext();
  };

  //api-aas avsan username haruulna
  useEffect(() => {
    // test
    const UserOne = {
      username: "",
    };

    reset({
      username: UserOne.username,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      about: inputValue.about,
    });
  }, [reset]);

  // preview harahiin tuld formoos inputiin utguudiig hynaj haruulna
  const watchedValues = watch();

  // URL copy hiine
  const handleCopyUrl = () => {
    const urlToCopy = `https://buymecoffee.com/${
      watchedValues.username || "username"
    }`;

    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="grid place-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center gap-80"
      >
        <div className="w-[352px] grid place-items-center gap-7">
          <h6 className="w-[240px] py-2 text-transparent bg-gradient-to-r from-white via-white to-blurred bg-clip-text font-extrabold text-[40px] leading-10">
            Create your profile page
          </h6>

          <div className="grid grid-cols-6 gap-4 w-full relative">
            <InputGroup
              id="username"
              label="Username"
              placeholder="Pick a cool username"
              className="col-span-6 font-bold"
              register={register}
              registerOptions={{
                required: "* Username is required",
              }}
              error={errors.username?.message}
              icon={<User2 className="w-4 h-4" />}
            />
            <CircleCheck
              width={17}
              className="absolute stroke-[#00FF7B] right-4 top-5"
            />
            <InputGroup
              id="firstName"
              label="First Name"
              placeholder="Your first name"
              className="col-span-3"
              register={register}
              registerOptions={{
                required: "* First name is required",
                minLength: {
                  value: 2,
                  message: "* At least 2 characters",
                },
              }}
              error={errors.firstname?.message}
            />

            <InputGroup
              id="lastName"
              label="Last Name"
              placeholder="Your last name"
              className="col-span-3"
              register={register}
              registerOptions={{
                required: "* Last name is required",
                minLength: {
                  value: 2,
                  message: "* At least 2 characters",
                },
              }}
              error={errors.lastname?.message}
            />
            <TextareaGroup
              id="about"
              label="About"
              placeholder="Tell us a little about yourself"
              className="col-span-6"
              register={register}
              error={errors.about?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[57px] bg-[#0363FB] hover:bg-[#0362fbe8] cursor-pointer rounded-2xl"
          >
            Continue
          </Button>
        </div>

        {/* preview */}
        <div className="relative w-[432px] h-[591px] rounded-4xl overflow-hidden hidden lg:block">
          <div
            className="h-1/2 box-border group relative bg-slate-400 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://shorturl.at/reOZ8)`,
            }}
          >
            <div className="absolute opacity-0 left-4 top-6 px-5 py-2 bg-[var(--foreground)]/40 rounded-full  group-hover:opacity-100 transition-all cursor-pointer">
              <p className="text-xs text-[var(--background)] flex flex-row items-center gap-2">
                <ImageUp width={14} />
                Upload image
              </p>
            </div>
            <div className="absolute bottom-[23px] right-[21px] bg-white hover:bg-[#f5f5f5] py-2 px-5 rounded-full text-sm font-bold text-black flex items-center justify-center cursor-pointer">
              Follow
            </div>
          </div>
          <div
            className="absolute top-[40%] left-[34px] w-[111px] h-[111px] rounded-2xl overflow-hidden group aspect-square bg-slate-500 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://shorturl.at/Qy5e9)`,
            }}
          >
            <div className="absolute w-full h-full opacity-0 flex justify-center items-center  bg-[var(--foreground)]/40 group-hover:opacity-100 transition-all cursor-pointer">
              <ImageUp width={20} className="stroke-[var(--background)]" />
            </div>
          </div>
          <div className="h-1/2 bg-white box-border p-8 flex flex-col gap-4 ">
            <div className="font-extrabold text-black text-3xl mt-8">
              {watchedValues.firstName || "Your Name"}
            </div>
            <div className="text-black/60 -mt-4 text-sm">
              @{watchedValues.username || "username"}
            </div>
            <div className="text-black opacity-80 relative text-sm">
              <p className="line-clamp-3">{about || "No bio yet."}</p>

              {about && about.length > 35 && (
                <span className="block text-sm text-blue-400 cursor-pointer">
                  See more...
                </span>
              )}
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row text-gray-400 gap-1 text-xs items-center">
                <p className="text-black font-extrabold text-base">100</p>{" "}
                Following
              </div>
              <div className="flex flex-row text-gray-400 gap-1 text-xs items-center">
                <p className="text-black font-extrabold text-base">20.7K</p>{" "}
                Followers
              </div>
            </div>
            <div className="flex flex-row text-sm items-center text-blue-400 gap-2 font-bold mt-2">
              <Link2
                className="h-5 text-gray-400 p-0 cursor-pointer"
                onClick={handleCopyUrl}
              />
              buymecoffee.com/{inputValue.url || "-"}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
