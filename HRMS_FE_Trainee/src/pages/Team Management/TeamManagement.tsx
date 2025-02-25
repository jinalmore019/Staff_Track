import { useEffect, useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import axios from "axios";
//  import TeamManagementUtils from "./TeamManagementUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoEyeSharp, IoTerminalSharp } from "react-icons/io5";
import { DateFormat } from "@/common/DateFormat";
import { FaPencilAlt } from "react-icons/fa";
import { LucidePlusCircle } from "lucide-react";
import DeleteModal from "@/common/DeleteModal";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusCircleIcon, DeleteIcon } from "../../common/icons";
import Tooltips from "../../common/Tooltips";
import {
  TeamAddPopUp,
  TeamFormInitialData,
  formSchema,
} from "./TeamManagementUtils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  useDeleteTeamMutation,
  useGetEmployeeByNameQuery,
  useGetProjectByNameQuery,
  useGetTeamByNameQuery,
  usePostTeamMutation,
  usePutTeamMutation,
} from "@/store/services/Team.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/common/Loading";
import PaginationCom from "@/common/Pagination";
const TeamManagement = () => {
  const { toast } = useToast();
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState("ADD");
  const [formIndex, setFormIndex] = useState<number>(-1);
  // const [allEmployee, setAllEmployee] = useState([]);
  // const [allProjects, setAllProjects] = useState([]);
  // const [teamData, setTeamData] = useState<TeamFormInitialData[]>([]);
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDelete: false,
  });
  const { formatDate } = DateFormat();
  const [empRecord, setEmpRecord] = useState([]);
  const [editRecord, setEditRecord] = useState({});
  const { data: getTeam, isLoading } = useGetTeamByNameQuery("");
  const { data: getEmp } = useGetEmployeeByNameQuery("");
  const { data: getProject } = useGetProjectByNameQuery("");
  const [AddTeam] = usePostTeamMutation();
  const [EditTeam] = usePutTeamMutation();
  const [DeleteTeam] = useDeleteTeamMutation();
  //pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getTeam?.data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getTeam?.data?.length / itemsPerPage);
  useEffect(() => {
    const finalData = getEmp?.data.map((emp) => ({
      label: emp.firstName + " " + emp.lastName,
      value: emp.id,
    }));
    console.log(finalData, "final emp");
    setEmpRecord(finalData);
  }, [getEmp]);
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: "",
      startDate: new Date(),
      endDate: new Date(),
      leaderId: "",
      members: null,
      // totalDays: 2,
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    debugger
    const newData = {
      ...values,
      members: values?.members?.map((rec) => rec.value),
      projectId: values?.project||"",
      leaderId: values?.leaderId|| "" 
    };
    if (formIndex === -1) {
      const response = await AddTeam(newData);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Team added successfully"
          : response?.data?.message,
      });
      setModal(false);
    } else {
      if (editRecord?.id) {
        const response = await EditTeam({ id: editRecord.id, ...newData });
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Team edit successfully"
            : response?.data?.message,
        });
      }
    }
    setFormIndex(-1);
    form.reset();
    setModal(false);
  };
  const onEdit = (data: TeamFormInitialData, i: number) => {
    setFormIndex(i);
    setModal(true);
    setIsEdit("Edit");
    onSetData(data);
  };
  const onSetData = (data: TeamFormInitialData) => {
    const finalData = data.members?.map((emp) => ({
      label: (emp?.firstName || "") + " " + (emp?.lastName || ""),
      value: emp?.id,
    }));
    setEditRecord(data);
    form.setValue("project", data.project.id);
    form.setValue("startDate", new Date(data.startDate));
    form.setValue("endDate", new Date(data.endDate));
    form.setValue("leaderId", data?.leaderId.id);
    const membersNames = data.members
      .map((member) => `${member.firstName} ${member.lastName}`)
      .join(" ");

    form.setValue("members", finalData);
    form.setValue("totalDays", data.totalDays);
  };
  const onDelete = async (id) => {
    const response = await DeleteTeam({ id });
    setDeleteModal((prev) => ({ ...prev, isDelete: false }));
    toast({
      className: response?.data?.success
        ? "bg-green-500 text-white "
        : "bg-red-500 text-white",
      title: response?.data?.success
        ? "Team delete successfully"
        : response?.data?.message,
    });
  };
  console.log(JSON.stringify(getEmp), "getEmpgetEmp");
  return (
    <>
      <TeamAddPopUp
        form={form}
        onSubmit={onSubmit}
        modal={modal}
        setModal={setModal}
        isEdit={isEdit}
        allEmployee={getEmp}
        empRecord={empRecord}
        allProjects={getProject}
        editRecord={editRecord}
      />
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-2xl">
            <div className="p-5 shadow-xl">
              <div className="flex justify-end pb-3">
                <Button
                  onClick={() => {
                    setModal(true);
                    setFormIndex(-1);
                    setIsEdit("ADD");
                  }}
                >
                  <LucidePlusCircle className="text-[#422B72]" size={50} />
                </Button>
              </div>
              <Table>
                <TableHeader className="text-lg">
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    {/* <TableHead>Total Days</TableHead> */}
                    <TableHead>Leader</TableHead>
                    <TableHead>Team Members</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {currentItems &&
                    currentItems.map((item, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {item.project.projectTitle}
                        </TableCell>
                        <TableCell>{formatDate(item.startDate)}</TableCell>
                        <TableCell>
                          {item.endDate ? formatDate(item.endDate) : "-"}
                        </TableCell>
                        {/* <TableCell>{item.totalDays}</TableCell> */}
                        <TableCell>
                          {item.leaderId.firstName +
                            " " +
                            item.leaderId.lastName +
                            " - " +
                            item.leaderId.designation.name}
                        </TableCell>
                        <TableCell>
                          {item.members.map((member, index) => (
                            <div key={index}>
                              {member.firstName + " " + member.lastName} -{" "}
                              {member.designation.name}
                            </div>
                          ))}
                        </TableCell>
                        {/* <TableCell>{item.members}</TableCell> */}
                        <TableCell>
                          <div className="flex">
                            <Tooltips title={"View"}>
                              <div className="roundIcon">
                                <IoEyeSharp
                                  className="text-blue-700"
                                  onClick={() => {
                                    setModal(true);
                                    onSetData(item);
                                    setIsEdit("VIEW");
                                  }}
                                />
                              </div>
                            </Tooltips>
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
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <PaginationCom
                tableData={getTeam}
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
export default TeamManagement;
