import InnerLayout from "@/layout/InnerLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPencilAlt } from "react-icons/fa";
import {
  LeaveFormIntialData,
  LeavePopOver,
  formSchema,
} from "./LeaveManagementUtils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateFormat } from "@/common/DateFormat";
import {
  useDeleteLeaveMutation,
  useGetLeaveByNameQuery,
  usePostLeaveMutation,
  usePutLeaveMutation,
} from "@/store/services/Leave.service";
import Loading from "@/common/Loading";
import stripHtmlTags from "@/common/HtmlToString";
import PaginationCom from "@/common/Pagination";
import emptyProfile from "@/assets/empty-profile.png";

const LeaveManagement = () => {
  const [leaveData, setLeaveData] = useState<LeaveFormIntialData[]>([]);
  const [isEdit, setIsEdit] = useState("EDIT");
  const [formIndex, setFormIndex] = useState(-1);
  const [modal, setModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const { data: getLeave, isLoading } = useGetLeaveByNameQuery("");
  const [EditLeave] = usePutLeaveMutation();
  const { formatDate } = DateFormat();

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getLeave?.data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getLeave?.data?.length / itemsPerPage);

  console.log(currentItems, "getLeave");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      leaveReason: "",
      startDate: new Date(),
      endDate: new Date(),
      leaveStatus: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const lisTT = getLeave;
    const newData = values;
    setLeaveData([...lisTT]);
    setFormIndex(-1);
    form.reset();
    setModal(false);
  };

  //  const openModal = (data: any, i: number) => {
  //      setFormIndex(i);
  //      setModal(true);
  //      form.setValue("fullName", data.empId?.firstName);
  //      form.setValue("leaveReason", data.leaveReason);
  //      //  form.setValue("startDate", data.startDate);
  //      //  form.setValue("endDate", data.endDate);
  //      form.setValue("leaveStatus", data.leaveStatus);
  //  };

  const handleSelectChange = async (e, data) => {
    const payload = {
      status: e,
    };

    try {
      const response = await EditLeave({ ...payload, id: data.id });
      // const updatedData = await fetchData(); // Fetch updated data
      // console.log(updatedData?.data?.data);
      // setLeaveData(updatedData.data.data);
      setSelectedStatus(e);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  console.log(currentItems, "currentItems");
  const getStatusColor = (status: any) => {
    if (status === "pending") {
      return "text-orange-500 font-bold";
    } else if (status === "approved") {
      return "text-green-500 font-bold";
    } else if (status === "rejected") {
      return "text-red-500 font-bold ";
    } else {
      return "";
    }
  };
  return (
    <>
      <LeavePopOver
        form={form}
        onSubmit={onSubmit}
        modal={modal}
        setModal={setModal}
        isEdit={isEdit}
      />
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white  shadow-xl	rounded-2xl text-center">
            <div className="p-5">
              <Table>
                <TableHeader className="text-lg">
                  <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>FullName</TableHead>
                    <TableHead>Leave Reason</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems &&
                    currentItems.map((item, i: number) => (
                      <TableRow key={i}>
                        <TableCell>
                          <img
                            src={item?.empId?.profilePic || emptyProfile}
                            alt="profile"
                            className="h-20 w-20 rounded-full"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.empId.firstName + " " + item.empId.lastName}
                        </TableCell>
                        <TableCell className="w-96">
                          {stripHtmlTags(item.leaveReason)}
                        </TableCell>
                        <TableCell>{formatDate(item.startDate)}</TableCell>
                        <TableCell>
                          {item.endDate ? formatDate(item.endDate) : "-"}
                        </TableCell>
                        <TableCell className={`${getStatusColor(item.status)}`}>
                          {item.status}
                        </TableCell>
                        {item.status !== "approved" &&
                          item.status !== "rejected" && (
                            <div className="flex pt-2 justify-center">
                              <div className="flex pt-2 justify-center">
                                <Select
                                  onValueChange={(e) =>
                                    handleSelectChange(e, item)
                                  }
                                >
                                  <SelectTrigger className="p-0 w-5 border-none">
                                    {/* <SelectValue placeholder="Update status" /> */}
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup className="">
                                      <SelectItem
                                        value="approved"
                                        className={`${
                                          selectedStatus === "approved"
                                            ? "bg-green-500 text-white"
                                            : "bg-transparent text-black"
                                        }`}
                                      >
                                        Approved
                                      </SelectItem>
                                      <SelectItem
                                        value="rejected"
                                        className={`${
                                          selectedStatus === "rejected"
                                            ? "bg-red-500 text-white"
                                            : "bg-transparent text-black"
                                        }`}
                                      >
                                        Rejected
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <PaginationCom
                tableData={getLeave}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default LeaveManagement;
