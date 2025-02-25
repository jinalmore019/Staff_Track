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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "@/common/Debounce";

export const formSchema = z.object({
  startDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Date is required",
  }),

  endDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Date is required",
  }),

  project: z.string().min(2, {
    message: "Please select project.",
  }),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Date is required",
  }),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one tags.",
  }),
  startTime: z.string().min(4, {
    message: "Please enter start time.",
  }),
  endTime: z.string().min(2, {
    message: "Please enter end time.",
  }),
});

export type ToggleFormInitialData = {
  startDate: Date;
  endDate: Date;
  updateMessage: string;
  project: string;
  date: Date;
  tags: [];
};

export const AddToggle = ({
  onSubmit,
  onChange,
  editor,
  setEditor,
  editorMsg,
  setEditorMsg,
  setErrorMode,
  errorMode,
  form,
  tags,
  project,
  endTime,
  startTime,
  setStartTime,
  setEndTime,
}: any) => {
  // const [editor, setEditor] = useState(null);
  const [model, setModel] = useState(false);
  const modelOpen = () => {
    setModel(!model);
  };
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
              name="project"
              render={({ field }) => (
                <FormItem className="items-center gap-4  ">
                  <div className="">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-[#422b72]">
                        {project &&
                          project?.data?.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.projectTitle}
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
              name="date"
              render={({ field }) => (
                <FormItem className="">
                  <div className="">
                    <Popover>
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
                          onSelect={field.onChange}
                          disabled={(date) => {
                            // Calculate the difference in milliseconds between the current date and the given date
                            const differenceInMs =
                              date.getTime() - new Date().getTime();
                            // Convert milliseconds to days
                            const differenceInDays =
                              differenceInMs / (1000 * 3600 * 24);
                            // Disable dates that are more than 2 days in the past
                            return (
                              differenceInDays < -2 || differenceInDays > 0
                            );
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
              name="tags"
              render={() => (
                <FormItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="border-grey border-2 p-2 ites-center rounded-xl">
                        <div className=" ">
                          <FormLabel className=" text-black">Tags</FormLabel>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80 p-3">
                      {tags &&
                        tags?.data.map((tags) => (
                          <FormField
                            key={tags.id}
                            control={form.control}
                            name="tags"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={tags.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(tags.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              tags.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== tags.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {tags.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-4">
              <TextEditorElement
                name={"updateMessage"}
                value={editor}
                onChange={(value) => {
                  handler(value);
                }}
              />

              {editorMsg && (
                <div className="text-red-600 text-sm font-medium">
                  Update Message is Required !
                </div>
              )}
            </div>

            <FormField
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="time"
                    name={field.name}
                    placeholder="start time"
                    className={`border text-[#422b72] rounded-[10px] w-full gap-4 focus:outline-[#7b7ea8] focus:text-[#422b72]
                    
                    `}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Updating the form value
                      setStartTime(e.target.value); // Updating the local state value
                    }}
                  />
                  {/* {errors.startTime && <FormMessage />} */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <Input
                    type="time"
                    name={field.name}
                    placeholder="start time"
                    className={`border text-[#422b72] rounded-[10px] w-full gap-4 focus:outline-[#7b7ea8] focus:text-[#422b72]
                    `}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); 
                      setEndTime(e.target.value); 
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 flex justify-end">
              <Button
                className="bg-[#422b72] text-white rounded-xl w-40 h-12 text-xl"
                variant="outline"
                onClick={() => onSaveForm()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
