import { Edit2, LucideTrash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type EditProps = {
  item: any;
  change: (value: string) => void;
  deleteItem: () => void;
};

export default function Edit({ item, change, deleteItem }: EditProps) {
  const [name, setName] = useState(item?.fieldName || "");

  return (
    <div className="flex gap-2 m-1">
      
      <Popover>
        <PopoverTrigger>
          <Edit2 className="text-gray-600 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col space-y-2">
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={item?.fieldName}
              placeholder="Edit name"
            />
            <Button onClick={() => change(name)} className="w-full">
              Change
            </Button>
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
            <Button
              onClick={deleteItem}
              className="bg-red-600 text-white w-full"
            >
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
