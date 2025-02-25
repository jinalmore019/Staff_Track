import * as z from "zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateFormat } from "@/common/DateFormat";
import { useState } from "react";
import moment from "moment";

export const formSchema = z
  .object({
    title: z.string().min(2, {
      message: "Please enter holiday title.",
    }),

    holidayType: z.string().refine((value) => value.length > 0, {
      message: "Please select holiday type.",
    }),

    startDate: z.date({
      required_error: "Date is required",
      invalid_type_error: "Date is required",
    }),
    endDate: z
      .date({
        invalid_type_error: "Date is required",
      })
      .optional(),
    description: z.string(),
  })

  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

export type HolidayIntialData = {
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  holidayType: "official" | "public" | "other";
  description?: string | null;
};

export const UserAddPopUp = ({
  form,
  onSubmit,
  modal,
  setModal,
  isEdit,
}: any) => {
  const { formatDate } = DateFormat();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState("");
  return (
    <Dialog
      open={modal}
      onOpenChange={() => {
        setModal(false);
        form.reset();
      }}
    >
      <DialogContent
        style={{ borderRadius: "1rem" }}
        className="sm:max-w-[425px] bg-[#F4F4F4] rounded-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-[#422b72] font-bold text-2xl">
            {isEdit === "EDIT" ? "Edit" : "Add"} Holiday
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4 ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Holiday Title</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                          placeholder="Enter Title"
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
                name="holidayType"
                render={({ field }) => (
                  <FormItem className="space-y-2 grid grid-cols-4 items-center gap-4">
                    <FormLabel>Holiday Type</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="official" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Official
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="public" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              public
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
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
                      <Popover
                        open={isCalendarOpen && activeCalendar === "start"}
                        onOpenChange={(isOpen) => {
                          setIsCalendarOpen(isOpen);
                          setActiveCalendar("start");
                        }}
                      >
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
                                <span>Pick a start date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || null}
                            onSelect={(e) => {
                              field.onChange(e);
                              setIsCalendarOpen(false);
                            }}
                            initialFocus
                            disabled={(date) =>
                              date < new Date()
                            }
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
                name="endDate"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>End Date</FormLabel>
                    <div className="col-span-3">
                      <Popover
                        open={isCalendarOpen && activeCalendar === "end"}
                        onOpenChange={(isOpen) => {
                          setIsCalendarOpen(isOpen);
                          setActiveCalendar("end");
                        }}
                      >
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
                                <span>Pick end date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || null}
                            onSelect={(e) => {
                              field.onChange(e);
                              setIsCalendarOpen(false);
                            }}
                            initialFocus
                            disabled={(date) =>
                              date < new Date()
                            }
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
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Description</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                          placeholder="Enter Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="hover:bg-white  md:outline-2  font-bold border-2	 outline-[#422b72] rounded-[10px] hover:text-[#422b72] bg-[#422b72] text-white"
            >
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
