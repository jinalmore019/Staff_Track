import InnerLayout from "@/layout/InnerLayout";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteIcon, PencilIcon, PlusCircleIcon } from "../../common/icons";
import { Input } from "@/components/ui/input";
import { formSchema, typeOfData } from "./DepaDesigUtils";
import { Button } from "@/components/ui/button";
import Tooltips from "@/common/Tooltips";
import DeleteModal from "@/common/DeleteModal";
import axios from "axios";
import { preventContextMenu } from "@fullcalendar/core/internal.js";
import {
  useDeleteDepartMutation,
  useDeleteDesigMutation,
  useGetDepartmentQuery,
  useGetDesignationQuery,
  usePostDepartMutation,
  usePostDesigMutation,
  usePutDepartMutation,
  usePutDesigMutation,
} from "@/store/services/DepartDesig.service";
import {
  useGetDepartmentByNameQuery,
  useGetDesignationByNameQuery,
} from "@/store/services/User.service";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/common/Loading";

const DepaDesig = () => {
  const { toast } = useToast();
  const [formIndex, setFormIndex] = useState(-1);
  const [editRecord, setEditRecord] = useState<any>({}); // const [deleteDepartModal, setDeleteDepartModal] = useState(false);
  // const [deleteDesigModal, setDeleteDesigModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    name: "",
    id: "",
    isDelete: false,
  });

  const {
    data: departData,
    refetch:departRefetch,
  } = useGetDepartmentByNameQuery("");
  const { data: desigData, isLoading,refetch:desigRefetch } = useGetDesignationByNameQuery("");
  const [AddDept] = usePostDepartMutation();
  const [EditDept] = usePutDepartMutation();
  const [DeleteDept] = useDeleteDepartMutation();
  const [AddDesig] = usePostDesigMutation();
  const [EditDesig] = usePutDesigMutation();
  const [DeleteDesig] = useDeleteDesigMutation();

  const departmentForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const designationForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = () => {};
  // -------------department----------------
  const onDepartAdd = async () => {
    try {
      const newData = departmentForm.getValues();

      if (formIndex === -1) {
        const response = await AddDept(newData);
        departRefetch();
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Department added successfully"
            : response?.data?.message,
        });
      } else {
        const payload = { data: newData, id: editRecord?.id };
        if (editRecord?.id) {
          const response = await EditDept(payload);
          departRefetch();
          toast({
            className: response?.data?.success
              ? "bg-green-500 text-white "
              : "bg-red-500 text-white",
            title: response?.data?.success
              ? "Department edit successfully"
              : response?.data?.message,
          });
        }
      }
      // Reset form and index
      setFormIndex(-1);
      departmentForm.reset();
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  const onEditDepartment = async (data, i) => {
    setEditRecord(data);
    setFormIndex(i);
    departmentForm.setValue("name", data.name);
  };
  //----------------------common----------------------------------------
  const onDelete = async (i: number, name: string) => {
    try {
      if (name === "depart") {
        const response = await DeleteDept({ i });
        setDeleteModal((prev) => ({ ...prev, isDelete: false }));
        departRefetch();
        desigRefetch();
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Department delete successfully"
            : response?.data?.message,
        });
      } else {
        const response = await DeleteDesig({ i });
        departRefetch();
        desigRefetch();
        setDeleteModal((prev) => ({ ...prev, isDelete: false }));
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Designation delete successfully"
            : response?.data?.message,
        });
      }
    } catch (e) {
      console.error("Error deleting data:", e);
    }
  };
  //-------------designation----------------

  const onDesigAdd = async () => {
    try {
      const lisTT = desigData;
      const newData = designationForm.getValues();
      console.log(newData);

      if (formIndex == -1) {
        const response = await AddDesig(newData);
        desigRefetch();
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Designation added successfully"
            : response?.data?.message,
        });
      } else {
        const payload = { data: newData, id: editRecord?.id };
        if (editRecord?.id) {
          const response = await EditDesig(payload);
          desigRefetch();
          toast({
            className: response?.data?.success
              ? "bg-green-500 text-white "
              : "bg-red-500 text-white",
            title: response?.data?.success
              ? "Designation edit successfully"
              : response?.data?.message,
          });
        }
      }
      setFormIndex(-1);
      designationForm.reset();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const onEditDesignation = async (data, i) => {
    setEditRecord(data);
    setFormIndex(i);
    designationForm.setValue("name", data.name);
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        onSubmit={(i, name) => onDelete(i, name)}
      />
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          // <div className="flex gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department table */}
            <div className="flex-1 bg-white rounded-3xl p-5 shadow-2xl">
              <h1 className="font-bold text-3xl text-center pb-5 text-[#422b72]">
                Department
              </h1>
              <div className="flex gap-7">
                <div className="flex-1">

                  <Form {...departmentForm}>
                    <form onSubmit={departmentForm.handleSubmit(onSubmit)}>
                      <FormField
                        control={departmentForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="col-span-3">
                              <FormControl>
                                <Input
                                  type="text"
                                  className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] w-full"
                                  placeholder="Enter Department"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div className="">
                  <Tooltips title={"Add Department"}>
                    <Button onClick={onDepartAdd}>
                      <PlusCircleIcon
                        className=""
                        onClick={() => setFormIndex(-1)}
                      />
                    </Button>
                  </Tooltips>
                </div>
              </div>

              <div className="text-center pt-12">
                <Table>
                  <TableHeader className="text-lg">
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departData &&
                      departData?.data?.map((item, i: number) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <div className="flex justify-center">
                            <Tooltips title={"Update"}>
                              <div className="roundIcon">
                                <PencilIcon
                                  className=""
                                  onClick={() => onEditDepartment(item, i)}
                                />
                              </div>
                            </Tooltips>
                            <Tooltips title={"delete"}>
                              <div className="roundIcon">
                                <Button
                                  onClick={() => {
                                    setDeleteModal({
                                      id: item?.id,
                                      isDelete: true,
                                      name: "depart",
                                    });
                                  }}
                                >
                                  <DeleteIcon className="text-red-700" />
                                </Button>
                              </div>
                            </Tooltips>
                          </div>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Designation table */}
            <div className="flex-1 bg-white rounded-3xl p-5 shadow-2xl">
              <h1 className="font-bold text-3xl text-center pb-5 text-[#422b72]">
                Designation
              </h1>
              <div className="flex gap-7">
                <div className="flex-1">
                  <Form {...designationForm}>
                    <form onSubmit={designationForm.handleSubmit(onSubmit)}>
                      <FormField
                        control={designationForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="">
                            <div className="col-span-3">
                              <FormControl>
                                <Input
                                  type="text"
                                  className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]"
                                  placeholder="Enter Designation"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div className="">
                  <Tooltips title={"Add Designation"}>
                    <Button onClick={onDesigAdd}>
                      <PlusCircleIcon className="" />
                    </Button>
                  </Tooltips>
                </div>
              </div>

              <div className="text-center pt-12">
                <Table>
                  <TableHeader className="text-lg">
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Designation Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {desigData &&
                      desigData?.data?.map((item, i: number) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <div className="flex justify-center">
                            <Tooltips title={"Update"}>
                              <div className="roundIcon">
                                <PencilIcon
                                  className=""
                                  onClick={() => onEditDesignation(item, i)}
                                />
                              </div>
                            </Tooltips>
                            <Tooltips title={"delete"}>
                              <div className="roundIcon">
                                <Button
                                  onClick={() => {
                                    setDeleteModal({
                                      id: item?.id,
                                      isDelete: true,
                                      name: "desig",
                                    });
                                  }}
                                >
                                  <DeleteIcon className="text-red-700" />
                                </Button>
                              </div>
                            </Tooltips>
                          </div>
                        </TableRow>
                      ))}
                    {/* <DeleteModal isOpen={deleteModal} setIsOpen={setDeleteModal} onSubmit={(i) => onDesigDelete(i)} /> */}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default DepaDesig;
