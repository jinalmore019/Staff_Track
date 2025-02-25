import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {DateFormat} from "@/common/DateFormat";
import { useState } from "react";

export const formSchema = z.object({
  projectTitle: z.optional(
    z.string().min(2, {
      message: "please enter projectTitle.",
    })
  ),

  description: z.optional(
    z.string().min(2, {
      message: "Please enter description.",
    })
  ),
  clientName: z.optional(
    z.string().min(2, {
      message: "please enter clientName.",
    })
  ),
  returnDate: z.optional(
    z.date({
      required_error: "Date is required",
      invalid_type_error: "Date is required",
    })
  ),

  status: z.string().refine((value) => value.length > 0, {
    message: "Please select status.",
  }),
});
export type projectInitialData = {
  projectTitle: string;
  description: string;
  clientName: string;
  returnDate: Date;
  status: "running" | "upcoming" | "complete";
};

export const UserAddPopUp = ({
  form,
  onSubmit,
  modal,
  setModal,
  isEdit,
}: any) => {
  const isDisable = isEdit === "EDIT";
  const { formatDate } = DateFormat();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <>
      <Dialog
        open={modal}
        onOpenChange={() => {
          setModal(false);
          form.reset();
        }}
      >
        {/* </Dialog> */}

        <DialogContent
          style={{ borderRadius: "1rem" }}
          className="sm:max-w-[425px] bg-[#F4F4F4] rounded-xl"
        >
          <DialogHeader>
            <DialogTitle className="text-[#422b72] font-bold text-2xl">
              {isEdit === "EDIT"
                ? "Edit"
                : isEdit === "VIEW"
                ? "Details of"
                : "Add"}{" "}
              Project
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4 py-4 ">
                <FormField
                  control={form.control}
                  name="projectTitle"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel>projectTitle</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                            placeholder="Enter project title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel>Description</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                            placeholder="Enter project description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel>ClientName</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                            placeholder="Enter client name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel>returnDate</FormLabel>
                      <div className="col-span-3">
                        <Popover open={isCalendarOpen}
                                onOpenChange={setIsCalendarOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal rounded-[10px]",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  formatDate(field.value)
                                ) : (
                                  <span>Select Return Date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(e) => {
                                field.onChange(e);
                                setIsCalendarOpen(false);
                              }}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
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

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-2 grid grid-cols-4 items-center gap-4">
                      <FormLabel>Status</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="running" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Running
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="upcoming" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Upcoming
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="complete" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Complete
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="hover:bg-white  md:outline-2 w-full  font-bold border-2	 outline-[#422b72] rounded-[10px] hover:text-[#422b72] bg-[#422b72] text-white"
              >
                Save changes
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
