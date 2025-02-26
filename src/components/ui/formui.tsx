import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Star } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Edit from "./Edit";

type FormuiProps = {
  json: any;
  update:any
};

export function Formui({ json,update }: FormuiProps) {
  const [formFields, setFormFields] = useState(json?.fields || []);

  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [selectedDates, setSelectedDates] = useState<
    Record<number, Date | undefined>
  >({});
  const [selectedTimes, setSelectedTimes] = useState<Record<number, string>>(
    {}
  );
  const [selectedRadios, setSelectedRadios] = useState<Record<number, string>>(
    {}
  );
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    Record<number, string[]>
  >({});


  const handleRating = (index: number, value: number) => {
    setRatings((prev) => ({ ...prev, [index]: value }));
  };

  const handleDateSelect = (index: number, date: Date | undefined) => {
    setSelectedDates((prev) => ({ ...prev, [index]: date }));
  };

  const handleTimeSelect = (index: number, time: string) => {
    setSelectedTimes((prev) => ({ ...prev, [index]: time }));
  };

  const handleRadioSelect = (index: number, value: string) => {
    setSelectedRadios((prev) => ({ ...prev, [index]: value }));
  };

  const handleCheckboxChange = (index: number, value: string) => {
    setSelectedCheckboxes((prev) => {
      const currentValues = prev[index] || [];
      return {
        ...prev,
        [index]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  return (
    <div className="border rounded-sm p-6 w-full max-w-md mx-auto">
      <h2 className="font-bold text-center text-lg mb-3">{json?.formTitle}</h2>
      <div>
        <h2 className="font-semibold text-center text-base mb-4">
          {json?.formHeading}
        </h2>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto border p-3 rounded">
        {/*@ts-ignore*/}
        {formFields.map((item, index) => (
          <div key={index} className="w-full flex items-center space-x-2">
            {item.fieldType === "text" && (
              <div className="w-full">
                <div>{item.label}</div>
                <Input
                  type="text"
                  placeholder={item.placeholder}
                  name={item.name}
                  className="w-full p-2 text-sm"
                />
              </div>
            )}

            {item.fieldType === "textarea" && (
              <div className="w-full">
                <div>{item.label}</div>
                <Textarea
                  placeholder={item.placeholder}
                  name={item.name}
                  className="w-full p-2 text-sm bg-white"
                />
              </div>
            )}

            {item.fieldType === "dropdown" && (
              <div className="w-full">
                <div>{item.label}</div>
                <Select
                  onValueChange={(value) => handleTimeSelect(index, value)}
                >
                  <SelectTrigger className="w-full p-2 text-sm bg-white cursor-pointer">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {item.options?.map((option: string, i: number) => (
                      <SelectItem key={i} value={option} className="bg-white">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {item.fieldType === "email" && (
              <div className="w-full">
                <div>{item.label}</div>
                <Input
                  type="email"
                  placeholder={item.placeholder}
                  name={item.name}
                  className="w-full p-2 text-sm"
                />
              </div>
            )}

            {item.fieldType === "number" && (
              <div className="w-full">
                <div>{item.label}</div>
                <Input
                  type="number"
                  placeholder={item.placeholder}
                  name={item.name}
                  className="w-full p-2 text-sm"
                />
              </div>
            )}

            {item.fieldType === "rating" && (
              <div className="w-full">
                <div>{item.label}</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        ratings[index] >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating(index, star)}
                    />
                  ))}
                </div>
              </div>
            )}

            {item.fieldType === "date" && (
              <div className="w-full">
                <div>{item.label}</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full text-left p-2">
                      {selectedDates[index]
                        ? selectedDates[index]?.toLocaleDateString()
                        : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDates[index]}
                      onSelect={(date) => handleDateSelect(index, date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {item.fieldType === "time" && (
              <div className="w-full">
                <div>{item.label}</div>
                <Select
                  onValueChange={(value) => handleTimeSelect(index, value)}
                >
                  <SelectTrigger className="w-full p-2 text-sm bg-white">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time} className="bg-white">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {item.fieldType === "radio" && (
              <div className="w-full">
                <div>{item.label}</div>
                <RadioGroup
                  value={selectedRadios[index] || ""}
                  onValueChange={(value) => handleRadioSelect(index, value)}
                  className="space-y-2"
                >
                  {item.options?.map((option: string, i: number) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`radio-${index}-${i}`}
                        className="bg-white"
                      />
                      <label htmlFor={`radio-${index}-${i}`}>{option}</label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {item.fieldType === "checkbox" && (
              <div className="w-full">
                <div>{item.label}</div>
                <div className="space-y-2">
                  {item.options?.map((option: string, i: number) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Checkbox
                        id={`checkbox-${index}-${i}`}
                        checked={selectedCheckboxes[index]?.includes(option)}
                        onCheckedChange={() =>
                          handleCheckboxChange(index, option)
                        }
                        className="bg-white"
                      />
                      <label htmlFor={`checkbox-${index}-${i}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Edit defaultValue={item} 
            update={(value:string)=>update(value,index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
