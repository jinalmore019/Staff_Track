import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import TextEditorElement from "@/common/Editor";
import {
  Form,
  FormControl,
  FormDescription,
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
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "@/common/Debounce";
export const formSchema = 
z.object({
  leaveTitle: z.string().min(2, {
    message: "Please enter Leave Title.",
  }),
  startDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Date is required",
  }),
  endDate: z.date({
    invalid_type_error: "Date is required",
  }),
  
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date cannot be earlier than start date.",
  path: ["endDate"],
});


export type LeaveData = {
  leaveTitle: string;
  leaveReason: string;
  startDate: Date;
  endDate: Date;
};
export const AddLeave = ({
  onSubmit,
  editor,
  setEditor,
  editorMsg,
  setEditorMsg,
  setErrorMode,
  errorMode,
  form,
}: any) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState("");
  useEffect(() => {
    if (editor?.length && editorMsg) {
      setEditorMsg(false);
    }
  }, [editor]);
  const onSaveForm = () => {
    if (!editor?.length) {
      setEditorMsg(true);
    }
    setErrorMode(true);
  };
  const onChangeEditor = (value: string) => {
    setEditor(value);
    if (errorMode && value?.length) {
      setEditorMsg(true);
    }
  };
  const handler = useCallback(debounce(onChangeEditor, 800), []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-white rounded-2xl w-full p-4 shadow-2xl ">
          <div className="gap-4 grid-row grid grid-cols-2 mb-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-4">
            <FormField
              control={form.control}
              name="leaveTitle"
              render={({ field }) => (
                <FormItem className=" items-center gap-4 grid">
                  <div className="">
                    <FormControl>
                      <Input
                        type="text"
                        className="border text-[#422B72] rounded-[10px] w-full gap-4  focus:outline-[#7B7EA8] focus:text-[#422B72]"
                        placeholder="Leave Title"
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
              name="startDate"
              render={({ field }) => (
                <FormItem className="">
                  <div className="">
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
                              " pl-3 text-left font-normal  border-grey rounded-[10px] w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
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
                          selected={field.value}
                          onSelect={(e) => {
                            field.onChange(e);
                            setIsCalendarOpen(false);
                          }}
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
              name="endDate"
              render={({ field }) => (
                <FormItem className="">
                  <div className="">
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
                              " pl-3 text-left font-normal  border-grey rounded-[10px] w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a end date</span>
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
                          // disabled={(date) => date < new Date()}
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
          <div className="">
            {/* <FormField
                          control={form.control}
                          name="updateMessage"
                          render={({ field }) => (
                              <FormItem className="items-center gap-4">
                                  <div className="">
                                      <FormControl> */}
            <TextEditorElement
              //  control = {form.control}
              name={"leaveReason"}
              value={editor}
              onChange={(value) => {
                handler(value);
              }}
            />
            {editorMsg && (
              <div className="text-red-600 text-sm font-medium">
                leave Reason is Required !
              </div>
            )}
            {/* </FormControl>
                                      <FormMessage />
                                  </div>
                              </FormItem>
                          )}
                      /> */}
          </div>
          <div className="col-span-4 flex justify-end">
            <Button
              className="bg-[#422B72] text-white rounded-xl w-40 h-12 text-xl"
              variant="outline"
              onClick={() => onSaveForm()}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
