import DrawerLayout from "@/layout/DrawerLayout";
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const LoggedInLayout = ({ Children: ReactComponent }: any) => {
    return (
        <div className="flex gap-5 p-5">
            {/* <div className="right-0 top-0 fixed p-4 bg-[#422b72]">
                <div className="flex">
                    <div className="text-xl pr-1 pt-1 text-black self-center">
                        <FaUserCircle />
                    </div>
                    <span className="text-black self-center">SignIn</span>
                    <div className="text-xl pl-5 pt-1 text-black self-center">
                        <IoSettings />
                    </div>
                </div>
            </div> */}
            <DrawerLayout />
            <ReactComponent />
        </div>
    );
};

export default LoggedInLayout;
