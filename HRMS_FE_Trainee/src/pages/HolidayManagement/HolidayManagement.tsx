import { useEffect } from "react";
import {
  UserAddPopUp,
  HolidayIntialData,
  formSchema,
} from "./HolidayManagementUtils";
import InnerLayout from "@/layout/InnerLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/common/DeleteModal";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import moment from 'moment';

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { DateFormat } from "@/common/DateFormat";
import Tooltips from "@/common/Tooltips";
import { PencilIcon, PlusCircleIcon } from "../../common/icons";
import { DeleteIcon } from "../../common/icons";
import {
  useDeleteHolidayMutation,
  useGetHolidayByNameQuery,
  usePostHolidayMutation,
  usePutHolidayMutation,
} from "@/store/services/Holiday.service";
import Loading from "@/common/Loading";
import { useToast } from "@/components/ui/use-toast";
import PaginationCom from "@/common/Pagination";

const HolidayManagement = () => {
  const { toast } = useToast();

  const [modal, setModal] = useState(false);


  const [editRecord, setEditRecord] = useState({});
  const [formIndex, setFormIndex] = useState<number>(-1);
  const [isEdit, setIsEdit] = useState("ADD");
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDelete: false,
  });
  const { formatDate } = DateFormat();
  const { data: getHoliday, isLoading } = useGetHolidayByNameQuery("");
  const [AddHoliday] = usePostHolidayMutation();
  const [EditHoliday] = usePutHolidayMutation();
  const [DeleteHoliday] = useDeleteHolidayMutation();

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Change as needed
  // Calculate pagination limits
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the data to display only items for the current page
  const currentItems = getHoliday?.data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getHoliday?.data?.length / itemsPerPage);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate:null,
      endDate: null,
      holidayType: "",
      description: "",
    },
  });



  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    debugger
    const newData = values;
    const { description, ...restVal } = values;

    const payload = {
      ...restVal,
      description: !values.description ? null : values.description,
      startDate:moment(values.startDate).format("YYYY-MM-DD"),
      endDate:moment(values.endDate).format("YYYY-MM-DD")
    };

    if (formIndex === -1) {
      const response = await AddHoliday(payload);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Holiday added successfully"
          : response?.data?.message,

      });
    } else {
      if (editRecord?.id) {
        const response = await EditHoliday({ ...payload, id: editRecord.id });
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Holiday edit successfully"
            : response?.data?.message,
  
        });
      }
    }
    setModal(false);
    setFormIndex(-1);
    form.reset();
  };

  const onEdit = (data: HolidayIntialData, i: number) => {
    setFormIndex(i);
    setIsEdit("EDIT");
    setModal(true);
    setEditRecord(data);
    form.setValue("title", data.title);
    form.setValue("startDate", new Date(data.startDate));
    form.setValue("endDate", new Date(data.endDate));
    form.setValue("holidayType", data.holidayType);
    form.setValue("description", data.description || "");
  };

  const onDelete = async (id: number) => {
    try {
      const response=await DeleteHoliday({ id });
      setDeleteModal((prev) => ({ ...prev, isDelete: false }));
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Holiday delete successfully"
          : response?.data?.message,

      });
    } catch (e) {
      console.error("Error deleting data:", e);
    }
  };


  return (
    <>
      <UserAddPopUp
        form={form}
        onSubmit={onSubmit}
        modal={modal}
        setModal={setModal}
        isEdit={isEdit}
      />
      <InnerLayout>
        {isLoading ? <Loading /> :
          <div className="bg-white rounded-2xl text-center">
            <div className="p-5 shadow-xl">
              <div className="flex justify-end space-x-5 py-5">
                <Tooltips title={"Add Holidays"}>
                  <Button
                    onClick={() => {
                      setModal(true);
                      setFormIndex(-1);
                    }}
                  >
                    <PlusCircleIcon />
                  </Button>
                </Tooltips>
              </div>
              <Table>
                <TableHeader className="text-lg">
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Holiday Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {currentItems &&
                    currentItems.map((item: UsrFormIntialData, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>{formatDate(item.startDate)}</TableCell>
                        <TableCell>
                          {item.endDate ? formatDate(item.endDate) : "-"}
                        </TableCell>
                        <TableCell>{item.holidayType}</TableCell>
                        <TableCell>
                          {item.description ? item.description : "-"}
                        </TableCell>
                        <div className="flex justify-center">
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
                                  setDeleteModal({
                                    id: item?.id,
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
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
                <PaginationCom
                  tableData={getHoliday} 
                  currentPage={currentPage} 
                  setCurrentPage={setCurrentPage} 
                  itemsPerPage={itemsPerPage} 
                  totalPages={totalPages} 
                />
            </div>
          </div>
        }
      </InnerLayout>
    </>
  );
};

export default HolidayManagement;
