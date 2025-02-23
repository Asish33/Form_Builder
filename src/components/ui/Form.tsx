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
import { AichatSession } from "@/config/gemini";
const prompt = "On the basis of description please give form in json format with form title,form subheading with form haivng Form field,form name,placeholder name, and form label,fieldType, field required all in Camel casing on Json format"
async function main(input:string) {
  const result = await AichatSession.sendMessage("Description:"+input+prompt);
  console.log(result.response.text()) 
  return result.response.text();
}

export function Form() {
  const [data, setData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    if (data === "") {
      alert("should not be empty");
      return;
    }

    try {
      const generatedJSON = await main(data);

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: generatedJSON }),
      });

      if (response.ok) {
        alert("Form saved successfully");
        setModalOpen(false);
        setData("");
      } else {
        alert("Failed to save form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred");
    }
  };

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
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
