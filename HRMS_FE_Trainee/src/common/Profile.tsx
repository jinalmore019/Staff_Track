import React, { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import loginImage1 from "../assets/Group11.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { profileSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
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
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import InnerLayout from "@/layout/InnerLayout";
import { Camera } from "./icons";
import {
  useGetProfileByNameQuery,
  usePutProfileMutation,
  useGetDesignationByNameQuery,
  useGetDepartmentByNameQuery,
} from "@/store/services/employee/Profile.service";
import { DateFormat } from "./DateFormat";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useToast } from "@/components/ui/use-toast";
import emptyProfile from "@/assets/empty-profile.png";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const inputFileRef = useRef(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState("");
  const { formatDate } = DateFormat();
  const [selectedImage, setSelectedImage] = useState("");
  const {
    data: getProfileData,
    isLoading,
    refetch,
  } = useGetProfileByNameQuery("");
  const { data: getDepartData } = useGetDepartmentByNameQuery("");
  const { data: getDesigData } = useGetDesignationByNameQuery("");
  const [EditProfile] = usePutProfileMutation();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNo: "",
      email: "",
      gender: "",
      department: "",
      designation: "",
      dob: new Date(),
      doj: new Date(),
      dol: null,
      adharCardNumber: "",
      fatherName: "",
      motherName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      emergencyPersonName: "",
      emergencyPersonContactNumber: "",
      acHolderName: "",
      bankName: "",
      ifscCode: "",
      acNumber: "",
    },
  });

  // console.log(form.getValues(), "form")
  useEffect(() => {
    if (getProfileData?.data) {
      setSelectedImage(getProfileData?.data?.profilePic || "");

      form.setValue("firstName", getProfileData?.data?.firstName || "");
      form.setValue("lastName", getProfileData?.data?.lastName || "");
      form.setValue("mobileNo", getProfileData?.data?.mobileNo || "");
      form.setValue("email", getProfileData?.data?.email || "");
      form.setValue("gender", getProfileData?.data?.gender || "");
      form.setValue("department", getProfileData?.data?.department.name || "");
      form.setValue(
        "designation",
        getProfileData?.data?.designation.name || ""
      );
      form.setValue("dob", getProfileData?.data?.dob || "");
      form.setValue("doj", getProfileData?.data?.doj || "");
      form.setValue("dol", getProfileData?.data?.dol || "");
      form.setValue(
        "adharCardNumber",
        getProfileData?.data?.adharCardNumber || ""
      );
      form.setValue("fatherName", getProfileData?.data?.fatherName || "");
      form.setValue("motherName", getProfileData?.data?.motherName || "");
      form.setValue("address", getProfileData?.data?.address || "");
      form.setValue("city", getProfileData?.data?.city || "");
      form.setValue("state", getProfileData?.data?.state || "");
      form.setValue("country", getProfileData?.data?.country || "");
      form.setValue("pincode", getProfileData?.data?.pincode || "");
      form.setValue(
        "emergencyPersonName",
        getProfileData?.data?.emergencyPersonName || ""
      );
      form.setValue(
        "emergencyPersonContactNumber",
        getProfileData?.data?.emergencyPersonContactNumber || ""
      );
      form.setValue("acHolderName", getProfileData?.data?.acHolderName || "");
      form.setValue("bankName", getProfileData?.data?.bankName || "");
      form.setValue("ifscCode", getProfileData?.data?.ifscCode || "");
      form.setValue("acNumber", getProfileData?.data?.acNumber || "");
    }
  }, [form, getProfileData, getDesigData, getDepartData]);
  const handleIconClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    form.setValue("profilePic", file);
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
    // setSelectedImage(e.target.files[0]);
  };
  const onSubmit = async (e) => {
    debugger;
    const formData = new FormData();
    formData.append("profilePic", selectedImage || "");
    formData.append("firstName", e?.firstName || "");
    formData.append("lastName", e?.lastName || "");
    formData.append("mobileNo", e?.mobileNo || "");
    formData.append("email", e?.email || "");
    formData.append("gender", e?.gender || "");

    formData.append("dob", e?.dob || "");
    formData.append("doj", e?.doj || "");

    formData.append("adharCardNumber", e?.adharCardNumber || "");

    formData.append("fatherName", e?.fatherName || "");
    formData.append("motherName", e?.motherName || "");
    formData.append("address", e?.address || "");
    formData.append("city", e?.city || "");
    formData.append("state", e?.state || "");
    formData.append("country", e?.country || "");
    formData.append("pincode", e?.pincode || "");
    formData.append("emergencyPersonName", e?.emergencyPersonName || "");
    formData.append(
      "emergencyPersonContactNumber",
      e?.emergencyPersonContactNumber || ""
    );
    formData.append("acHolderName", e?.acHolderName || "");
    formData.append("bankName", e?.bankName || "");
    formData.append("ifscCode", e?.ifscCode || "");
    formData.append("acNumber", e?.acNumber || "");

    try {
      const response = await EditProfile(formData);
      refetch();
      toast({
        className: response?.error
          ? "bg-red-500 text-white"
          : "bg-green-500 text-white ",
        title: response?.error
          ? response?.error?.data?.message
          : "profile edit successfully",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  console.log(selectedImage, "selectedImage");

  return (
    <InnerLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4 py-4 w-full">
              <nav>
                <div className="bg-white flex gap-2 rounded-3xl shadow-xl  p-4 items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      <div
                        onClick={handleIconClick}
                        className="absolute bottom-2 p-2 right-2 bg-[#484c7f] rounded-full text-white text-2xl"
                      >
                        <Camera />
                      </div>
                      {/* {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="h-36 rounded-[50%] w-36"
                        />
                      ) : (
                        <img
                          src={getProfileData?.data?.profilePic}
                          alt="Default"
                          className="h-40 rounded-[50%] w-40"
                        />
                      )} */}
                      <img
                        src={selectedImage || emptyProfile}
                        alt="Selected"
                        className="h-36 rounded-[50%] w-36"
                      />
                    </div>
                    <input
                      name="profilePic"
                      id="profilePic"
                      type="file"
                      className="hidden"
                      ref={inputFileRef}
                      onChange={onFileChange}
                    />
                    <div className="px-4">
                      <h1 className="font-bold text-2xl ">
                        {getProfileData?.data?.firstName +
                          " " +
                          getProfileData?.data?.lastName}
                      </h1>
                      <p className="font-thin">
                        {getProfileData?.data?.designation.name}
                      </p>
                    </div>
                  </div>
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
              </nav>
              <div className="grid gap-4 grid-cols-2">
                {/*Personal Info*/}
                <div className="bg-white rounded-3xl p-4 h-fit shadow-xl">
                  <h1 className="text-[#484c7f] font-bold text-3xl">
                    Personal Info
                  </h1>
                  <hr className="my-5 border-[grey] opacity-50" />
                  {/* <div className="gap-4 grid-row  grid grid-cols-2"> */}
                  <div className="gap-4 grid-row  grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="grid w-full items-center gap-4">
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3 border border-black text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                placeholder="First name"
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="grid w-full items-center gap-4">
                          {/* <FormLabel></FormLabel> */}
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3 border border-black text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                placeholder="Last name"
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
                      render={({ field }) => (
                        <FormItem className="grid w-full items-center gap-4">
                          {/* <FormLabel></FormLabel> */}
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3 border border-black text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                placeholder="Mobile number "
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
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid w-full items-center gap-4">
                          {/* <FormLabel></FormLabel> */}
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3 border border-black text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                placeholder="Email"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4  w-full  	">
                          <div className="col-span-4 border	rounded-[10px]">
                            <Popover
                              open={
                                isCalendarOpen && activeCalendar === "birth"
                              }
                              onOpenChange={(isOpen) => {
                                setIsCalendarOpen(isOpen);
                                setActiveCalendar("birth");
                              }}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"destructive"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal rounded-[10px]",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      formatDate(field.value)
                                    ) : (
                                      <span>Pick a birth date</span>
                                    )}

                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 "
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={getProfileData?.data?.dob || ""}
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
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-2 grid grid-cols-4 items-center gap-4">
                          <div className="col-span-3">
                            <FormControl>
                              <RadioGroup
                                {...field}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="male" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Male
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="female" />
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
                  </div>
                </div>
                {/* Company Info */}
                <div className="bg-white rounded-3xl p-4 shadow-xl">
                  <h1 className="text-[#484c7f] font-bold text-3xl">
                    Company Info
                  </h1>
                  <hr className="my-5 border-[grey] opacity-50" />
                  <div className="gap-4 grid-row  grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem className="grid w-full items-center gap-4">
                          {/* <FormLabel></FormLabel> */}
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3 border border-black text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                placeholder="First name"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem className="grid w-full items-center gap-4">
                          {/* <FormLabel></FormLabel> */}
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3 border border-black text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                placeholder="First name"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="doj"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4  w-full  	">
                          <div className="col-span-4 border	rounded-[10px]">
                            <Popover
                              open={
                                isCalendarOpen && activeCalendar === "start"
                              }
                              onOpenChange={(isOpen) => {
                                setIsCalendarOpen(isOpen);
                                setActiveCalendar("start");
                              }}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"destructive"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal rounded-[10px]",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    disabled
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
                                <Calendar
                                  mode="single"
                                  selected={getProfileData?.data?.doj || ""}
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
                      name="dol"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-4 items-center gap-4 	w-full">
                          <div className="col-span-4 border	rounded-[10px]">
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
                                    variant={"destructive"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal rounded-[10px]",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    disabled
                                  >
                                    {field.value ? (
                                      formatDate(field.value)
                                    ) : (
                                      <span>Date of leaving</span>
                                    )}

                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0 "
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={getProfileData?.data?.dol || ""}
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
              {/* Indentification Info */}

              <div className="bg-white rounded-3xl  p-4 shadow-xl">
                <h1 className="text-[#484c7f] font-bold text-3xl">
                  Indentification Info
                </h1>
                <hr className="my-5 border-[grey]" />
                {/* <div className="gap-4 grid-row  grid grid-cols-5"> */}
                <div className="gap-4 grid-row grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                  <FormField
                    control={form.control}
                    name="adharCardNumber"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Adharcard number"
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
              {/* Communication Info */}

              <div className="bg-white rounded-3xl  p-4 shadow-xl">
                <h1 className="text-[#484c7f] font-bold text-3xl">
                  Communication Info
                </h1>
                <hr className="my-5 border-[grey] opacity-50" />
                {/* <div className="gap-4 grid-row  grid grid-cols-4"> */}
                <div className="gap-4 grid-row grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
                  <FormField
                    control={form.control}
                    name="fatherName"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Father's full name"
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
                    name="motherName"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Mother's full name"
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
                    name="address"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
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
                        {/* <FormLabel></FormLabel> */}
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
                        {/* <FormLabel></FormLabel> */}
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
                        {/* <FormLabel></FormLabel> */}
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
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
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
                </div>
              </div>
              {/* Emergency Contact Info */}

              <div className="bg-white rounded-3xl  p-4 shadow-xl">
                <h1 className="text-[#484c7f] font-bold text-3xl">
                  Emergency Contact Info
                </h1>
                <hr className="my-5 border-[grey] opacity-50" />
                {/* <div className="gap-4 grid-row grid-cols-1 sm:grid-col-2 lg:grid-col-4 md:grid-cols-4"> */}
                <div className="gap-4 grid-row  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="emergencyPersonName"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Emergency Person Name"
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
                    name="emergencyPersonContactNumber"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Emergency Person Number"
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
              {/* Bank Info */}
              <div className="bg-white rounded-3xl p-4 shadow-xl">
                <h1 className="font-bold text-3xl text-[#484c7f]">Bank Info</h1>
                <hr className="my-5 border-[grey] opacity-50" />
                <div className="gap-4 grid-row  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="acHolderName"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Account holder name"
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
                    name="bankName"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Bank name"
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
                    name="ifscCode"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="IFSCcode"
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
                    name="acNumber"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        {/* <FormLabel></FormLabel> */}
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                              placeholder="Account number"
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
              <Button
                className=" font-bold text-2xl rounded-xl hover:text-[#484c7f] bg-[#484c7f] text-white py-3"
                variant="outline"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </InnerLayout>
  );
};

export default Profile;
