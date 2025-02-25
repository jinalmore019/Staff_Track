import { useEffect, useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import React from "react";
import { PlusCircleIcon, DeleteIcon, PencilIcon } from "@/common/icons";
import { NoticeAddPopUp, formSchema, noticeIntialData } from "./NoticeUtils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Tooltips from "@/common/Tooltips";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { DateFormat } from "@/common/DateFormat";
import DeleteModal from "@/common/DeleteModal";
import {
  useDeleteNoticeMutation,
  useGetNoticeByNameQuery,
  usePostNoticeMutation,
  usePutNoticeMutation,
} from "@/store/services/Notice.service";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/common/Loading";
import PaginationCom from "@/common/Pagination";

const Notice = () => {
  const { toast } = useToast();
  const [modal, setModal] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const [editRecord, setEditRecord] = useState({});
  const [formIndex, setFormIndex] = useState<number>(-1);
  const [isEdit, setIsEdit] = useState("ADD");
  const { formatDate } = DateFormat();
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDelete: false,
  });

  const { data: getNotice, isLoading } = useGetNoticeByNameQuery("");
  const [AddNotice] = usePostNoticeMutation();
  const [EditNotice] = usePutNoticeMutation();
  const [DeleteNotice] = useDeleteNoticeMutation();

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Change as needed
  // Calculate pagination limits
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the data to display only items for the current page
  const currentItems = getNotice?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(getNotice?.data?.length / itemsPerPage);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const lisTT = getNotice;
    const newData = values;
    const { description, ...restVal } = values;

    const payload = {
      ...restVal,
      description: !values.description ? null : values.description,
    };

    if (formIndex === -1) {
      const response = await AddNotice(newData);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Notice added successfully"
          : response?.data?.message,
      });
    } else {
      if (editRecord?.id) {
        const response = await EditNotice({ ...payload, id: editRecord.id });
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Notice edit successfully"
            : response?.data?.message,
        });
      }
    }
    setModal(false);
    setFormIndex(-1);
    form.reset();
  };
  const onEdit = (data: noticeIntialData, i: number) => {
    setFormIndex(i);
    setIsEdit("EDIT");
    setModal(true);
    setEditRecord(data);
    form.setValue("title", data.title);
    form.setValue("description", data.description);
  };

  const onDelete = async (id: number) => {
    try {
      const response = await DeleteNotice({ id });
      setDeleteModal((prev) => ({ ...prev, isDelete: false }));
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Notice delete successfully"
          : response?.data?.message,
      });
    } catch (e) {
      console.error("Error deleting data:", e);
    }
  };
  console.log(getNotice, "noticeData");

  return (
    <>
      <NoticeAddPopUp
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
          <div cl>
            <div className="flex justify-end space-x-5 py-5 ">
              <Tooltips title={"Add Notice"}>
                <Button
                  className="bg-transparent "
                  onClick={() => {
                    setModal(true);
                    setFormIndex(-1);
                  }}
                >
                  <PlusCircleIcon className="text-white" />
                </Button>
              </Tooltips>
            </div>
            {currentItems &&
              currentItems.map((item, i: number) => (
                <div className="flex rounded-xl bg-white p-5 shadow-xl my-5">
                  <div className="flex-1 content" key={i}>
                    <h2 className="text-2xl font-bold mb-4 ">{item.title}</h2>
                    <p className="overflow-hidden break-words">{item.description}</p>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <p className="font-bold">{formatDate(item.date)}</p>
                    <div className="">
                      <Tooltips title={"Update"}>
                        <div className="roundIcon">
                          <PencilIcon
                            onClick={() => onEdit(item, i)}
                            className="text-green-700"
                          />
                        </div>
                      </Tooltips>
                      <Tooltips title={"Delete"}>
                        <div className="roundIcon">
                          <Button
                            onClick={() => {
                              setDeleteModal({ id: item?.id, isDelete: true });
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
        )}
        <PaginationCom
          tableData={getNotice}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
        />
      </InnerLayout>
    </>
  );
};

export default Notice;
