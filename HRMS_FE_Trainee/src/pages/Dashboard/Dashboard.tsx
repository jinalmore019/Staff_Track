import "./index.css";
import InnerLayout from "@/layout/InnerLayout";
import React, { useEffect, useState } from "react";
import "./index.css";
import { UsersCheckIcon, AbsentIcon, ProjectSymlinkIcon } from "@/common/icons";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  useGetBoxDataQuery,
  useGetNoticeByNameQuery,
} from "@/store/services/Dashboard.service";
import Loading from "@/common/Loading";
import { useGetHolidayByNameQuery } from "@/store/services/Holiday.service";

const Dashboard = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentDateNotices, setCurrentDateNotices] = useState([]);
  const { data: notice } = useGetNoticeByNameQuery("");
  const { data: boxData, isLoading, refetch: BoxData } = useGetBoxDataQuery("");
  const { data: holiday } = useGetHolidayByNameQuery("");

  let events = [];
  if (holiday && holiday.data) {
    events = holiday.data.map((item, i) => {
      const endDate = new Date(item.endDate);
      endDate.setDate(endDate.getDate() - 1);
      return {
        title: item.title,
        start: new Date(item.startDate),
        end: endDate,
        color: "green",
        display: "background-green",
      };
    });
  }
  // useEffect(() => {}, []);
  useEffect(() => {
    if (notice) {
      const currentDate = new Date().toDateString();
      const noticesForCurrentDate = notice.data.filter(
        (item) => new Date(item.date).toDateString() === currentDate
      );
      setCurrentDateNotices(noticesForCurrentDate);
    }
    BoxData();
  }, [notice]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const noticesToDisplay = showAll ? notice?.data : currentDateNotices;

  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6">
              <div className="bg-white rounded-xl flex items-center">
                <div className="box flex p-4 justify-between items-center w-full">
                  <div>
                    <p className="text-2xl">Present Employees</p>
                    {boxData && <span>{boxData.numberOfPresentEmp}</span>}
                  </div>
                  <div className="text-5xl">
                    <div className="w-20 h-20 rounded-[50%] flex justify-center text-5xl py-3 pl-3 align-center bg-[#dc2f02]">
                      <UsersCheckIcon className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" bg-white rounded-xl flex items-center">
                <div className="box flex p-4 justify-between items-center w-full">
                  <div>
                    <p className="text-2xl">Absent Employees</p>
                    {boxData && <span>{boxData.numberOfAbsentEmp}</span>}
                  </div>
                  <div className="text-5xl">
                    <div className="w-20 h-20 rounded-[50%] flex justify-center text-4xl py-4 px-4 align-center bg-[#ee9b00]">
                      <AbsentIcon className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" bg-white rounded-xl flex items-center">
                <div className="box flex p-4 justify-between items-center w-full">
                  <div>
                    <p className="text-2xl">Projects</p>
                    {boxData && <span>{boxData.numberOfProjects}</span>}
                  </div>
                  <div className="text-5xl">
                    <div className="w-20 h-20 rounded-[50%] flex justify-center text-4xl px-4 py-4 align-center bg-[#3f530b]">
                      <ProjectSymlinkIcon className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6">
              <div className="gap-3 lg:col-span-2 md:col-span-2 w-full">
                <div className="basis-9/12     rounded-3xl shadow-xl bg-white overflow-hidden">
                  <div className="p-10 ">
                    <FullCalendar
                      plugins={[dayGridPlugin]}
                      initialView="dayGridMonth"
                      events={events}
                      height="500px"
                    />
                  </div>
                </div>
              </div>
              <div className=" bg-white text-black max-w-full rounded-xl shadow-2xl">
                <div className="m-4 flex">
                  <span className="text-2xl text-[#422b72] font-bold">
                    Notice Board
                  </span>
                </div>
                <hr className="h-[1px] my-3 mx-auto w-[90%] bg-slate-400 border-0" />
                <div className="overflow-hidden max-h-[450px] overflow-y-auto mb-3">
                  {noticesToDisplay &&
                    noticesToDisplay.map((item, i) => (
                      <div className="content shadow-md m-2 p-2" key={i}>
                        <h2 className="text-lg text-[#422b72] font-bold">
                          {item.title}
                        </h2>
                        <p>{item.description}</p>
                      </div>
                    ))}
                </div>
                <div className="flex justify-end mr-5">
                  <button
                    className="bg-[#422b72] text-white p-1 px-2 rounded"
                    onClick={toggleShowAll}
                  >
                    {showAll ? "Show Current Date Only" : "Show All"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
};
export default Dashboard;
