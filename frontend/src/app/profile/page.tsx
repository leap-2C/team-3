"use client";

import { useForm } from "react-hook-form";
import InputGroup from "./_components/InputGroup";
import TextareaGroup from "./_components/TextArea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ImageUp, Link2, User2 } from "lucide-react";

export type ProfileFormData = {
  username: string;
  firstname: string;
  lastname: string;
  about: string;
};

export default function ProfilePage() {
  // const [showFullAbout, setShowFullAbout] = useState(false);
  // const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      about: "",
    },
  });
  const about = watch("about");

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form submitted!", data);
  };

  //api-aas avsan username haruulna
  useEffect(() => {
    // test
    const UserOne = {
      username: "username1",
    };

    reset({
      username: UserOne.username,
      firstname: "",
      lastname: "",
      about: "",
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

  // const handleImageUpload = async () => {
  //   if (!image) return null;
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "your_upload_preset");

  //   const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await res.json();
  //   return data.secure_url;
  // };

  return (
    <div className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-44"
      >
        <div className="w-[352px] grid place-items-center gap-7">
          <h6 className="w-[240px] py-2 text-transparent bg-gradient-to-r from-white via-white to-blurred bg-clip-text font-bold text-[40px] leading-10">
            Create your profile page
          </h6>

          <div className="grid grid-cols-6 gap-4 w-full">
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

            <InputGroup
              id="firstname"
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
              id="lastname"
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
              // registerOptions={{}}
              error={errors.about?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[57px] bg-[#0363FB] cursor-pointer rounded-2xl"
          >
            Continue
          </Button>
        </div>

        {/* preview */}
        <div className="relative w-[432px] h-[591px] rounded-4xl overflow-hidden">
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
            <div className="absolute bottom-[23px] right-[21px] bg-white w-[83px] h-[33px] rounded-full text-black flex items-center justify-center cursor">
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
              {watchedValues.firstname || "Your Name"}
            </div>
            <div className="text-black opacity-50 -mt-4">
              @{watchedValues.username || "username"}
            </div>
            <div className="text-black opacity-80 relative">
              <p className="line-clamp-3">{about || "No bio yet."}</p>

              {about && about.length > 35 && (
                <span className="block">See more...</span>
              )}
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row text-gray-400 gap-1 text-xs items-center">
                <p className="text-black font-bold text-sm">100</p> Following
              </div>
              <div className="flex flex-row text-gray-400 gap-1 text-xs items-center">
                <p className="text-black font-bold text-sm">20.7K</p> Followers
              </div>
            </div>
            <div className="flex flex-row text-sm items-center text-blue-400 gap-2">
              <Link2
                className="h-5 text-gray-400 p-0 cursor-pointer"
                onClick={handleCopyUrl}
              />
              buymecoffee.com/{watchedValues.username || "username"}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
