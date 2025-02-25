import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { z } from "zod";


export const formSchema = z.object({
    leaveStatus: z.string().refine((value) => value.length > 0, {
        message: "Please select leaveStatus.",
    }),
});

export type LeaveFormIntialData = {
    fullName: string;
    leaveReason: string;
    startDate: Date;
    endDate: Date;
    leaveStatus: "approved" | "rejected" | "pending";
};

export const LeavePopOver = ({ modal, setModal, onSubmit, form }: any) => {
    //  const isDisable = isEdit === "EDIT";

    return (
        <Dialog
            open={modal}
            onOpenChange={() => {
                setModal(false);
                form.reset();
            }}
        >
            <DialogContent style={{ borderRadius: "1rem" }} className="sm:max-w-[425px] bg-[#F4F4F4] rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-[#422b72] font-bold text-2xl">Update Status</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4 py-4 ">
                            <FormField
                            
                                control={form.control}
                                //   disabled={isDisable}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel>Full Name</FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter User name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                //   disabled={isDisable}
                                name="leaveReason"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel>Leave Reason</FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter User name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel>Start Date</FormLabel>
                                        <div className="col-span-3">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal rounded-[10px]", !field.value && "text-muted-foreground")}>
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel>End Date</FormLabel>
                                        <div className="col-span-3">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal rounded-[10px]", !field.value && "text-muted-foreground")}>
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="leaveStatus"
                                render={({ field }) => (
                                    <FormItem className="space-y-2 grid grid-cols-4 items-center gap-4">
                                        <FormLabel>Status</FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-y-1">
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="pending" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">pending</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="rejected" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">rejected</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="approved" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">approved</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="hover:bg-white  md:outline-2  font-bold border-2	 outline-[#422b72] rounded-[10px] hover:text-[#422b72] bg-[#422b72] text-white">
                            Save changes
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
