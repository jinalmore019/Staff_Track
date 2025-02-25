import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images.jpeg";
import {
  ComputerIcon,
  SolidUserPlusIcon,
  HistoryToggleIcon,
  CalendarNumberIcon,
  ProjectSymlinkIcon,
  HourGlassIcon,
  WalletIcon,
  PersonWorkspaceIcon,
  CalendarUserIcon,
  UsersIcon,
  GraphIcon,
  MikeForNotice,
  DepartDesigICon,
  Logout,
  EmpProfile,
} from "../common/icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import "./index.css";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useGetCompanyByNameQuery } from "@/store/services/Organization.service";
import { useGetProfileByNameQuery } from "@/store/services/employee/Profile.service";
import { useCheckOutMutation } from "@/store/services/Dashboard.service";
import { toast } from "react-toastify";

const adminItems = [
  { icon: <ComputerIcon />, label: "Dashboard", path: "/dashboard" },
  {
    icon: <SolidUserPlusIcon />,
    label: "User Management",
    path: "/user-management",
  },
  {
    icon: <HistoryToggleIcon />,
    label: "Holiday Management",
    path: "/holiday-management",
  },
  {
    icon: <CalendarNumberIcon />,
    label: "Leave Management",
    path: "/leave-management",
  },
  { icon: <ProjectSymlinkIcon />, label: "Projects", path: "/projects" },
  { icon: <UsersIcon />, label: "Team Management", path: "/team-management" },
  { icon: <HourGlassIcon />, label: "Employee Log", path: "/user-log" },
  {
    icon: <WalletIcon />,
    label: "Salary Management",
    path: "/salary-management",
  },
  { icon: <PersonWorkspaceIcon />, label: "Toggle logs", path: "/toggle-log" },
  {
    icon: <CalendarUserIcon />,
    label: "Attendance Management",
    path: "/attendance-management",
  },
  {
    icon: <GraphIcon />,
    label: "Organization Details",
    path: "/organization-details",
  },
];

const userItmes = [
  { icon: <ComputerIcon />, label: "Dashboard", path: "/emp-dashboard" },
  {
    icon: <CalendarNumberIcon />,
    label: "Leave Management",
    path: "/emp-leave",
  },
  { icon: <UsersIcon />, label: "Team Management", path: "/emp-team" },
  { icon: <HourGlassIcon />, label: "Time Logs", path: "/emp-log" },
  { icon: <WalletIcon />, label: "Salary Management", path: "/emp-salary" },
  { icon: <PersonWorkspaceIcon />, label: "Toggle logs", path: "/emp-toggle" },
  {
    icon: <CalendarUserIcon />,
    label: "Attendance Management",
    path: "/emp-attendance",
  },
  { icon: <EmpProfile />, label: "Profile", path: "/emp-profile" },
];

const DrawerLayout = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { data: getCmpData, isLoading } = useGetCompanyByNameQuery("");
  const { data: getEmpData } = useGetProfileByNameQuery("");
  const [checkout] = useCheckOutMutation();
  const checkUserRole = useMemo(() => {
    const decodedToken: any = jwtDecode(sessionStorage.getItem("token") ?? "");
    return decodedToken?.role ?? "";
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <section className="w-1/6 mr-5 hidden lg:block relative">
      <div className="fixed top-0 py-8 h-full">
        {/* <div className="h-[100%]  py-8"> */}
        <aside className="w-[100%]   h-full sticky p-4 slider text-lg bg-white rounded-3xl overflow-auto shadow-2xl max-h-screen">
          <nav className="flex justify-center items-center">
            {isLoading ? (
              "Loading"
            ) : (
              <img
                src={
                  checkUserRole === "Company"
                    ? getCmpData?.data?.logo
                    : getEmpData?.data?.company?.logo
                }
                // alt="Default"
                className="h-40 rounded-full w-40 border"
              />
            )}
          </nav>
          <hr className="h-[1px] mx-2 my-3 bg-gray-500 border-0 rounded dark:bg-gray-400" />
          <div className="flex flex-col gap-5 pb-4  ">
            {checkUserRole === "Company" &&
              adminItems.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 ease-in-out p-px hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  {item.icon}
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}
            {checkUserRole === "Employee" &&
              userItmes.map((item) => (
                <div
                  className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72]  transition duration-500 ease-in-out p-px hover:transform hover:scale-105 hover:shadow-lg cursor-pointer"
                  key={item.label}
                >
                  {item.icon}
                  <span onClick={() => navigate(item.path)}>
                    {item.label}
                  </span>
                </div>
              ))}
            {checkUserRole === "Company" && (
              <div className="pl-3 drawerIcon rounded hover:bg-[#d8cfea] hover:text-[#422b72] transition duration-500 ease-in-out p-px hover:transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <Collapsible>
                  <CollapsibleTrigger
                    onClick={handleToggleCollapse}
                    className="flex justify-center items-center gap-2 pb-1"
                  >
                    {isCollapsed ? (
                      <IoMdArrowDropdown />
                    ) : (
                      <IoMdArrowDropup />
                    )}
                    Additional
                  </CollapsibleTrigger>
                  {/* <hr className="h-[1px] mx-3  bg-gray-600  rounded dark:bg-gray-400" /> */}

                  <CollapsibleContent className="text-sm pl-3 flex items-center gap-3">
                    &nbsp; &nbsp;&nbsp;
                    <MikeForNotice />{" "}
                    <span
                      className="text-base"
                      onClick={() => navigate("/notice")}
                    >
                      Notice
                    </span>
                  </CollapsibleContent>
                  <CollapsibleContent className="text-sm pl-3 flex items-center gap-3">
                    &nbsp; &nbsp;&nbsp;
                    <DepartDesigICon />
                    <span
                      className="text-base"
                      onClick={() => navigate("/depart-desig")}
                    >
                      Depart-desig
                    </span>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
          </div>
          <hr className="h-[1px] mx-2 my-3 bg-gray-500 border-0 rounded dark:bg-gray-400" />
          <div className="flex pl-3 gap-2 items-center">
            <div>
              <Logout />
            </div>
            <div
              onClick={() => {
                sessionStorage.removeItem("token");
                navigate("/login");
              }}
            >
              logout
            </div>
          </div>
        </aside>
        {/* </div> */}
      </div>
    </section>
  );
};

export default DrawerLayout;
