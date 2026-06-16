import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, type Dispatch, type SetStateAction, type SubmitEvent } from "react";
import { useUserStore } from "@/store/userStore";

type UsernameModalProps = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export function UsernameModal({ open, onClose }: UsernameModalProps) {
  const [username, setUsername] = useState<string>("");
  const { setUsername: setUser } = useUserStore();

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!username) return;

    setUser(username);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Set your username</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="submit">Set username</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
