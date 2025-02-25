import React, { useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import { Button } from "@/components/ui/button";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Absent from "@/assets/vacation.png";
import Holiday from "@/assets/holidays.png";
import Present from "@/assets/calendar (5).png";
import { ProfilePopUp } from "./AttendanceUtils";
import {
  useGetCmpEmpAttendanceQuery,
  useGetEmpByNameQuery,
} from "@/store/services/Attendance.service";
import Loading from "@/common/Loading";
import emptyProfile from "../../assets/empty-profile.png";
import "./index.css";

const Attendance = () => {
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { data: EmpData, isLoading } = useGetEmpByNameQuery(searchInput);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const i = selectedEmployee?.id;
  const { data: EmpAttendance } = useGetCmpEmpAttendanceQuery(i);
  const oneDayAgo = new Date();
oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  let events = [];
  let presentCount = 0;
  let absentCount = 0;
  let holidayCount = 0;
  if (EmpAttendance && EmpAttendance?.data) {
    events = EmpAttendance?.data
      .map((item, i) => {
        const eventDate = new Date(item.date);
        const eventType = item.type;
        if (
          (eventType === "Holiday" && eventDate >= new Date()) ||
          eventDate < oneDayAgo
        ) {
          return {
            date: eventDate,
            type: item?.type,
          };
        }
        return null;
      })
      .filter((event) => event !== null);
    presentCount = events.filter((event) => event.type === "Present").length;
    absentCount = events.filter((event) => event.type === "Absent").length;
    holidayCount = events.filter((event) => event.type === "Holiday").length;
  }
  return (
    <>
      <ProfilePopUp modal={modal} setModal={setModal} />

      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="emp-atten">
            <div className="flex justify-end mb-5">
              <input
                type="text"
                placeholder="Search employees"
                className="flex h-10 w-72 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-[#422b72] text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div
              className="overflow-x-auto"
              style={{
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              <div className=" flex sm:grid-cols-2 lg:grid-cols-3 gap-6 md:grid-cols-2 mb-11">
                {EmpData &&
                  EmpData.data
                    .filter((res) =>
                      `${res.firstName} ${res.lastName}`
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    )
                    .sort((a, b) => {
                      const aMatch = `${a.firstName} ${a.lastName}`
                        .toLowerCase()
                        .indexOf(searchInput.toLowerCase());
                      const bMatch = `${b.firstName} ${b.lastName}`
                        .toLowerCase()
                        .indexOf(searchInput.toLowerCase());
                      return aMatch - bMatch;
                    })
                    .map((res, i) => (
                      <div
                      key={i}
                      className={`bg-white rounded-3xl flex flex-col items-center  shadow-md w-[280px] h-[300px] py-7 px-12  ${
                        selectedEmployee?.id === res.id ? "bg-[#eeeeee]" : ""
                      }`}
                    >
                      <div className="w-28 h-28 mx-9 flex items-center justify-center bg-black rounded-full">
                        <img
                          src={res.profilePic || emptyProfile}
                          alt=""
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                      <h1 className="text-[#422b72] font-bold text-[21px] mt-3">
                        {res?.firstName + " " + res?.lastName}
                      </h1>
                      <h3 className="pt-2 font-semibold">
                        {res?.designation.name}
                      </h3>
                      <div className="flex justify-end">
                        <Button
                          className={`mt-4 rounded-full border border-[#484c7f] w-36  ${selectedEmployee?.id === res.id ? "bg-[#422b72] text-white":""}`}
                          variant="outline"
                          onClick={() => {
                            setSelectedEmployee(res);
                          }}
                        >
                          View Present
                        </Button>
                      </div>
                    </div>
                    ))}
              </div>
            </div>

            {selectedEmployee && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                <div className="col-span-2 rounded-3xl shadow-xl bg-white overflow-hidden">
                  <div className="p-10 ">
                    <FullCalendar
                      plugins={[dayGridPlugin]}
                      initialView="dayGridMonth"
                      events={events}
                      height="600px"
                      navLinks={true}
                      eventContent={(arg) => {
                        let bgColor = "";
                        let iconSrc = "";
                        switch (arg.event.extendedProps.type) {
                          case "Present":
                            bgColor = "bg-[#008000]";
                            iconSrc = Present;
                            break;
                          case "Holiday":
                            bgColor = "bg-[#2a90f0]";
                            iconSrc = Holiday;
                            break;
                          case "Absent":
                            bgColor = "bg-[#ff0000]";
                            iconSrc = Absent;
                            break;
                          default:
                            bgColor = "bg-gray-500"; 
                            break;
                        }
                        return (
                          <>
                            <div
                              className={`flex rounded-full  border-0  ${bgColor}`}
                            >
                              <div className="h-9 w-9  flex items-center justify-center text-white">
                                {iconSrc && (
                                  <img
                                    className="h-5 text-white"
                                    src={iconSrc}
                                    alt=""
                                  />
                                )}
                              </div>
                            </div>
                          </>
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6 basis-2/6  ">
                  <div className="bg-white rounded-3xl p-6 shadow-xl h-32 ">
                    <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-full bg-[#ff0000] flex items-center justify-center">
                        <img className="h-8 " src={Absent} alt="" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold text-[#344767]">
                          Total Absent days :
                        </h1>
                        <p className="text-3xl font-bold text-[#ff0000]">
                          {absentCount}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-xl h-32">
                    <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-full bg-[#2a90f0] flex items-center justify-center">
                        <img className="h-8" src={Holiday} alt="" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold text-[#344767]">
                          Total Holidays:
                        </h1>
                        <p className="text-3xl font-bold text-[#2a90f0]">
                          {holidayCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 shadow-xl h-32">
                    <div className="flex items-center gap-5">
                      <div className="h-16 w-16 rounded-full bg-[#008000] flex items-center justify-center">
                        <img className="h-8" src={Present} alt="" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-semibold text-[#344767]">
                          Total Attendance:
                        </h1>
                        <p className="text-3xl font-bold text-[#008000]">
                          {presentCount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              
            )}
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default Attendance;




                        

