import React, { useEffect, useMemo, useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BreakIn, BreakOut, CheckOut, CheckIn } from "@/common/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiOutlineCheck } from "react-icons/ai";
import { FaMugHot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./EmpLogUtils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGetAllUserLogQuery } from "@/store/services/UserLog.service";
import Loading from "@/common/Loading";
import PaginationCom from "@/common/Pagination";
import { DateFormat } from "@/common/DateFormat";

const EmpLog = () => {
  const { formatDate } = DateFormat();
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  const { data: getUserLog, isLoading } = useGetAllUserLogQuery("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getUserLog?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(getUserLog?.data?.length / itemsPerPage);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const [filteredData, setFilteredData] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleDateSelect = () => {
    const startDate = form.getValues('startDate');
    const endDate = form.getValues('endDate');
    let filtered = getUserLog?.data;
  
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return date >= startDate && date <= endDate;
      });
    }
  
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    setFilteredData(filtered);
  };
  
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!filteredData) return null;
    if (!sortBy) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });

    return sorted;
  }, [filteredData, sortBy, sortOrder]);

  const paginatedData = sortedData
    ? sortedData.slice(indexOfFirstItem, indexOfLastItem)
    : currentItems;


  const toggleRowCollapse = (index: number) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };

  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex gap-4 justify-end sm:grid-cols-1">
              <Form {...form}>
                <div className="flex gap-5 mb-4 ">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex items-center">
                        <div className="col-span-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"default"}
                                  className={cn(
                                    "w-80 pl-3  text-left font-normal rounded-[10px]  focus:outline-[#7b7ea8]",
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
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  handleDateSelect();
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
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <div className="col-span-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"default"}
                                  className={cn(
                                    "w-80 pl-3 text-left font-normal rounded-[10px]",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    formatDate(field?.value)
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
                                onSelect={(date) => {
                                  field.onChange(date);
                                  handleDateSelect();
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
                </div>
              </Form>
            </div>

            <div className="flex py-3">
              <div className="bg-white rounded-xl shadow-2xl basis-full h-15 p-5">
                <Table>
                  <TableHeader className="text-lg">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Check-in Time</TableHead>
                      <TableHead>Check-out Time</TableHead>
                      <TableHead>Total Time</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData &&
                      paginatedData.map((item, index: number) => (
                        <React.Fragment key={index}>
                          <TableRow>
                            <TableCell className="font-bold text-sm">{formatDate(item?.date)}</TableCell>
                            <TableCell>{new Date(item?.timeBlock[0]?.startTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}</TableCell>
                            <TableCell>{item?.timeBlock[item?.timeBlock?.length - 1]?.endTime ? new Date(item.timeBlock[item?.timeBlock?.length - 1]?.endTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }) : "Haven't checked out yet today"}</TableCell>
                            <TableCell>{item?.hours + " : " + item?.minutes + " : " + item?.seconds}</TableCell>
                            <TableCell>
                              <Button
                                onClick={() => toggleRowCollapse(index)}
                                variant={"default"}
                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                              >
                                {activeRowIndex === index ? (
                                  <IoMdArrowDropup className="h-5 w-5" />
                                ) : (
                                  <IoMdArrowDropdown className="h-5 w-5" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {activeRowIndex === index && (
                            <TableRow>
                              <TableCell colSpan={8}>
                                <div className="flex gap-4 w-full ">

                                  <div className="bg-white rounded-xl h-24 basis-1/3	 flex items-center shadow-xl">
                                    <div className="box flex p-4 justify-between items-center gap-5  w-full">
                                      <div className="w-16 h-14 rounded-full flex items-center text-4xl justify-center bg-blue-500">
                                        <CheckIn className="text-white" />
                                      </div>
                                      <h1 className="font-semibold text-xl">
                                        Check In
                                      </h1>
                                      <span className="font-bold text-blue-800 text-xl">
                                        {new Date(item?.timeBlock[0]?.startTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="bg-white rounded-xl h-24 basis-1/3	 flex items-center shadow-xl">
                                    <div className="box flex p-4 justify-between items-center w-full gap-5">
                                      <div className="w-16 h-14 rounded-full flex justify-center text-4xl  items-center bg-green-500">
                                        <BreakIn className="text-white" />
                                      </div>
                                      <h1 className="font-semibold text-xl">
                                         Break Time
                                      </h1>
                                      <span className="font-bold text-blue-800 text-xl">
                                      {item?.TotalBreakHour!=null ? item?.TotalBreakHour + " : " + item?.TotalBreakMinute + " : " + item?.TotalBreakSecond : " 00 : 00 : 00"}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2"></div>
                                  </div>

                                  <div className="bg-white rounded-xl h-24 basis-1/3	 flex items-center shadow-xl">
                                    <div className="box flex p-4 justify-between items-center gap-5 w-full">
                                      <div className="w-16 h-14 rounded-full flex justify-center text-4xl pl-2 items-center bg-blue-500">
                                        <CheckOut className="text-white" />
                                      </div>
                                      <h1 className="font-semibold text-xl">
                                        Check Out
                                      </h1>
                                      <span className="font-bold text-blue-800 text-xl">
                                      {item?.timeBlock[item?.timeBlock?.length - 1]?.endTime ? new Date(item.timeBlock[item?.timeBlock?.length - 1]?.endTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }) : "Haven't checked out yet today"}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2"></div>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      )
                      )}
                  </TableBody>
                </Table>
                <PaginationCom
                  tableData={sortedData || getUserLog.data}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalPages={Math.ceil((sortedData || currentItems)?.length / itemsPerPage)}
                />
              </div>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default EmpLog;
