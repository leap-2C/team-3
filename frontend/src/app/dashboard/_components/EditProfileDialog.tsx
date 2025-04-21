import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { patchUserData } from "@/lib/api";
import { toast } from "react-toastify";

interface ProfileData {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  about?: string;
}

interface EditProfileDialogProps {
  setPatchData: React.Dispatch<React.SetStateAction<ProfileData>>;
  profileData: ProfileData;
}

const EditProfileDialog = ({
  setPatchData,
  profileData,
}: EditProfileDialogProps) => {
  const [form, setForm] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setPatchData((prev) => ({
      ...prev,
      ...form,
    }));

    try {
      if (profileData && profileData.id) {
        await patchUserData(form, profileData.id);
        setForm("");
        toast.success("Profile updated!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (err) {
      console.error(err);
      setForm("");
      toast.error("Error occured", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-2xl">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={form.email}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="about" className="text-right">
              About
            </Label>
            <Textarea
              id="about"
              value={form.about}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
