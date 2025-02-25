import React, { useEffect, useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddLeave, LeaveData, formSchema } from "./EmpLeaveUtils";
import { useForm } from "react-hook-form";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as z from "zod";
import {
  useDeleteLeaveMutation,
  useGetLeaveQuery,
  usePostLeaveMutation,
  usePutLeaveMutation,
} from "@/store/services/employee/EmpLeave.service";
import { DateFormat, LongDateFormat } from "@/common/DateFormat";
import DeleteModal from "@/common/DeleteModal";
import stripHtmlTags from "@/common/HtmlToString";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/common/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";

const UserLeave = () => {
  const { toast } = useToast();
  const { formatDate } = DateFormat();
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDelete: false,
  });
  console.log(deleteModal, "deleteModal");
  const [editor, setEditor] = useState(null);
  const [editorMsg, setEditorMsg] = useState(false);
  const [errorMode, setErrorMode] = useState(false);
  const [editRecord, setEditRecord] = useState({});
  const [formIndex, setFormIndex] = useState<number>(-1);
  const { data: getleaveData, isLoading } = useGetLeaveQuery("");
  const [Addleave] = usePostLeaveMutation();
  const [EditLeave] = usePutLeaveMutation();
  const [DeleteLeave] = useDeleteLeaveMutation();
  const [popoverStates, setPopoverStates] = useState(
    Array(getleaveData?.data.length).fill(false)
  );

  const togglePopover = (index) => {
    setPopoverStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaveTitle: "",
      startDate: null,
      endDate: null,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    debugger;
    if (!editor?.length) {
      setEditorMsg(true);
      return;
    } else {
      setEditorMsg(false);
    }
    const newData = {
      ...values,
      startDate:moment(values.startDate).format("YYYY-MM-DD"),
      endDate:moment(values.endDate).format("YYYY-MM-DD"),
      leaveReason: editor,
    };
    if (formIndex === -1) {
      const response = await Addleave(newData);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Leave added successfully"
          : response?.data?.message,
      });
    } else {
      const payLoad = { data: newData, id: editRecord?.id };
      if (editRecord?.id) {
        const response = await EditLeave(payLoad);
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Leave edit successfully"
            : response?.data?.message,
        });
      }
    }
    setErrorMode(false);
    setFormIndex(-1);
    setEditor(null);
    setEditorMsg(false);
    form.reset();
  };

  const onEdit = async (data: LeaveData, i: number) => {
    setFormIndex(i);
    setEditRecord(data);
    form.setValue("leaveTitle", data.leaveTitle);
    form.setValue("startDate", new Date(data.startDate));
    form.setValue("endDate", new Date(data.endDate));
    setEditor(stripHtmlTags(data.leaveReason));
  };

  const onDelete = async (id: number) => {
    await DeleteLeave(id);
    setDeleteModal((prev) => ({ ...prev, isDelete: false }));
  };

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
      {deleteModal.isDelete && (
        <DeleteModal
          isOpen={deleteModal}
          setIsOpen={setDeleteModal}
          onSubmit={(id) => onDelete(id)}
        />
      )}
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <AddLeave
                form={form}
                setEditor={setEditor}
                editorMsg={editorMsg}
                editor={editor}
                setEditorMsg={setEditorMsg}
                setErrorMode={setErrorMode}
                errorMode={errorMode}
                onSubmit={onSubmit}
              />
            </div>
            {getleaveData &&
              getleaveData.data.map((res, i) => (
                <div key={i} className="relative">
                  <p className="mt-4 font-bold text-xl  text-[#dea34b]">
                    {LongDateFormat(res.createdAt)}
                  </p>
                  <hr className="my-5 border-grey opacity-50" />
                  <div
                    className="bg-white rounded-2xl p-5 shadow-2xl "
                    style={{
                      boxShadow:
                        "rgba(136, 165, 191, 0.48) 6px 2px 16px 8px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                    }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h1 className=" font-bold text-2xl text-[#422B72]">
                        {stripHtmlTags(res.leaveTitle)}
                      </h1>
                      <div className="">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <BsThreeDotsVertical
                              className={`flex ${
                                new Date(res?.startDate) < new Date() ||
                                res?.status !== "pending"
                                  ? "hidden"
                                  : ""
                              }`}
                              onClick={() => togglePopover(i)}
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="right-2 absolute top-full rounded"
                            isOpen={popoverStates[i]}
                          >
                            <div className="shadow-2xl ">
                              <Button
                                className="block w-full text-left px-4 py-2 text-sm text-[#422B72]focus:outline-none focus:bg-blue-100"
                                onClick={() => {
                                  onEdit(res, i);
                                  togglePopover(i);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                className="block w-full text-left px-4 py-2 text-sm text-[#422B72]focus:outline-none focus:bg-blue-100"
                                onClick={() => {
                                  setDeleteModal({
                                    id: res?.id,
                                    isDelete: true,
                                  });
                                  togglePopover(i);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="break-words">
                      {stripHtmlTags(res.leaveReason)}
                    </p>
                    {res.endDate === null ? (
                      <h1 className="my-4 font-semibold text-black">
                        {"Start From " +
                          formatDate(res.startDate) +
                          " to " +
                          formatDate(res.startDate)}
                      </h1>
                    ) : (
                      <h1 className="my-4 font-semibold text-black">
                        {"Start From " +
                          formatDate(res.startDate) +
                          " to " +
                          formatDate(res.endDate)}
                      </h1>
                    )}
                    <div
                      className="flex items-center p-2 w-28 gap-2 mt-4"
                      style={{
                        boxShadow:
                          "rgba(136, 165, 191, 0.48) 6px 2px 10px 2px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                      }}
                    >
                      <div
                        className={`${getStatusColor(
                          res.status
                        )} flex items-center gap-1`}
                      >
                        <GoDotFill className="" />
                        <div className="rounded-5xl">
                          <h1 className="capitalize">{res.status}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </InnerLayout>
    </>
  );
};
export default UserLeave;
