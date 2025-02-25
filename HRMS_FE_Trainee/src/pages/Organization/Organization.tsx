import { Input } from "@/components/ui/input";
import InnerLayout from "@/layout/InnerLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./OrganizationUtils";
// import cmpRegiSchema from "../../schemas/index";
import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { DateFormat } from "@/common/DateFormat";
import {
  useGetCompanyByNameQuery,
  useGetWorkCategoryByNameQuery,
  usePutCmpMutation,
} from "@/store/services/Organization.service";
import { Camera } from "@/common/icons";
import Loading from "@/common/Loading";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Organization = () => {
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { toast } = useToast();

  const { formatDate } = DateFormat();

  const { data: getCmpData, isLoading } = useGetCompanyByNameQuery("");
  const { data: getWorkCateory } = useGetWorkCategoryByNameQuery("");
  const [EditData] = usePutCmpMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      founder: "",
      email: "",
      // password: "",
      startDate: new Date(),
      workCategory: "",
      workingHour: 8,
      maxStaff: 100,
      minStaff: 2,
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: 394101,
      landmark: "",
    },
  });

  useEffect(() => {
    if (getCmpData?.data) {
      setSelectedImage(getCmpData?.data?.logo || "");
      form.setValue("name", getCmpData?.data?.name || "");
      form.setValue("founder", getCmpData?.data?.founder || "");
      form.setValue("email", getCmpData?.data?.email || "");
      // form.setValue("password", getCmpData?.data?.password || "");
      form.setValue("startDate", new Date(getCmpData?.data?.startDate) || "");
      form.setValue("workCategory", getCmpData?.data?.workCategory.id || "");
      form.setValue("workingHour", getCmpData?.data?.workingHour || "");
      form.setValue("minStaff", getCmpData?.data?.minStaff || "");
      form.setValue("maxStaff", getCmpData?.data?.maxStaff || "");
      form.setValue("address", getCmpData?.data?.address || "");
      form.setValue("city", getCmpData?.data?.city || "");
      form.setValue("state", getCmpData?.data?.state || "");
      form.setValue("country", getCmpData?.data?.country || "");
      form.setValue("pincode", String(getCmpData?.data?.pincode || ""));
      form.setValue("landmark", getCmpData?.data?.landmark || "");
    }
  }, [form, getCmpData, getWorkCateory]);

  //icon click input file
  const handleIconClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  const onSubmit = async (e) => {
    debugger
    const formData = new FormData();
    formData.append("logo", selectedImage || "");
    formData.append("name", e?.name);
    formData.append("founder", e?.founder);
    formData.append("startDate", e?.startDate);
    formData.append("email", e?.email);
    // formData.append("password", e?.password);
    formData.append("workCategory", e?.workCategory);
    formData.append("workingHour", e?.workingHour);
    formData.append("minStaff", e?.minStaff);
    formData.append("maxStaff", e?.maxStaff);
    formData.append("address", e?.address);
    formData.append("city", e?.city);
    formData.append("state", e?.state);
    formData.append("country", e?.country);
    formData.append("pincode", parseInt(e?.pincode));
    formData.append("landmark", e?.landmark);
    try {
      const response = await EditData(formData);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Save changes"
          : response?.data?.message,
      });
      // setSelectedStatus(e);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white  col-span-2  shadow-xl	rounded-2xl p-8 w-full">
            <div className="flex justify-center ">
              <div className="relative rounded-full border ">
                <div
                  onClick={handleIconClick}
                  className="absolute bottom-2 p-2 right-2 bg-[#484c7f] rounded-full text-white text-2xl border"
                >
                  <Camera />
                </div>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="h-40 rounded-[50%] w-40"
                  />
                ) : (
                  <img
                    src={getCmpData?.data?.logo}
                    alt="Default"
                    className="h-40 rounded-[50%] w-40"
                  />
                )}
              </div>
              
            </div>
            <Input
              id="logo"
              type="file"
              className="hidden"
              ref={inputFileRef}
              onChange={onFileChange}
            />
            <div className="flex justify-end mt-5">
            <Button
                    onClick={() => {
                      navigate("/verify");
                    }}
                    className="bg-[#484c7f] hover:text-[#484c7f] hover:font-bold text-white rounded-xl "
                    variant="outline"
                  >
                    Change password
                  </Button>
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="p-5">
                    <h1 className="text-[#484c7f] font-medium text-2xl pb-1">
                      Company details
                    </h1>
                    <hr className="my-5 border-[grey] opacity-50" />
                    <div className="flex flex-col w-auto gap-4">
                      <div className="gap-4 grid-row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2  ">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Company Name</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Company Name"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="founder"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Founder Name</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Founder Name"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
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
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="workCategory"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4 ">
                              <FormLabel>Work category</FormLabel>

                              <div className="col-span-3">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={
                                          getCmpData?.data?.workCategory?.name
                                        }
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-gray-100">
                                    {getWorkCateory &&
                                      getWorkCateory?.data?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                          {cat.name}
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
                          name="workingHour"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Working Hour</FormLabel>

                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="number"
                                    className="col-span-3 border  text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                    placeholder="Company's working Hour"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
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
                            <FormItem className="grid grid-cols-4 items-center gap-4 	">
                              <FormLabel>Start Date</FormLabel>
                              <div className="col-span-3 border	rounded-[10px]">
                                <Popover
                                  open={isCalendarOpen}
                                  onOpenChange={setIsCalendarOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"default"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal rounded-[10px]",
                                          !field.value &&
                                            "text-muted-foreground"
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
                                  <PopoverContent
                                    className="w-auto p-0 "
                                    align="start"
                                  >
                                    {/* {" "}
                                  <div className="flex m-1">
                                    <div className="flex-1"></div>
                                    <PopoverClose>
                                      <CloseIcon
                                        size={24}
                                        className="text-primary/60 hover:text-destructive"
                                      />
                                    </PopoverClose>
                                  </div> */}
                                    <Calendar
                                      mode="single"
                                      selected={
                                        getCmpData?.data?.startDate || ""
                                      }
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
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h1 className="text-[#484c7f] font-medium text-2xl pb-1">
                      Staff Information
                    </h1>
                    <hr className="my-5 border-[grey] opacity-50" />
                    <div className="flex flex-col w-auto gap-4">
                      <div className="gap-4 grid-cols grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="maxStaff"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Maximum Staff</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="number"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Maximum Staff"
                                    {...field}
                                    value={field.value}
                                    //  onChange={(e)=>{
                                    //    field.onChange(e.target.value)
                                    //  }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="minStaff"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Minimum Staff</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="number"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Minimum Staff"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h1 className="text-[#484c7f] font-medium text-2xl pb-1">
                      Company Address
                    </h1>
                    <hr className="my-5 border-[grey] opacity-50" />
                    <div className="flex flex-col w-auto gap-4">
                      <div className="gap-4 grid-row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 ">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Address</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Address"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>City</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter City"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>State</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter State"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Country</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Country"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Pincode</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Pincode"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="landmark"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                              <FormLabel>Landmark</FormLabel>
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                    placeholder="Enter Landmark"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => {
                                      field.onChange(e.target.value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-[#484c7f] text-white text-xl rounded-xl w-36 hover:text-[#484c7f]"
                      variant="outline"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default Organization;
