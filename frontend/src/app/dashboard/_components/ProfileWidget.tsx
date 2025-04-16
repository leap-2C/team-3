import { Button } from "@/components/ui/button";
import { Copy, Eye, ImageUp } from "lucide-react";
import { patchUserData } from "@/lib/api";
import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "@/utils/Cloudinary";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

const ProfileWidget = (props: { profileData: any }) => {
  const { profileData } = props;
  const [patchData, setPatchData] = useState({});

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileData?.socialMediaURL);
      toast.success("Copied", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    } catch (err) {
      console.error("Failed to copy!", err);
      toast.error(`Error: ${err}`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatarImage" | "backgroundImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageToCloudinary(file);
      setPatchData((prev) => ({ ...prev, [type]: url }));
      if (profileData && "id" in profileData) {
        await patchUserData({ [type]: url }, profileData.id);
      }
      toast.success("🔥 Successfully updated!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    } catch (error) {
      console.error("Upload or patch failed:", error);
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="w-4/6 h-[22rem] bg-[#0A0B0C] border-1 border-[#202325] rounded-2xl overflow-hidden">
      <div
        className="w-full h-3/7 bg-slate-400 bg-cover bg-center relative z-0 group"
        style={{
          backgroundImage: `url(${
            patchData.backgroundImage || profileData?.backgroundImage
          })`,
        }}
      >
        <label className="absolute opacity-0 right-3 top-3 px-3 py-2 bg-[var(--foreground)]/40 rounded-lg group-hover:opacity-100 transition-all cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, "backgroundImage")}
          />
          <p className="text-xs text-[var(--background)] flex flex-row items-center gap-2">
            <ImageUp width={14} />
            Upload image
          </p>
        </label>
      </div>
      <div className="w-full px-6 flex justify-between mt-4">
        <div className="w-auto flex flex-row gap-3">
          <div
            className="w-28 h-auto aspect-square rounded-full bg-slate-500 bg-cover bg-center border-6 border-[#0A0B0C] -mt-13 z-10 relative group overflow-hidden"
            style={{
              backgroundImage: `url(${
                patchData.avatarImage || profileData?.avatarImage
              })`,
            }}
          >
            <label className="absolute w-full h-full opacity-0 flex justify-center items-center bg-[var(--foreground)]/40 group-hover:opacity-100 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "avatarImage")}
              />
              <ImageUp width={20} className="stroke-[var(--background)]" />
            </label>
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-semibold text-[var(--background)]">
              {profileData?.name}
            </p>
            <p className="text-xs font-light text-[var(--background)]/40 -mt-[2px]">
              @{profileData?.name}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          {/* <Button className="bg-[#0363FB] aspect-square rounded-full font-bold px-6 hover:bg-[#0362fbb6]">
            <Eye strokeWidth={2} />
          </Button> */}
          <Button
            onClick={handleCopy}
            className="bg-[#0363FB] aspect-square rounded-full font-bold px-6 hover:bg-[#0362fbb6]"
          >
            <Copy strokeWidth={2} />
          </Button>
          {/* <Button className="dark rounded-full font-bold px-6">
            Edit Profile
          </Button> */}
          <EditProfileDialog
            setPatchData={setPatchData}
            profileData={profileData}
          />
        </div>
      </div>
      <p className="text-xs font-light text-[var(--background)]/40 px-6 mt-6">
        About
      </p>
      <p className="text-sm font-light text-[var(--background)] px-6 w-5/7 mt-1">
        {patchData.about || profileData?.about}
      </p>
    </div>
  );
};

export default ProfileWidget;
