import { Edit2, LucideTrash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Edit({defaultValue,update}:{defaultValue:any,update:any}) {
  const [label, setLabel]=useState(defaultValue.label);
  const [placeholder, setPlaceholder]=useState(defaultValue.placeholder);
  return (
    <div className="flex gap-2 m-1">
      <Popover>
        <PopoverTrigger>
          <Edit2 className="text-gray-600 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col space-y-2">
            <label>Title</label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
            <label>PlaceHolder</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => {
                setPlaceholder(e.target.value);
              }}
            />
            <Button className="w-full" onClick={()=>{
              update({
                label,
                placeholder
              })
            }}>Change</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <LucideTrash2 className="text-red-900 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col space-y-2">
            <p>Are you sure you want to delete this item?</p>
            <Button className="bg-red-600 text-white w-full">Delete</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
