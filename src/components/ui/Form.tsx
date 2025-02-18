"use client";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Textarea } from "@/components/ui/textarea";
import { Gemini } from "@/config/gemini";



async function main(input : string) {
  await Gemini(input); 
}

export function Form() {
  const [data, setData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setData("");
            setModalOpen(true);
          }}
        >
          Click Me
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Form Details</DialogTitle>
          <DialogDescription>
            <Textarea
              className="text-black"
              ref={inputRef}
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Give your Prompt here..."
            />
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => {
            if (data === "") {
              alert("should not be empty");
              return;
            }
            main(data);
            setModalOpen(false);
          }}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
