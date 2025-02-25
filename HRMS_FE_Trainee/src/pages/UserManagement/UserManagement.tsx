import InnerLayout from "@/layout/InnerLayout";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoEyeSharp } from "react-icons/io5";
import { PencilIcon, PlusCircleIcon } from "../../common/icons";
import { DeleteIcon } from "../../common/icons";
import { Button } from "@/components/ui/button";
import { DateFormat } from "@/common/DateFormat";
import "./index.css";
import { useToast } from "@/components/ui/use-toast";
import DeleteModal from "@/common/DeleteModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  UserAddPopUp,
  UsrFormIntialData,
  formSchema,
  formPasswordSchema,
} from "./UserManageUtils";
import Tooltips from "@/common/Tooltips";
import {
  useDeleteEmployeeMutation,
  useGetDepartmentByNameQuery,
  useGetDesignationByNameQuery,
  useGetEmployeeByNameQuery,
  usePostEmployeeMutation,
  usePutEmployeeMutation,
} from "@/store/services/User.service";
import emptyProfile from "../../assets/empty-profile.png"
import Loading from "@/common/Loading";
import PaginationCom from "@/common/Pagination";
import { parse } from "postcss";

const UserManagement = () => {
  const { toast } = useToast();
  const { formatDate } = DateFormat();

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDelete: false,
  });

  const [isEdit, setIsEdit] = useState("ADD");
  const [editRecord, setEditRecord] = useState({});
  const [formIndex, setFormIndex] = useState<number>(-1);
  //  const [mainUserData, setMainUserData] = useState<UsrFormIntialData[]>([]);
  //  const [designationData, setDesignationData] = useState();
  //  const [departmentData, setDepartmentData] = useState();
  const { data: employeeData, isLoading } = useGetEmployeeByNameQuery("");
  const {
    data: departData,
    error,
    isSuccess,
  } = useGetDepartmentByNameQuery("");
  const { data: desigData } = useGetDesignationByNameQuery("");
  const [AddEmployee] = usePostEmployeeMutation();
  const [EditEmployee] = usePutEmployeeMutation();
  const [DeleteEmployee] = useDeleteEmployeeMutation();

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeeData?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(employeeData?.data?.length / itemsPerPage);


  const schemaToUse =
    isEdit === "ADD" ? formSchema.merge(formPasswordSchema) : formSchema;
  const form = useForm<z.infer<typeof schemaToUse>>({
    resolver: zodResolver(schemaToUse),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // confirmPassword: "pri12345",
      department: "",
      designation: "",
      mobileNo: "",
      gender: "",
      doj: new Date(),
      // salary: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    debugger
    const lisTT = employeeData;
    const newData = {
      ...values,
      mobileNo: String(values.mobileNo),
      salary: Number(values.salary),
      doj: new Date(values.doj),
    };

    if (formIndex === -1) {
      const response = await AddEmployee(newData);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Employee added successfully"
          : response?.data?.message,
      });
    } else {
      if (editRecord?.id) {
        const response = await EditEmployee({ ...newData, id: editRecord?.id });
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Employee edit successfully"
            : response?.data?.message,
        });
      }
    }
    setFormIndex(-1);
    form.reset();
    setModal(false);
  };

  const onEdit = async (data: UsrFormIntialData, index: number) => {
    setFormIndex(index);
    setIsEdit("EDIT");
    setModal(true);
    onSetData(data);
  };

  const onSetData = (data: UsrFormIntialData) => {
    setEditRecord(data);
    form.setValue("firstName", data.firstName);
    form.setValue("lastName", data.lastName);
    form.setValue("gender", data.gender);
    form.setValue("email", data.email);
    form.setValue("password", data.password);
    form.setValue("doj", new Date(data.doj));
    form.setValue("department", data.department.id);
    form.setValue("designation", data.designation.id);
    form.setValue("salary", data?.salary);
    form.setValue("mobileNo", String(data?.mobileNo));
  };

  const onDelete = async (id) => {
    try {
      const response = await DeleteEmployee({ id });
      setDeleteModal((prev) => ({ ...prev, isDelete: false }));
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Employee delete successfully"
          : response?.data?.message,
      });
    } catch (e) {
      console.error("Error deleting data:", e);
    }
  };

  return (
    <>
      {isSuccess && departData?.data && (
        <UserAddPopUp
          form={form}
          onSubmit={onSubmit}
          modal={modal}
          setModal={setModal}
          isEdit={isEdit}
          departmentData={departData}
          designationData={desigData}
        />
      )}
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white  shadow-xl	rounded-2xl text-center">
            <div className="p-5">
              <div className="flex justify-end pb-3">
                <Tooltips title={"Add Employeees"}>
                  <Button
                    className="flex items-center"
                    onClick={() => {
                      setModal(true);
                      setIsEdit("ADD");
                      setFormIndex(-1);
                    }}
                  >
                    <PlusCircleIcon className="" />
                  </Button>
                </Tooltips>
              </div>

              <Table>
                <TableHeader className="text-lg">
                  <TableRow>
                    <TableHead>Profile</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Email</TableHead>
                    {/* <TableHead>Password</TableHead> */}
                    <TableHead>Joining Date</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Mobile No.</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems &&
                    currentItems.map((rec: UsrFormIntialData, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="">
                          <img
                            src={rec?.profilePic || emptyProfile}
                            alt="profile"
                            className="h-20 w-20 rounded-full"
                          />
                        </TableCell>
                        <TableCell className="">
                          {rec?.firstName + " " + rec?.lastName}
                        </TableCell>
                        <TableCell className="">{rec?.email}</TableCell>
                        {/* <TableCell className="">{rec?.password}</TableCell> */}
                        <TableCell className="">
                          {formatDate(rec.doj)}
                        </TableCell>
                        <TableCell className="">
                          {rec?.department?.name}
                        </TableCell>
                        <TableCell className="">
                          {rec?.designation?.name}
                        </TableCell>
                        <TableCell className="">{rec?.mobileNo}</TableCell>
                        <TableCell className="">{rec?.gender}</TableCell>
                        {/* <TableCell className="">{rec?.id}</TableCell> */}
                        <TableCell className="">
                          <div className="flex justify-center">
                            <Tooltips title={"View"}>
                              <div className="roundIcon">
                                <IoEyeSharp
                                  className="text-blue-700"
                                  onClick={() => {
                                    setModal(true);
                                    onSetData(rec);
                                    setIsEdit("VIEW");
                                  }}
                                />
                              </div>
                            </Tooltips>

                            <Tooltips title={"Update"}>
                              <div className="roundIcon">
                                <PencilIcon
                                  onClick={() => onEdit(rec, i)}
                                  className="text-green-700"
                                />
                              </div>
                            </Tooltips>
                            <Tooltips title={"Delete"}>
                              <div className="roundIcon">
                                <Button
                                  onClick={() => {
                                    setDeleteModal({
                                      id: rec?.id,
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
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>

              </Table>
              <PaginationCom
                tableData={employeeData}
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

export default UserManagement;
