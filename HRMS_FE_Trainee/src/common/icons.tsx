import { FaPencilAlt } from "react-icons/fa";
import { LucidePlusCircle } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import { RiComputerLine } from "react-icons/ri";
import { TbHistoryToggle } from "react-icons/tb";
import { ImHourGlass } from "react-icons/im";
import { TfiWallet } from "react-icons/tfi";
import { GoProjectSymlink } from "react-icons/go";
import { BsPersonWorkspace } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { TbCalendarUser } from "react-icons/tb";
import { IoCalendarNumber } from "react-icons/io5";
import { BiSolidUserPlus } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { BiSolidUserCheck } from "react-icons/bi";
import { FaUserLargeSlash } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { FaMugHot } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

// import { IoMdArrowDropdown } from "react-icons/io";
// import { IoMdArrowDropup } from "react-icons/io";
import { AiFillNotification } from "react-icons/ai";
import { FaUsersGear } from "react-icons/fa6";
import { FaHourglassEnd } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { FaBellSlash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { IoCamera } from "react-icons/io5";
import { MdTimer } from "react-icons/md";
import { GiSandsOfTime } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { MdNoFood } from "react-icons/md";
import { BsCheck2Square } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import { BiSolidUserX } from "react-icons/bi";


export const PencilIcon = ({ ...props }) => (
  <FaPencilAlt {...props} className={`text-[#008000] ${props.className} `} />
);
export const PlusCircleIcon = ({ ...props }) => (
  <LucidePlusCircle className={`text-[#422b72] ${props.className}`} size={50} />
);
export const DeleteIcon = ({ ...props }) => (
  <MdDelete className={` text-2xl text-[24px] ${props.className}`} />
);
export const EyeIcon = ({ ...props }) => (
  <IoEyeSharp className={`text-blue-700 ${props.className}`} />
);
export const CloseIcon = ({ ...props }) => (
  <CgClose className={`${props.className}`} />
);
export const FaMugHotIcon = ({ ...props }) => (
  <FaMugHot className={`${props.className}`} />
);
export const FaHourglassEndIcon = ({ ...props }) => (
  <FaHourglassEnd className={`${props.className}`} />
);
export const AiOutlineCheckIcon = ({ ...props }) => (
  <AiOutlineCheck className={`${props.className}`} />
);
export const FaBellSlashIcon = ({ ...props }) => (
  <FaBellSlash className={`${props.className}`} />
);
export const BsThreeDotsVerticalIcon = ({ ...props }) => (
  <BsThreeDotsVertical className={`${props.className}`} />
);
export const GoDotFillIcon = ({ ...props }) => (
  <GoDotFill className={`${props.className}`} />
);
export const ComputerIcon = ({ ...props }) => (
  <RiComputerLine className={`${props.className}`} />
);
export const HistoryToggleIcon = ({ ...props }) => (
  <TbHistoryToggle className={`${props.className}`} />
);
export const HourGlassIcon = ({ ...props }) => (
  <ImHourGlass className={`${props.className}`} />
);
export const WalletIcon = ({ ...props }) => (
  <TfiWallet className={`${props.className}`} />
);
export const ProjectSymlinkIcon = ({ ...props }) => (
  <GoProjectSymlink className={`${props.className}`} />
);
export const PersonWorkspaceIcon = ({ ...props }) => (
  <BsPersonWorkspace className={`${props.className}`} />
);
export const GraphIcon = ({ ...props }) => (
  <VscGraph className={`${props.className}`} />
);
export const CalendarUserIcon = ({ ...props }) => (
  <TbCalendarUser className={`${props.className}`} />
);
export const CalendarNumberIcon = ({ ...props }) => (
  <IoCalendarNumber className={`${props.className}`} />
);
export const SolidUserPlusIcon = ({ ...props }) => (
  <BiSolidUserPlus className={`${props.className}`} />
);
export const UsersIcon = ({ ...props }) => (
  <FaUsers className={`${props.className}`} />
);
export const UsersCheckIcon = ({ ...props }) => (
  <BiSolidUserCheck className={`${props.className}`} />
);
export const AbsentIcon = ({ ...props }) => (
  <FaUserLargeSlash className={`${props.className}`} />
);
export const MikeForNotice = ({ ...props }) => (
  <AiFillNotification className={`${props.className}`} />
);
export const DepartDesigICon = ({ ...props }) => (
  <FaUsersGear className={`${props.className}`} />
);
export const Logout = ({ ...props }) => (
  <AiOutlineLogout className={`${props.className}`} />
);
export const EmpProfile = ({ ...props }) => (
  <ImProfile className={`${props.className}`} />
);
export const Camera = ({ ...props }) => (
  <IoCamera className={`${props.className}`} />
);
export const Watch = ({ ...props }) => (
  <MdTimer className={`${props.className}`} />
);
export const SandOfTime = ({ ...props }) => (
  <GiSandsOfTime className={`${props.className}`} />
);
export const BreakIn = ({ ...props }) => (
  <MdFastfood className={`${props.className}`} />
);
export const BreakOut = ({ ...props }) => (
  <MdNoFood className={`${props.className}`} />
);
export const CheckOut = ({ ...props }) => (
  <BsBoxArrowRight className={`${props.className}`} />
);
export const CheckIn = ({ ...props }) => (
  <BsCheck2Square
    className={`${props.className}`} />
);
export const Absent = ({ ...props }) => (
  <BiSolidUserX 
    className={`${props.className}`} />
);
export const AioutlineMenu = ({ ...props }) => (
  <AiOutlineMenu 
    className={`${props.className}`} />
);


// export const IoMdArrowDropup = ({ ...props }) => <IoMdArrowDropup className={`${props.className}`} />;
// export const IoMdArrowDropdown = ({ ...props }) => <IoMdArrowDropdown className={`${props.className}`} />;
