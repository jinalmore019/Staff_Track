import React, { useEffect, useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./ToggleLogUtils";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RxCross2 } from "react-icons/rx";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import dp from "../../assets/speaker-greg.avif";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {
  useGetEmpQuery,
  useGetToggleQuery,
} from "@/store/services/ToggleLog.service";
import Loading from "@/common/Loading";
import stripHtmlTags from "@/common/HtmlToString";
import { DateFormat, LongDateFormat } from "@/common/DateFormat";
import emptyProfile from "../../assets/empty-profile.png";

const ToggleLog = () => {
  const { formatDate } = DateFormat();

  const [selectedToggle, setSelectedToggle] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const { data: EmpData, isLoading } = useGetEmpQuery(searchInput);
  const { data: toggleData } = useGetToggleQuery("");

  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const toggleRowCollapse = (index: number) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empName: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      Designation: "",
      joinDate: new Date(),
    },
  });
  // console.log(EmpData, "EmpDataEmpData");
  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex justify-end mb-5">
              <input
                type="text"
                placeholder="Search employees"
                className="flex h-10 w-72 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {/*--------------------- profile box -----------------*/}
            <div
              className="overflow-x-auto"
              style={{
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              <div className=" flex sm:grid-cols-2 lg:grid-cols-3 gap-6 md:grid-cols-2 mb-11">
                {EmpData &&
                  EmpData.data
                    .filter((res) =>
                      `${res.firstName} ${res.lastName}`
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    )
                    .sort((a, b) => {
                      // Sort based on how closely the full names match the search query
                      const aMatch = `${a.firstName} ${a.lastName}`
                        .toLowerCase()
                        .indexOf(searchInput.toLowerCase());
                      const bMatch = `${b.firstName} ${b.lastName}`
                        .toLowerCase()
                        .indexOf(searchInput.toLowerCase());
                      return aMatch - bMatch;
                    })
                    .map((res, i) => (
                      <div
                        key={i}
                        className={`bg-white rounded-3xl flex flex-col items-center  shadow-md w-[280px] h-[300px] py-7 px-12 ${
                          selectedToggle?.id === res.id ? "bg-[#eeeeee]" : ""
                        }`}
                      >
                        <div className="rounded-[50%]  flex justify-center ">
                          <img
                            src={res.profilePic || emptyProfile}
                            alt=""
                            className="object-cover  h-28  rounded-[50%]"
                          />
                        </div>
                        <h1 className="text-[#422b72] font-bold text-[21px] mt-3">
                          {res?.firstName + " " + res?.lastName}
                        </h1>
                        <h3 className="pt-2 font-semibold">
                          {res?.designation?.name}
                        </h3>
                        <div className="flex justify-end">
                          <Button
                            className={`mt-4 rounded-full border border-[#484c7f] w-36 ${
                              selectedToggle?.id === res.id
                                ? "bg-[#422b72] text-white"
                                : ""
                            }`}
                            variant="outline"
                            onClick={() => {
                              setSelectedToggle(res);
                            }}
                          >
                            View Toggle
                          </Button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/*--------------------- log box -----------------*/}

            {selectedToggle && (
               <div className="relative">
              {toggleData &&
                  toggleData?.data
                    ?.filter((togg) => togg.empId === selectedToggle.id)
                    .reduce((acc, res, i) => {
                      const previousDate =
                        acc.length > 0 ? acc[acc.length - 1].date : null;
                      if (
                        previousDate &&
                        formatDate(previousDate) === formatDate(res.date)
                      ) {
                        acc[acc.length - 1].data.push(res);
                      } else {
                        acc.push({ date: res.date, data: [res] });
                      }
                      return acc;
                    }, [])
                    .map((togg, i) => (
                      <div key={i}>
                        <Collapsible className="">
                          <CollapsibleTrigger
                            // onClick={() => handleToggleCollapse(i)}
                            onClick={() => toggleRowCollapse(i)}
                            className="gap-2 pb-1 "
                          >
                            <div>
                              <p className="mt-4 font-bold text-xl  text-[#dea34b]">
                                {LongDateFormat(togg.date)}
                              </p>
                            </div>
                            <div className="flex absolute right-0">
                              {activeRowIndex === i ? (
                                <IoMdArrowDropup className="h-5 w-5" />
                              ) : (
                                <IoMdArrowDropdown className="h-5 w-5" />
                              )}
                            </div>
                          </CollapsibleTrigger>
                          <hr className="my-5 border-[grey] opacity-50" />
                          {activeRowIndex === i && (
                            <CollapsibleContent className="text-base">
                             
                              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2">
                                {toggleData?.data
                                  ?.filter((t) => t.date === togg.date)
                                  .map((item, index) => (
                                    <div
                                      key={index}
                                      className="bg-white rounded-2xl p-5 shadow-2xl"
                                      style={{
                                        boxShadow:
                                          "rgba(136, 165, 191, 0.48) 6px 2px 14px 4px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                                      }}
                                    >
                                      <div className="flex gap-3 items-center mb-3">
                                        <div className=" rounded bg-blue-500 h-5 w-5"></div>
                                        <h1 className="font-bold text-2xl ">
                                          {item.project.projectTitle}
                                        </h1>
                                      </div>
                                      <p className="break-words">
                                        {stripHtmlTags(item.updateMessage)}
                                      </p>
                                      <div className="flex gap-2 flex-wrap my-4">
                                        {Array.isArray(item.tags) ? (
                                          item.tags.map((tag, tagIndex) => (
                                            <div
                                              key={tagIndex}
                                              className="items-center py-1 px-4 bg-slate-400 rounded-full flex gap-2"
                                            >
                                              <span>{tag.name}</span>
                                            </div>
                                          ))
                                        ) : (
                                          <div className="items-center py-1 px-4 bg-slate-400 rounded-full flex gap-2">
                                            <span>{item.tags.name}</span>
                                          </div>
                                        )}
                                      </div>
                                      <h1 className="mt-4">
                                        {item.startTime + " to " + item.endTime}
                                      </h1>
                                    </div>
                                  ))}
                              </div>
                            </CollapsibleContent>
                          )}
                        </Collapsible>
                      </div>
                    ))}
              </div>
            )}
          </div>
        )}
      </InnerLayout>
    </>
  );
};
export default ToggleLog;
