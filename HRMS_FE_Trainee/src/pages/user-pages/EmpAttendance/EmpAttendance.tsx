import React from "react";
import InnerLayout from "@/layout/InnerLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Absent from "@/assets/vacation.png";
import Holiday from "@/assets/holidays.png";
import Present from "@/assets/calendar (5).png";
import { useGetEmpAttendanceQuery } from "@/store/services/Attendance.service";
import Loading from "@/common/Loading";
import "./index.css";

const Attendance = () => {
  const { data: AttendanceData, isLoading } = useGetEmpAttendanceQuery("");
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  let events = [];
  let presentCount = 0;
  let absentCount = 0;
  let holidayCount = 0;
  if (AttendanceData && AttendanceData?.data) {
    events = AttendanceData?.data
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
  console.log(AttendanceData?.data, "AttendanceData");

  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="mt-4 emp-atten">
            <div className="flex gap-9">
              <div className="basis-2/3 rounded-3xl shadow-xl bg-white overflow-hidden">
                <div className="p-10 ">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="600px"
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
                            className={`flex rounded-full border-0 ${bgColor}`}
                          >
                            <div
                              className="h-9 w-9 flex items-center justify-center text-white"
                              style={{ backgroundColor: "transparent" }}
                            >
                              {iconSrc && (
                                <img
                                  className="h-5 text-white no-pointer-events"
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

              <div className="flex flex-col gap-6 basis-2/6">
                <div className="bg-white rounded-3xl p-6 shadow-xl h-32">
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
          </div>
        )}
      </InnerLayout>
    </>
  );
};

export default Attendance;
