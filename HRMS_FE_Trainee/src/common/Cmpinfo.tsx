import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cmpRegiSchema } from "@/schemas/index";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { DateFormat } from "@/common/DateFormat";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetWorkCategoryQuery } from "@/store/services/CreateCompany.service";
import { useToast } from "@/components/ui/use-toast";
import image from "../assets/Sign up-amico.png"

function Cmpinfo() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formatDate } = DateFormat();
  const [imgData, setImgData] = useState<any | null>(null);

  const { data: workCategory } = useGetWorkCategoryQuery("")

  const form = useForm<z.infer<typeof cmpRegiSchema>>({
    mode: "all",
    defaultValues: {
      name:"",
      founder: "",
      email:"",
      password:"",
      startDate:null,
      workCategory:"",
      workingHour:null,
      minStaff:null,
      maxStaff:null,
      address:"",
      city:"",
      state:"",
      country:"",
      pincode:null,
      landmark:"",

    },
    resolver: zodResolver(cmpRegiSchema)
  });

  const onSubmit = async (e: z.infer<typeof cmpRegiSchema>) => {
    const formData = new FormData();
    formData.append("logo", imgData);
    formData.append("name", e.name);
    formData.append("founder", e.founder);
    formData.append("startDate", e.startDate);
    formData.append("email", e.email);
    formData.append("password", e.password);
    formData.append("workCategory", e.workCategory);
    formData.append("workingHour", e.workingHour);
    formData.append("minStaff", e.minStaff);
    formData.append("maxStaff", e.maxStaff);
    formData.append("address", e.address);
    formData.append("city", e.city);
    formData.append("state", e.state);
    formData.append("country", e.country);
    formData.append("pincode", e.pincode);
    formData.append("landmark", e.landmark);

    try {
      const response = await axios.post("http://localhost:5000/api/company/add-company", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        navigate("/login");
      }
      else {
        toast({
          className: "bg-red-500 text-white",
          title: response?.data?.message,

        });
      }
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div className="flex p-5">
      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4">
        <h1 className="text-[#484c7f] font-bold text-2xl text-center">
          Company Registration
        </h1>
        <p className="text-[#484c7f] text-center text-2xl">
          Register your company for use our services
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" gap-4 grid grid-cols-1 ">
              <div className=" rounded-3xl w-full p-4 h-fit">
                <h1 className="text-[#484c7f] font-semibold text-2xl">
                  Company details
                </h1>
                <hr className="my-5 border-[grey] opacity-50" />
                <div className="gap-4 grid-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <>
                        <FormItem className="grid items-center gap-4">
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                placeholder="Company name"
                                {...field}
                              //  value={value}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      </>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="founder"
                    render={({ field }) => (
                      <FormItem className="grid items-center gap-4">
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              value={field?.value}
                              onChange={(e) => field?.onChange(e)}
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Founder name"
                            // {...field}
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
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " rounded-[10px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  formatDate(field.value)
                                ) : (
                                  <span>Pick a company launch date</span>
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
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid items-center gap-4">
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Email"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid  items-center gap-4">
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="password"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Password"
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
                    name="workCategory"
                    render={({ field }) => (
                      <FormItem className="grid items-center gap-4 rounded-[10px]">
                        <div className="col-span-3">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className=" border border-[#422b72] text-[#422b72]">
                                <SelectValue placeholder="Select work category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="text-[#422b72]">
                              {workCategory &&
                                workCategory?.data?.map((cat: any) => (
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
                      <FormItem className="grid  items-center gap-4">
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="number"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Company's working Hour"
                              {...field}
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

            <div className=" rounded-3xl  p-4">
              <h1 className="text-[#484c7f] font-semibold text-2xl">
                Staff Information
              </h1>
              <hr className="my-5 border-[grey] opacity-50" />

              {/* <div className="gap-4 grid-row  grid grid-cols-2"> */}
              <div className="gap-4 grid-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-3">

                <FormField
                  control={form.control}
                  name="minStaff"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="number"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="Minimum staff"
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
                  name="maxStaff"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="number"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="Maxumum Staff"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className=" rounded-3xl  p-4 h-fit">
              <h1 className="text-[#484c7f] font-semibold text-2xl">
                Company Address
              </h1>
              <hr className="my-5 border-[grey] opacity-50" />
              <div className="gap-4 grid-row   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="Address"
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
                  name="city"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="City"
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
                  name="state"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="State"
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
                  name="country"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="Country"
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
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="number"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="Pincode"
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
                  name="landmark"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-4">
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            type="text"
                            className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                            placeholder="Landmark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {!imgData && (
              <div className="flex items-center justify-center rounded-3xl  p-4">
                <label
                  htmlFor="logo"
                  className="rounded-3xl flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Click to upload Logo
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Input
                    id="logo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    disabled={imgData ? true : false}
                    onClick={(e) => (e.target.value = null)}
                    onChange={(e) => {
                      const data = e?.target?.files[0];
                      //   convertToBase64(data);
                      setImgData(data);
                    }}
                  />
                </label>
              </div>
            )}

            {imgData && (
              <div className="relative w-fit">
                <div
                  className="absolute top-0  right-0 bg-black text-white text-xl"
                  onClick={() => setImgData(null)}
                >
                  <IoCloseOutline className="" />
                </div>
                <img
                  src={URL.createObjectURL(imgData)}
                  alt=":sa"
                  className="w-20 h-auto "
                />
              </div>
            )}
            <Button
              type="submit"
              className=" font-bold text-2xl ml-4 rounded-xl hover:text-[#484c7f] bg-[#484c7f] text-white"
              variant="outline"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-1/2  hidden lg:flex justify-center items-center p-5 rounded-2xl h-[95vh] fixed right-5">
        <div className="h-4/5 w-3/4">
          <img src={image} />
        </div>
      </div>


    </div>
  );
}

export default Cmpinfo;
