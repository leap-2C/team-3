import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const EditCreditCard = () => {
  return (
    <Dialog>
      <DialogTrigger className="z-20 dark">
        <Button>Edit Card</Button>
      </DialogTrigger>
      <DialogContent className="bg-[#151719] border-[#202325] rounded-2xl w-[30rem] h-[20rem]">
        <DialogHeader>
          <DialogTitle className="text-[var(--background)]">
            Edit Card Details
          </DialogTitle>
          <Separator className="my-4 bg-[#202325]" />
        </DialogHeader>
        <div className="flex flex-col items-start gap-3">
          <Label htmlFor="name" className="text-left text-[var(--background)]">
            Name
          </Label>
          <Input
            id="name"
            className="col-span-3 text-[var(--background)] border-[#2d3134] bg-[#151719] placeholder:text-[var(--background)]/40 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-[#0363FB]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCreditCard;
