import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import makeAnimated from "react-select/animated";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Select from "react-select";
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
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  SelectContent,
  Select as SingleSelect,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateFormat } from "@/common/DateFormat";
import { useState } from "react";

export type TeamFormInitialData = {
  project: string;
  startDate: Date;
  endDate: Date;
  leader: string;
  members: [];
  totalDays: number;
};

const entitySchema = z.object({
  value: z.string(),
  label: z.string(),
});
export const formSchema = z
  .object({
    project: z.string().min(2, {
      message: "Please enter user name.",
    }),
    startDate: z.date({
      required_error: "Date is required",
      invalid_type_error: "Date is required",
    }),
    endDate: z.date({
      required_error: "Date is required",
      invalid_type_error: "Date is required",
    }),
    leaderId: z.string().min(2, {
      message: "Please enter user name.",
    }),
    members: entitySchema
      .array()
      .min(1, { message: "Please pick at least 1 member" }),
  })
  .refine((data) => data?.endDate >= data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

export const TeamAddPopUp = ({
  form,
  onSubmit,
  modal,
  setModal,
  isEdit,
  allEmployee,
  empRecord,
  allProjects,
  editRecord,
}: any) => {
  const isDisable = isEdit === "VIEW";
  const { formatDate } = DateFormat();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState("");

  const animatedComponents = makeAnimated();

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
            {isEdit === "EDIT"
              ? "Edit"
              : isEdit === "VIEW"
              ? "Details of"
              : "Add"}{" "}
            Team
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4 max-h-[400px] overflow-auto pr-2 modal-scroll">
              <FormField
                control={form.control}
                name="project"
                disabled={isDisable}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>project Title</FormLabel>
                    <div className="col-span-3">
                      <SingleSelect
                        disabled={isDisable}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Project" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-[#422b72]">
                          {allProjects &&
                            allProjects?.data?.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                {project.projectTitle}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </SingleSelect>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                disabled={isDisable}
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
                        <PopoverTrigger asChild disabled={isDisable}>
                          <FormControl>
                            <Button
                              variant={"default"}
                              className={cn(
                                "w-full pl-3 text-left font-normal rounded-[10px]",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                formatDate(field.value)
                              ) : (
                                <span>Pick a date</span>
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
                            disabled={(date) => date <= new Date()}
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
                disabled={isDisable}
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
                        <PopoverTrigger asChild disabled={isDisable}>
                          <FormControl>
                            <Button
                              variant={"default"}
                              className={cn(
                                "w-full pl-3 text-left font-normal rounded-[10px]",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                formatDate(field.value)
                              ) : (
                                <span>Pick a date</span>
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
                            disabled={(date) => date <= new Date()}
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
                disabled={isDisable}
                control={form.control}
                name="leaderId"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Leader</FormLabel>
                    <div className="col-span-3">
                      <SingleSelect
                        disabled={isDisable}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Leader" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-[#422b72]">
                          {allEmployee &&
                            allEmployee?.data?.map((emp) => (
                              <SelectItem key={emp.id} value={emp.id}>
                                {emp.firstName + " " + emp.lastName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </SingleSelect>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="w-full">Members </FormLabel>
                    <div className="col-span-3">
                      <Select
                        {...field}
                        name="members"
                        isDisabled={isDisable}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti={true}
                        defaultValue={field.value}
                        value={field.value}
                        options={empRecord}
                      />
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {!isDisable && (
              <Button
                type="submit"
                className="hover:bg-white  md:outline-2  font-bold border-2	 outline-[#422b72] rounded-[10px] hover:text-[#422b72] bg-[#422b72] text-white"
              >
                Save changes
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
