import { LuCopy, LuLink2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

import { useAppSelector } from "../app/hooks";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";

import { InitialTour } from "./Tours";

export function InviteLinkModel({ isOpen, setIsInviteLinkOpen }) {
  const currentRoom = useAppSelector((state) => state.room.currentRoom);

  const link = useMemo(() => {
    return `${location.origin}/invite/${btoa(
      encodeURI(JSON.stringify({ roomId: currentRoom?._id }))
    )}`;
  }, [currentRoom]);

  // useEffect(() => {
  //   InitialTour().drive(2);
  // }, []);

  return (
    <Dialog
      forceMount
      open={isOpen}
      onOpenChange={(open) => {
        console.log(open);
        setIsInviteLinkOpen(open);
      }}
    >
      <DialogTrigger className="flex items-center w-full cursor-default">
        <LuLink2 className="mr-2 h-4 w-4" />
        <span>Invite</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Room Invite Link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join this room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={async () => {
              await navigator.clipboard.writeText(link);
              toast.success("Link copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <LuCopy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
