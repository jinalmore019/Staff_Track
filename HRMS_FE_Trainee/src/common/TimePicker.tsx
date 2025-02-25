import { useEffect, useState } from "react";
import { Divider, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Popover from "@mui/material/Popover";
import moment from "moment";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { checkTimeValidity, dateFormateForUpdateTime } from "./toggleUtils";
import { editOneToggleData } from "../../store/toggle/toggleAction";
import { useDispatch } from "react-redux";

function isToday(dateString) {
  const date = moment(dateString, "ddd MMM DD YYYY HH:mm:ss Z");
  const today = moment().startOf("day");
  return date.isSame(today, "day");
}
const dateHourFormate = (date) => {
  const dateFormat = new Date(date).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return dateFormat;
};

const TimePickerComponent = ({
  isBlur = false,
  entriesData,
  dateShow = false,
  onChange,
  isEdit,
}: any) => {
  const dispatch = useDispatch();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [timeDate, setTimeDate] = useState({
    date: entriesData?.startTime || new Date(),
    startTime: entriesData?.startTime || new Date(),
    endTime: entriesData?.endTime || new Date(),
    id: entriesData?._id || "",
  });

  useEffect(() => {
    if (entriesData) {
      setTimeDate({
        date: entriesData?.startTime,
        startTime: entriesData?.startTime,
        endTime: entriesData?.endTime,
        id: entriesData?._id,
      });
    }
  }, [entriesData]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isTimeValid, setIsTimeValid] = useState(true);

  const openModal = (e) => {
    if (isEdit) {
      setPickerVisible(true);
    }
    setAnchorEl(e.currentTarget);
  };

  const fmtStartTime = moment(new Date(timeDate?.startTime)).format("HH:mm");
  const fmtEndTime = moment(new Date(timeDate?.endTime)).format("HH:mm");

  const handleChange = (e) => {
    const { value, name } = e.target;
    const rawDate = moment(timeDate?.date);
    const TimeParse = value ? moment(value, "HH:mm A") : moment();
    rawDate.set({ hour: TimeParse.hours(), minute: TimeParse.minutes() });

    setTimeDate((prev) => ({
      ...prev,
      [name]: rawDate.toDate(),
    }));
  };

  const onTimeBlur = () => {
    const checkDateValid = checkTimeValidity(
      new Date(timeDate?.startTime)?.toString(),
      new Date(timeDate?.endTime)?.toString()
    );
    if (checkDateValid) {
      setIsTimeValid(false);
    } else {
      setIsTimeValid(true);
    }
  };

  const closeModal = () => {
    const checkDateValid = checkTimeValidity(
      timeDate?.startTime?.toString(),
      timeDate?.endTime?.toString()
    );
    const finalDate = dateFormateForUpdateTime(
      timeDate?.date,
      timeDate?.startTime,
      timeDate?.endTime
    );
    if (checkDateValid) {
      setIsTimeValid(false);
    } else {
      const postData = {
        startTime: new Date(finalDate?.newStartDate),
        endTime: new Date(finalDate?.newEndDate),
      };
      if (isBlur) {
        dispatch(editOneToggleData(postData, timeDate?.id));
      } else {
        onChange({ ...postData, date: timeDate?.date });
      }
      setPickerVisible(false);
      setAnchorEl(null);
    }
  };
  return (
    <div>
      <div className="time-picker-main" onClick={openModal}>
        <div>{dateShow ? moment(timeDate?.date).format("DD/MM") : null}</div>
        <div>{dateHourFormate(timeDate?.startTime) || ""}</div>
        <div>{dateHourFormate(timeDate?.endTime) || ""}</div>
      </div>

      {/* {pickerVisible && (
        <Popover
          open={pickerVisible}
          anchorEl={anchorEl}
          onClose={closeModal}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        > */}
      <div className="time-picker-inner">
        <div className="popover-main">
          <div>
            <label htmlFor="startTime" className="time-label">
              START
            </label>
            <div className="cover-time-picker">
              <input
                type="time"
                value={fmtStartTime}
                onChange={handleChange}
                onBlur={onTimeBlur}
                name="startTime"
                className="time-picker"
                style={{
                  width: isToday(timeDate?.date) ? "150px" : "130px",
                }}
                id="startTime"
              />
              <span className="date-picker">
                {isToday(timeDate?.date)
                  ? "Today"
                  : moment(timeDate?.date).format("DD/MM")}
              </span>
            </div>
          </div>
          <div className="time-input-arrow">
            <SyncAltIcon fontSize="small" />
          </div>
          <div>
            <label htmlFor="endTime" className="time-label">
              END
            </label>
            <div>
              <input
                type="time"
                value={fmtEndTime}
                onChange={handleChange}
                name="endTime"
                className="time-picker"
                id="endTime"
                onBlur={onTimeBlur}
                style={{
                  borderColor: !isTimeValid ? "red" : "",
                }}
              />
            </div>
          </div>
        </div>
        <Divider className="time-divider" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            className="staticDatePicker"
            displayStaticWrapperAs="desktop"
            value={timeDate?.date}
            onChange={(e: any) => {
              setTimeDate((prev) => ({ ...prev, date: e.toDate() }));
            }}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
          />
        </LocalizationProvider>
      </div>
      {/* </Popover> */}
      {/* )} */}
    </div>
  );
};

//   {timeData && (
//                   <TimePickerComponent
//                     isBlur={false}
//                     dateShow={true}
//                     isEdit={true}
//                     entriesData={{
//                       date: timeData?.date || new Date(),
//                       startTime: timeData?.startTime || new Date(),
//                       endTime: timeData?.endTime || new Date(),
//                     }}
//                     onChange={(data) => setTimeData(data)}
//                   />
//                 )}

export default TimePickerComponent;
