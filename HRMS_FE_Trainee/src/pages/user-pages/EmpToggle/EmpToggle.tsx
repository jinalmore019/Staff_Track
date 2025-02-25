import React, { useEffect, useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddToggle, formSchema } from "./EmpToggleUtils";
import { IoPaperPlane } from "react-icons/io5";

import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { cn } from "@/lib/utils";

import { RxCross2 } from "react-icons/rx";
import {
  useDeleteToggleLogMutation,
  useGetProjectByNameQuery,
  useGetTagByNameQuery,
  useGetToggleLogQuery,
  usePostToggleLogMutation,
  usePutToggleLogMutation,
} from "@/store/services/employee/EmpToggle.service";

import { DateFormat, LongDateFormat } from "@/common/DateFormat";
import axios from "axios";
import Tooltips from "@/common/Tooltips";
import { DeleteIcon } from "@/common/icons";
import DeleteModal from "@/common/DeleteModal";
import stripHtmlTags from "@/common/HtmlToString";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/common/Loading";

const UserToggle = () => {
  const [imgData, setImgData] = useState("null");
  const { toast } = useToast();
  const { formatDate } = DateFormat();
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDelete: false,
  });
  const [editRecord, setEditRecord] = useState({});
  const [formIndex, setFormIndex] = useState<number>(-1);
  const { data: project } = useGetProjectByNameQuery("");
  const { data: tags } = useGetTagByNameQuery("");
  const { data: toggleLog, isLoading } = useGetToggleLogQuery("");
  const [AddToggleLog] = usePostToggleLogMutation();
  const [PutToggleLog] = usePutToggleLogMutation();
  const [DeleteToggleLog] = useDeleteToggleLogMutation();
  const [editor, setEditor] = useState(null);
  const [editorMsg, setEditorMsg] = useState(false);
  const [errorMode, setErrorMode] = useState(false);
  const [endTime, setEndTime] = useState();
  const [startTime, setStartTime] = useState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      updateMessage: "",
      project: "",
      date: new Date(),
      tags: [],
      startTime: "",
      endTime: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!editor?.length) {
      setEditorMsg(true);
      return;
    } else {
      setEditorMsg(false);
    }

    const newData = {
      ...values,
      date: new Date(values.date),
      updateMessage: editor,
      startTime: startTime,
      //  ? new Date(startTime) : "",
      endTime: endTime,
      // ? new Date(endTime) : "",
    };

    if (formIndex === -1) {
      const response = await AddToggleLog(newData);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Toggle log added successfully"
          : response?.data?.message,
      });
    } else {
      if (editRecord?.id) {
        const response = await PutToggleLog({ ...newData, id: editRecord?.id });
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Toggle log edit successfully"
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

  const onDelete = async (id) => {
    const response = await DeleteToggleLog(id);
    setDeleteModal((prev) => ({ ...prev, isDelete: false }));
    toast({
      className: response?.data?.success
        ? "bg-green-500 text-white "
        : "bg-red-500 text-white",
      title: response?.data?.success
        ? "Toggle log delete successfully"
        : response?.data?.message,
    });
  };

  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <AddToggle
                form={form}
                setEditor={setEditor}
                editorMsg={editorMsg}
                editor={editor}
                setEditorMsg={setEditorMsg}
                setErrorMode={setErrorMode}
                errorMode={errorMode}
                onSubmit={onSubmit}
                tags={tags}
                project={project}
                startTime={startTime}
                endTime={endTime}
                setEndTime={setEndTime}
                setStartTime={setStartTime}
              />
            </div>
            {toggleLog &&
              toggleLog?.data
                ?.reduce((acc, res, i) => {
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
                .map(({ date, data }, i) => (
                  <div key={i}>
                    <p className="mt-4 font-bold text-xl text-[#dea34b] scroll-color-change">
                      {LongDateFormat(date)}
                    </p>
                    <hr className="my-5 border-[grey] opacity-50" />
                    <div className="flex  gap-4">
                      {data.map((res, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-2xl p-5 shadow-2xl min-w-[450px] max-w-[450px] "
                          style={{
                            boxShadow:
                              "rgba(136, 165, 191, 0.48) 6px 2px 14px 4px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                          }}
                        >
                          <div className="flex gap-3 items-center mb-3">
                            <div className=" rounded bg-blue-500 h-5 w-5"></div>
                            <h1 className="font-bold text-2xl ">
                              {res.project.projectTitle}
                            </h1>
                          </div>
                          <p className="break-words">
                            {stripHtmlTags(res.updateMessage)}
                          </p>
                          <div className="flex gap-2 flex-wrap mt-4">
                            {Array.isArray(res.tags) ? (
                              res.tags.map((tag, tagIndex) => (
                                <div
                                  key={tagIndex}
                                  className="items-center py-1 px-4 bg-slate-400 rounded-2xl flex gap-2"
                                >
                                  <span>{tag.name}</span>
                                </div>
                              ))
                            ) : (
                              <div className="items-center py-1 px-4 bg-slate-400 rounded-2xl flex gap-2">
                                <span>{res?.tags?.name}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="">
                              {res.startTime + " to " + res.endTime}
                            </h1>
                            <div className="flex items-center">
                              <Tooltips title={"Delete"}>
                                <div className="roundIcon">
                                  <Button
                                    onClick={() => {
                                      setDeleteModal({
                                        id: res?.id,
                                        isDelete: true,
                                      });
                                    }}
                                  >
                                    <DeleteIcon className="text-red-700" />
                                  </Button>
                                  <DeleteModal
                                    isOpen={deleteModal}
                                    setIsOpen={setDeleteModal}
                                    onSubmit={(id) => onDelete(id)}
                                  />
                                </div>
                              </Tooltips>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default UserToggle;
