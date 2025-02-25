import { useState, useEffect } from "react";
import InnerLayout from "@/layout/InnerLayout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FaMugHot } from "react-icons/fa6";
import {
  useCheckOutMutation,
  useGetBreakingTimeQuery,
  useGetNoticeByNameQuery,
  useGetreportingTimeQuery,
  useStartTimeMutation,
  useStopTimeMutation,
} from "@/store/services/Dashboard.service";
import {
  BreakIn,
  BreakOut,
  CheckOut,
  CheckIn,
} from "@/common/icons";
import Tooltips from "@/common/Tooltips";
import Loading from "@/common/Loading";
import { useGetHolidayByNameQuery } from "@/store/services/Holiday.service";
import { toast } from "react-toastify";
import { Hourglass } from "react-loader-spinner";
import { FaHourglassEnd } from "react-icons/fa6";

const UserDashboard = () => {
  const { data: notice, isLoading } = useGetNoticeByNameQuery("");
  const { data: holiday } = useGetHolidayByNameQuery("");
  const [showAll, setShowAll] = useState(false);
  const [currentDateNotices, setCurrentDateNotices] = useState([]);

  let events = [];
  if (holiday && holiday.data) {
    events = holiday.data.map((item, i) => {
      const endDate = new Date(item.endDate);
      endDate.setDate(endDate.getDate() - 1);
      return {
        title: item.title,
        start: new Date(item.startDate),
        end: endDate,
        display: "background-green",
        color: "green",
      };
    });
  }

  // const formatTime = (milliseconds) => {
  //   const totalSeconds = Math.floor(milliseconds / 1000);
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;

  //   return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  // };

  // const pad = (num) => {
  //   return num < 10 ? "0" + num : num;
  // };

  useEffect(() => {
    if (notice) {
      const currentDate = new Date().toDateString();
      const noticesForCurrentDate = notice.data.filter(
        (item) => new Date(item.date).toDateString() === currentDate
      );
      setCurrentDateNotices(noticesForCurrentDate);
    }
  }, [notice]);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const noticesToDisplay = showAll ? notice?.data : currentDateNotices;

  //reporting time -------------------------------------------------------------------------
  ///:TODO after this line code not change
  const { data: ReportingApiData, refetch: reportingRepoting } =
    useGetreportingTimeQuery({});
  const { data: BreakingApiData, refetch: breakingRepoting } =
    useGetBreakingTimeQuery({});

  const [startTimeApi] = useStartTimeMutation();

  const [checkOutApi] = useCheckOutMutation();

  const [stopTimeApi] = useStopTimeMutation();

  const [timeRunning, setTimeRunning] = useState<boolean>(false);
  const [totoalSeconds, setTotalSeconds] = useState<number>(0);
  const [isLogout, setIsLogout] = useState<boolean>(false);

  useEffect(() => {
    setTimeRunning(ReportingApiData?.data?.isTotalTimeRunning);
    setTotalSeconds(ReportingApiData?.data?.totalReportingTime);
    setIsLogout(ReportingApiData?.data?.isLogout);
    const intervalId = setInterval(() => {
      if (ReportingApiData?.data?.isTotalTimeRunning) {
        setTotalSeconds((prevTotalSeconds) => (prevTotalSeconds ?? 0) + 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [ReportingApiData, timeRunning]);

  const [breakingRunning, setBreakingRunning] = useState<boolean>(false);
  const [totalBreakingSeconds, setTotalBreakingSeconds] = useState<number>(0);


  useEffect(() => {
    setBreakingRunning(BreakingApiData?.data?.isBreakingTimeRunning);
    setTotalBreakingSeconds(BreakingApiData?.data?.totalBreakingTime);
    const intervalId = setInterval(() => {
      if (BreakingApiData?.data?.isBreakingTimeRunning) {
        setTotalBreakingSeconds((pre) => (pre ?? 0) + 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [BreakingApiData, breakingRunning]);

  useEffect(() => {
    reportingRepoting();
    breakingRepoting();
    breakingRepoting();
  }, []);

  const handleCheckIn = async () => {
    const result: any = await startTimeApi({});
    const { message, statusCode, success } = result?.data;
    if (statusCode === 201 && success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleCheckOut = async () => {
    const breakTime = {
      totalBreakTime: totalBreakingSeconds,
    };
    const result = await checkOutApi(breakTime);
    console.log(result, "result");
    const { message, statusCode, success } = result?.data;
    if (statusCode === 201 && success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleStopTime = async () => {
    const result = await stopTimeApi({});
    const { message, statusCode, success } = result?.data;
    if (statusCode === 200 && success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  function formatSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
  }

  return (
    <InnerLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="font-semibold text-white text-xl">
            Welcome, Hello Good morning
          </h1>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 ">
            <div className="bg-white rounded-xl h-24  w-full flex items-center mt-2 order-2 lg:order-1 md:order-1 sm:order-1">
              <div className="box flex p-4 justify-between items-center w-full">
                <div className="">
                  <p className="text-sm ">Today's Time Active</p>
                  <span className="font-bold text-xl text-blue-800">
                    <p>{formatSeconds(totoalSeconds || 0)}</p>
                  </span>
                </div>
                <div className=" text-5xl  ">
                  <div className=" block">
                    <div className="w-16 h-16 rounded-[50%] flex justify-center text-5xl p-1 px-2 bg-[#dc2f02] icon-small items-center">
                      {timeRunning ? (
                        <Hourglass
                          visible={true}
                          ariaLabel="hourglass-loading"
                          wrapperClass="w-9 h-9"
                          colors={["#FFFFFF", "#FFFFFF"]}
                        />
                      ) : (
                        <FaHourglassEnd className="text-white h-9 w-9" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl h-24 flex items-center w-full  mt-2 order-3 lg:order-3 md:order-2 sm:order-2">
              <div className="box flex p-4 justify-between items-center w-full">
                <div className="">
                  <p className="text-sm ">Today's Break Time</p>
                  <span className="font-bold text-xl text-red-800">
                    {formatSeconds(totalBreakingSeconds) || ""}
                  </span>
                </div>
                <div className=" text-5xl  ">
                  <div className="w-16 h-16 rounded-full flex justify-center text-5xl p-1 px-2  items-center bg-[#dc2f02]">
                    <FaMugHot className="text-white h-9 w-9" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end w-full relative col-span-0 lg:col-span-2 md:col-span-2 order-1 lg:order-3 md:order-3 sm:order-3">
              {!isLogout && (
                <div className="flex items-end text-white">
                  {(totoalSeconds ?? 0) > 0 && (
                    <button className="p-1">
                      {!timeRunning ? (
                        <div onClick={handleCheckIn}>
                          <Tooltips title={"Break Out "}>
                            <BreakOut className="w-14 h-14 pr-4" />
                          </Tooltips>
                        </div>
                      ) : (
                        <div onClick={handleStopTime}>
                          <Tooltips title={"Break In"}>
                            <BreakIn className="w-14 h-14 pr-4" />
                          </Tooltips>
                        </div>
                      )}
                    </button>
                  )}

                  {timeRunning || (totoalSeconds ?? 0) > 0 ? (
                    <button onClick={handleCheckOut} >
                      <Tooltips title={"Check Out"}>
                        <CheckOut className="w-14 h-14 pr-4" />
                      </Tooltips>
                    </button>
                  ) : (
                    <button onClick={handleCheckIn} >
                      <Tooltips title={"Check In"}>
                        <CheckIn className="w-14 h-14 pr-4" />
                      </Tooltips>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row md:flex-col  gap-3 py-3">
            <div className="basis-9/12 rounded-3xl shadow-xl bg-white overflow-hidden">
              <div className="p-4 lg:p-10">
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  height="500px"
                />
              </div>
            </div>
            <div className="bg-white text-black basis-4/12 max-w-full rounded-xl  shadow-2xl">
              <div className="m-4  flex">
                <span className="text-2xl  text-[#422b72] font-bold">
                  Notice Board
                </span>
              </div>
              <hr className="h-[1px] my-3 mx-auto w-[90%] bg-slate-400 border-0"></hr>
              <div className="overflow-hidden">
                <div className="max-h-[450px] overflow-y-auto mb-3">
                  {noticesToDisplay &&
                    noticesToDisplay.map((item, i) => (
                      <div className="flex-1 content shadow-md m-2 p-2" key={i}>
                        <h2 className="text-lg text-[#422b72] font-bold">
                          {item.title}
                        </h2>
                        <p>{item.description}</p>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex justify-end mr-2 ">
                <button
                  className="bg-[#422B72] text-white p-1 px-2 rounded"
                  onClick={toggleShowAll}
                >
                  {showAll ? "Show Current Date Only" : "Show All"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </InnerLayout>
  );
};

export default UserDashboard;
