import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "react-toastify";
import { UserRoundPen } from "lucide-react";

// Props type definition
type Props = {
  onProfileUpdated: (updatedData: Partial<Profile>) => void;
  userId: number;
};

// Profile data structure
type Profile = {
  id: number;
  name: string;
  about?: string;
  socialMediaURL?: string;
};

const EditProfile = ({ onProfileUpdated, userId }: Props) => {
  const [data, setData] = useState<Profile>({ id: 0, name: "" });
  const [updatedData, setUpdatedData] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/profile/current-user/${userId}`
        );
        setData(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Handle form input changes
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit profile updates
  const sendData = async () => {
    const name = updatedData.name ?? data.name;
    const about = updatedData.about ?? data.about;
    const social = updatedData.socialMediaURL ?? data.socialMediaURL;

    if (!name?.trim() || !about?.trim() || !social?.trim()) {
      toast.error("Please fill out all fields before saving.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8000/api/profile/${data.id}`,
        updatedData
      );
      toast.success("Profile updated!");
      const newProfile = { ...data, ...updatedData };
      setData(newProfile);
      onProfileUpdated(newProfile);
      setUpdatedData({});
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-white text-black rounded-full"
          variant="secondary"
        >
          <UserRoundPen />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex gap-[28px] flex-col">
        <AlertDialogTitle>
          <h1 className="font-[600] text-[20px]">Edit profile</h1>
          <p className="font-[400] text-[14px] text-black/50">
            Make changes to your profile here. Click save when you're done.
          </p>
        </AlertDialogTitle>

        {loading ? (
          <div className="text-sm text-center text-black/50 py-4">
            Loading profile...
          </div>
        ) : (
          <AlertDialogDescription className="flex flex-col gap-[12px]">
            <div>
              <h1>Name</h1>
              <Input
                name="name"
                value={updatedData.name ?? data.name}
                onChange={handleInput}
                className="bg-transparent p-[12px] border border-black/30 text-black/50"
              />
            </div>

            <div>
              <h1 className="text-black">About</h1>
              <Input
                name="about"
                value={updatedData.about ?? data.about ?? ""}
                onChange={handleInput}
                className="bg-transparent p-[12px] border border-black/30 text-black/50"
              />
            </div>

            <div>
              <h1 className="text-black">Social media URL</h1>
              <Input
                name="socialMediaURL"
                value={updatedData.socialMediaURL ?? data.socialMediaURL ?? ""}
                onChange={handleInput}
                className="bg-transparent p-[12px] border border-black/30 text-black/50"
              />
            </div>
          </AlertDialogDescription>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={sendData} disabled={loading}>
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProfile;
