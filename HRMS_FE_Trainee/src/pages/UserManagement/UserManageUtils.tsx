import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateFormat } from "@/common/DateFormat";
import { useState } from "react";

export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Please enter first name.",
  }),
  lastName: z.string().min(2, {
    message: "Please enter last name.",
  }),
  email: z
    .string()
    .min(1, { message: "Please enter email." })
    .email("This is not a valid email."),

  //   confirmPassword: z.string().min(5),
  doj: z.date({
    required_error: "Date is required",
    invalid_type_error: "Date is required",
  }),
  department: z.string().min(2, {
    message: "Please select department.",
  }),
  designation: z.string().min(2, {
    message: "Please select designation.",
  }),
  salary: z.coerce.number().min(4, {
    message: "Please enter salary.",
  }),
  mobileNo: z.string()
    .min(10, { message: 'Mobile number must be at least 10 characters long' })
    .max(15, { message: 'Mobile number cannot exceed 15 characters' })
    .regex(/^\d+$/, { message: 'Mobile number must contain only digits' }),
  gender: z.string().refine((value) => value.length > 0, {
    message: "Please select gender",
  }),
});

export const formPasswordSchema = z.object({
  password: z.string().min(5,{
    message: "Please enter password.",
  }),
});


//  .refine(
//      (values) => {
//          return values.password === values.confirmPassword;
//      },
//      {
//          message: "Passwords must match!",
//          path: ["confirmPassword"],
//      },
//  );

export type UsrFormIntialData = {
  firstName: string;
  //  middleName: string;
  lastName: string;
  email: string;
  password: string;
  //  confirmPassword: string;
  doj: Date;
  department: string;
  designation: string;
  salary: number;
  mobileNo: number;
  gender: string;
};

export const UserAddPopUp = ({
  form,
  onSubmit,
  modal,
  setModal,
  isEdit,
  departmentData,
  designationData,
}: any) => {
  const isDisable = isEdit === "VIEW";
  //  console.log(form.getValues(),"getValues");
  //  console.log(isEdit,"isEdit");
  const { formatDate } = DateFormat();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
            Employee
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4 max-h-[400px] overflow-auto pr-2 modal-scroll">
              <FormField
                control={form.control}
                name="firstName"
                disabled={isDisable}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>UserName</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                          placeholder="Enter first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {/* <FormField
                                control={form.control}
                                name="middleName"
                                disabled={isDisable}
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel></FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter middle name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            /> */}
              <FormField
                control={form.control}
                name="lastName"
                disabled={isDisable}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel></FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                          placeholder="Enter last name"
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
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-2 grid grid-cols-4 items-center gap-4">
                    <FormLabel>Gender</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          disabled={isDisable}
                          defaultValue={field.value}
                          className="flex space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Male" />
                            </FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Female" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                disabled={isDisable}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Email</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                          placeholder="Enter Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {isEdit === "ADD" && (
                <FormField
                  disabled={isDisable}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel>Password</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              )}
              {/* {isEdit !== "VIEW" && (
                                <FormField
                                    disabled={isDisable}
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel>Confirm Password</FormLabel>
                                            <div className="col-span-3">
                                                <FormControl>
                                                    <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter confirm password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            )} */}
              <FormField
                disabled={isDisable}
                control={form.control}
                name="doj"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Joining Date</FormLabel>
                    <div className="col-span-3">
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
                        <PopoverTrigger asChild disabled={isDisable}>
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
              <FormField
                disabled={isDisable}
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Department</FormLabel>
                    <div className="col-span-3">
                      <Select
                        disabled={isDisable}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-[#422b72]">
                          {departmentData &&
                            departmentData?.data.map((department) => (
                              <SelectItem
                                key={department.id}
                                value={department.id}
                              >
                                {department.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                disabled={isDisable}
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Designation</FormLabel>
                    <div className="col-span-3">
                      <Select
                        disabled={isDisable}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-[#422b72]">
                          {designationData &&
                            designationData?.data?.map((designation) => (
                              <SelectItem
                                key={designation.id}
                                value={designation.id}
                              >
                                {designation.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                disabled={isDisable}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Salary</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                          placeholder="Enter salary"
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
                name="mobileNo"
                disabled={isDisable}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Mobile No.</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                          placeholder="Enter mobile number"
                          {...field}
                        />
                      </FormControl>
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
