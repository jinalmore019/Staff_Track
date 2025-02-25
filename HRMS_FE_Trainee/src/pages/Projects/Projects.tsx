import { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon } from "../../common/icons";
import InnerLayout from "@/layout/InnerLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAddPopUp, projectInitialData, formSchema } from "./ProjectsUtils";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DeleteIcon } from "../../common/icons";
import "./Project.css"
import DeleteModal from "@/common/DeleteModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateFormat } from "@/common/DateFormat";
import * as z from "zod";
import axios from "axios";
import Tooltips from "@/common/Tooltips";
import {
  useDeleteProjectMutation,
  useGetProjectByNameQuery,
  usePostProjectMutation,
  usePutProjectMutation,
} from "@/store/services/Project.service";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/common/Loading";
import { TagAddPopUp, tagFormSchema } from "./TagsUtils";
import PaginationCom from "@/common/Pagination";
// import { useDeleteTagsMutation, useGetTagsByNameQuery, usePostTagsMutation } from "@/store/services/Tags.service";

const Projects = () => {
  const { toast } = useToast()
  const [modal, setModal] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDelete: false,
  });
  const [tagDeleteModal, setTagDeleteModal] = useState({
    id: "",
    isDelete: false,
  });
  const [isEdit, setIsEdit] = useState("ADD");
  const [editRecord, setEditRecord] = useState({});
  const [formIndex, setFormIndex] = useState<number>(-1);
  const { formatDate } = DateFormat();

  const { data: getProject, isLoading } = useGetProjectByNameQuery("");
  const [AddProject] = usePostProjectMutation();
  const [EditProject] = usePutProjectMutation();
  const [DeleteProject] = useDeleteProjectMutation();

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Change as needed
  // Calculate pagination limits
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the data to display only items for the current page
  const currentItems = getProject?.data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getProject?.data?.length / itemsPerPage);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      description: "",
      clientName: "",
      returnDate: null,
      status: "",
    },
  });

  const tagForm = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const lisTT = getProject;
    const newData = values;

    if (formIndex === -1) {
      const response = await AddProject(newData);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Project added successfully"
          : response?.data?.message,

      });
    } else {
      if (editRecord?.id) {
        const response = await EditProject({ ...newData, id: editRecord.id });
        toast({
          className: response?.data?.success
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white",
          title: response?.data?.success
            ? "Project edit successfully"
            : response?.data?.message,

        });
      }
    }
    setFormIndex(-1);
    form.reset();
    setModal(false);
  };

  const onEdit = (data: projectInitialData, index: number) => {
    setFormIndex(index);
    setIsEdit("EDIT");
    setModal(true);
    onSetData(data);
  };

  const onSetData = (data: projectInitialData) => {
    setEditRecord(data);
    form.setValue("projectTitle", data.projectTitle);
    form.setValue("description", data.description);
    form.setValue("clientName", data.clientName);
    form.setValue("returnDate", new Date(data.returnDate));
    form.setValue("status", data.status);
    // form.setValue("Department", data.Department);
    // form.setValue("Department", data.Designation);
  };
  const onDelete = async (id: number) => {
    try {
      const response = await DeleteProject({ id });
      setDeleteModal((prev) => ({ ...prev, isDelete: false }));
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Project delete successfully"
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

      <TagAddPopUp
        form={tagForm}
        modal={tagModal}
        setModal={setTagModal}
      />

      <InnerLayout>
        {isLoading ? <Loading /> :
          <div className="bg-white shadow-xl rounded-2xl text-center">
            <div className="p-5">
              <div className="flex justify-end pb-3 items-center">
                <Tooltips title={"Add tags"}>
                  <Button
                    variant={"default"}
                    onClick={() => {
                      setTagModal(true);
                    }}
                    className="bg-[#422b72] text-white rounded font-bold"
                  >
                    TAGS
                  </Button>
                </Tooltips>
                <Tooltips title={"Add Projects"}>
                  <Button
                    onClick={() => {
                      setModal(true);
                      setIsEdit("ADD");
                    }}
                    className="mt-2"
                  >
                    <PlusCircleIcon />
                  </Button>
                </Tooltips>
              </div>
              <Table>
                <TableHeader className="text-lg">
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Project Descripition</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems &&
                    currentItems.map((item: UsrFormIntialData, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {item.projectTitle}
                        </TableCell>
                        <TableCell className="w-96">{item.description}</TableCell>
                        <TableCell>{item.clientName}</TableCell>
                        {/* <TableCell>{item.id}</TableCell> */}
                        <TableCell>{formatDate(item?.returnDate)}</TableCell>

                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center">
                            <Tooltips title={"Update"}>
                              <div className="roundIcon">
                                <PencilIcon onClick={() => onEdit(item, i)} />
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
                                  onSubmit={(i) => onDelete(i)}
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
                tableData={getProject}
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

export default Projects;
