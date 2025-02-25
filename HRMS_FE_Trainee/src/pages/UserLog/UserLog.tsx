import React, { useEffect, useMemo, useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BreakIn, BreakOut, CheckOut, CheckIn } from "@/common/icons";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./UserLogUtils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGetAllUserLogQuery } from "@/store/services/UserLog.service";
import Loading from "@/common/Loading";
import { DateFormat } from "@/common/DateFormat";

const UserLog = () => {
    const { formatDate } = DateFormat();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    
    const yesterday = subDays(new Date(), 1);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchDate: yesterday, 
        },
    });

    useEffect(() => {
        if (form.getValues("searchDate")) {
            setSelectedDate(new Date(form.getValues("searchDate")));
        }
    }, [form.getValues("searchDate")]);

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
        form.setValue("searchDate", date); 
    };

    const { data: getUserLog, isLoading } = useGetAllUserLogQuery("");

    // Filter data based on the selected date from the datepicker
    const filteredData = useMemo(() => {
        if (!getUserLog) return [];
        if (!selectedDate) return getUserLog.data;
        return getUserLog.data.filter(item => {
            const itemDate = new Date(item.date);
            return selectedDate.toDateString() === itemDate.toDateString();
        });
    }, [getUserLog, selectedDate]);

    return (
        <>
            <InnerLayout>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div>
                        <div className="flex gap-4 justify-end ">
                            <Form {...form}>
                                <div className="flex gap-5 mb-4 ">
                                    <FormField
                                        control={form.control}
                                        name="searchDate"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center">
                                                <div className="col-span-3">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"default"}
                                                                    className={cn(
                                                                        "w-80 pl-3  text-left font-normal rounded-[10px]  focus:outline-[#7b7ea8]",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        formatDate(field.value)
                                                                    ) : (
                                                                        <span>filter by a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={handleDateSelect}
                                                                disabled={(date) =>
                                                                    date > new Date() || date < new Date("1900-01-01")
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                            </Form>
                        </div>


                        <div className="bg-white rounded-2xl">
                            <div className="p-5 shadow-xl">
                                <Table>
                                    <TableHeader className="text-lg">
                                        <TableRow>
                                            <TableHead>Full Name</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Check-in Time</TableHead>
                                            <TableHead>Check-out Time</TableHead>
                                            <TableHead>Total active time</TableHead>
                                            <TableHead>Total break time</TableHead>

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredData.map((item, index: number) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-bold text-sm">{item.empId.firstName + " " + item.empId.lastName}</TableCell>
                                                    <TableCell className="">{formatDate(item?.date)}</TableCell>
                                                    <TableCell>{new Date(item?.timeBlock[0]?.startTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}</TableCell>
                                                    <TableCell>{item?.timeBlock[item?.timeBlock?.length - 1]?.endTime ? new Date(item.timeBlock[item?.timeBlock?.length - 1]?.endTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }) : "Haven't checked out yet today"}</TableCell>
                                                    <TableCell>{item?.hours + " : " + item?.minutes + " : " + item?.seconds}</TableCell>
                                                    <TableCell> {item?.TotalBreakHour!=null ? item?.TotalBreakHour + " : " + item?.TotalBreakMinute + " : " + item?.TotalBreakSecond : " 00 : 00 : 00"}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                )}
            </InnerLayout>
        </>
    );
};

export default UserLog;
