import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const DatePicker = ({title}) => {
    const [date, setDate] = React.useState<Date>();

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-[280px] rounded-[10px] border-[#422b72] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4 text-[#422b72]" /> 
                        {date ? format(date, "PPP") : <span className="text-[#422b72]">{title || "Pick a Date"}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#422b72] text-white rounded-xl">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
            </Popover>
        </>
    );
};

export default DatePicker;
