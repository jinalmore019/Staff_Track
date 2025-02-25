const ApiError = require("../utils/error");
const UserlogModel = require("../model/userlog_model");
const LeaveModel = require("../model/leave_model");
const mongoose = require("mongoose");
const { COMPANY_ROLE, EMPLOYEE_ROLE } = require("../config/string");
const HolidayModel = require("../model/holiday_model");
const moment = require("moment");
const EmployeeModel = require("../model/employee_model");

async function startTime(req, res, next) {
  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const currentDateWithoutTime = new Date(year, month, day);

    const findLeave = await LeaveModel.findOne({
      empId: req.id,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      status: "approved",
    });

    if (findLeave) {
      return next(new ApiError(400, "Your leave day you cannot start timer"));
    }

    const findHoliday = await HolidayModel.findOne({
      companyId: req.user.company,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    if (findHoliday) {
      return next(
        new ApiError(400, "In Holiday you can not start timer! enjoy holiday")
      );
    }
    const findCurrentDateUserlog = await UserlogModel.findOne({
      date: currentDateWithoutTime,
      empId: req.id,
    });

    if (findCurrentDateUserlog) {
      if (findCurrentDateUserlog.isLogout) {
        return next(new ApiError(400, "After logout you can not start timer"));
      }
      if (
        findCurrentDateUserlog.timeBlock[
          findCurrentDateUserlog.timeBlock.length - 1
        ].endTime !== null
      ) {
        findCurrentDateUserlog.timeBlock.push({
          startTime: currentDate,
          endTime: null,
        });
        await findCurrentDateUserlog.save();
        return res
          .status(201)
          .json({ statusCode: 201, success: true, message: "Time start" });
      }
      return next(new ApiError(400, "First time stop then start time"));
    }
    const checkIn = new UserlogModel({
      empId: req.id,
      date: currentDateWithoutTime,
      timeBlock: [{ startTime: currentDate, endTime: null }],
    });
    await checkIn.save();
    res
      .status(201)
      .json({ statusCode: 201, success: true, message: "Time start" });
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

async function stopTime(req, res, next) {
  try {
    const id = req.id;
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const currentDateWithoutTime = new Date(year, month, day);

    const userlog = await UserlogModel.findOne({
      date: currentDateWithoutTime,
      empId: id,
    });

    if (!userlog) {
      return next(new ApiError(400, "Start timer first"));
    }
    if (userlog.timeBlock[userlog.timeBlock.length - 1].endTime !== null) {
      return next(new ApiError(400, "Start timer first"));
    }
    if (userlog.timeBlock[userlog.timeBlock.length - 1].endTime === null) {
      userlog.timeBlock[userlog.timeBlock.length - 1].endTime = currentDate;
      await userlog.save();
    }
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Time stop",
    });
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

async function reportingTime(req, res, next) {
  try {
    const id = req.id;
    let time = 0;
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const currentDateWithoutTime = new Date(year, month, day);

    const findUserLog = await UserlogModel.findOne({
      date: currentDateWithoutTime,
      empId: id,
    });
    if (findUserLog) {
      for (let i = 0; i < findUserLog.timeBlock.length; i++) {
        time += Math.floor(
          (findUserLog.timeBlock[i].endTime ?? currentDate) -
            findUserLog.timeBlock[i].startTime
        );
      }
      if (
        findUserLog.timeBlock[findUserLog.timeBlock.length - 1].endTime === null
      ) {
        return res.status(200).json({
          statusCode: 200,
          success: true,
          data: {
            isTotalTimeRunning: true,
            totalReportingTime: Math.floor(time / 1000),
            hours: Math.floor(time / 3600000),
            minutes: Math.floor((time / 60000) % 60),
            seconds: Math.floor((time / 1000) % 60),
            isLogout: findUserLog.isLogout,
          },
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          success: true,
          data: {
            isTotalTimeRunning: false,
            totalReportingTime: Math.floor(time / 1000),
            hours: Math.floor(time / 3600000),
            minutes: Math.floor((time / 60000) % 60),
            seconds: Math.floor((time / 1000) % 60),
            isLogout: findUserLog.isLogout,
          },
        });
      }
    } else {
      return res.status(200).json({
        statusCode: 200,
        success: true,
        data: {
          isTotalTimeRunning: false,
          totalReportingTime: Math.floor(time / 1000),
          hours: Math.floor(time / 3600000),
          minutes: Math.floor((time / 60000) % 60),
          seconds: Math.floor((time / 1000) % 60),
          isLogout: false,
        },
      });
    }
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}
async function breakingTime(req, res, next) {
  try {
    const id = req.id;
    let time = 0;
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const currentDateWithoutTime = new Date(year, month, day);

    const findUserLog = await UserlogModel.findOne({
      date: currentDateWithoutTime,
      empId: id,
    });
    if (!findUserLog) {
      return res.status(200).json({
        statusCode: 200,
        success: true,
        data: {
          isBreakingTimeRunning: false,
          totalBreakingTime: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLogout: false,
        },
      });
    }
    for (let i = 0; i < findUserLog.timeBlock.length - 1; i++) {
      time += Math.floor(
        (findUserLog.timeBlock[i + 1].startTime ?? currentDate) -
          findUserLog.timeBlock[i].endTime
      );
    }
    if (findUserLog.isLogout) {
      return res.status(200).json({
        statusCode: 200,
        success: true,
        data: {
          isBreakingTimeRunning: false,
          totalBreakingTime: Math.floor(time / 1000),
          hours: Math.floor(time / 3600000),
          minutes: Math.floor((time / 60000) % 60),
          seconds: Math.floor((time / 1000) % 60),
          isLogout: false,
        },
      });
    }
    if (
      findUserLog.timeBlock[findUserLog.timeBlock.length - 1].endTime == null
    ) {
      return res.status(200).json({
        statusCode: 200,
        success: true,
        data: {
          isBreakingTimeRunning: false,
          totalBreakingTime: Math.floor(time / 1000),
          hours: Math.floor(time / 3600000),
          minutes: Math.floor((time / 60000) % 60),
          seconds: Math.floor((time / 1000) % 60),
          isLogout: false,
        },
      });
    }
    time +=
      currentDate -
      findUserLog.timeBlock[findUserLog.timeBlock.length - 1].endTime;
    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: {
        isBreakingTimeRunning: true,
        totalBreakingTime: Math.floor(time / 1000),
        hours: Math.floor(time / 3600000),
        minutes: Math.floor((time / 60000) % 60),
        seconds: Math.floor((time / 1000) % 60),
        isLogout: false,
      },
    });
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

async function getUserLog(req, res, next) {
  try {
    const empId = req.id;
    const currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;

    if (req.query.year && !isNaN(req.query.year))
      year = parseInt(req.query.year);
    if (req.query.month && !isNaN(req.query.month))
      month = parseInt(req.query.month);

    const data = await UserlogModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$date" }, year] },
              { $eq: [{ $month: "$date" }, month] },
              { $eq: ["$empId", new mongoose.Types.ObjectId(empId)] },
            ],
          },
        },
      },
      {
        $unwind: "$timeBlock",
      },
      {
        $group: {
          _id: "$date",
          totalDuration: {
            $sum: {
              $cond: {
                if: { $eq: ["$timeBlock.endTime", null] },
                then: { $subtract: [new Date(), "$timeBlock.startTime"] },
                else: {
                  $subtract: ["$timeBlock.endTime", "$timeBlock.startTime"],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalDurationInSeconds: {
            $floor: { $divide: ["$totalDuration", 1000] },
          },
          seconds: {
            $floor: { $mod: [{ $divide: ["$totalDuration", 1000] }, 60] },
          },
          minutes: {
            $floor: { $mod: [{ $divide: ["$totalDuration", 60000] }, 60] },
          },
          hours: {
            $floor: { $divide: ["$totalDuration", 3600000] },
          },
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]).exec();
    res.status(200).json({ statusCode: 200, success: true, data: data });
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

async function totalWorkingHours(req, res, next) {
  try {
    const empId = req.id;
    const currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;

    if (req.query.year && !isNaN(req.query.year))
      year = parseInt(req.query.year);
    if (req.query.month && !isNaN(req.query.month))
      month = parseInt(req.query.month);

    const data = await UserlogModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$date" }, year] },
              { $eq: [{ $month: "$date" }, month] },
              { $eq: ["$empId", new mongoose.Types.ObjectId(empId)] },
            ],
          },
        },
      },
      {
        $unwind: "$timeBlock",
      },
      {
        $group: {
          _id: "$date",
          totalDuration: {
            $sum: {
              $cond: {
                if: { $eq: ["$timeBlock.endTime", null] },
                then: { $subtract: [new Date(), "$timeBlock.startTime"] },
                else: {
                  $subtract: ["$timeBlock.endTime", "$timeBlock.startTime"],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalDurationInSeconds: {
            $floor: { $divide: ["$totalDuration", 1000] },
          },
          seconds: {
            $floor: { $mod: [{ $divide: ["$totalDuration", 1000] }, 60] },
          },
          minutes: {
            $floor: { $mod: [{ $divide: ["$totalDuration", 60000] }, 60] },
          },
          hours: {
            $floor: { $divide: ["$totalDuration", 3600000] },
          },
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]).exec();

    let totalSecond = 0;
    for (const e of data) {
      totalSecond += e.totalDurationInSeconds;
    }
    let hours = Math.floor(totalSecond / 3600);
    let minute = Math.floor((totalSecond / 60) % 60);
    res.status(200).json({
      statusCode: 200,
      success: true,
      data: {
        hours,
        minute,
      },
    });
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

async function attendance(req, res, next) {
  try {
    let attendance = [];
    let id;
    let companyId;
    if (req.role === COMPANY_ROLE) {
      id = req.params.id;
      companyId = req.id;
    } else {
      id = req.id;
      companyId = req.user.company;
    }
    const currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    if (req.query.year && !isNaN(req.query.year))
      year = parseInt(req.query.year);
    if (req.query.month && !isNaN(req.query.month))
      month = parseInt(req.query.month) - 1;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const userlogs = await UserlogModel.find({
      isLogout: true,
      empId: id,
      $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
    }).select("date");

    for (let i = 0; i < userlogs.length; i++) {
      attendance.push({ date: userlogs[i].date, type: "Present" });
    }

    const holidays = await HolidayModel.find({
      $and: [
        {
          companyId,
        },
        {
          $or: [
            { startDate: { $gte: startDate, $lte: endDate } },
            { endDate: { $gte: startDate, $lte: endDate } },
            {
              $and: [
                { startDate: { $lte: startDate } },
                { endDate: { $gte: endDate } },
              ],
            },
          ],
        },
      ],
    }).select("startDate endDate");
    const holidayDates = holidays.reduce((dates, holiday) => {
      const datesBetween = getDatesBetween(holiday.startDate, holiday.endDate);
      dates.push(...datesBetween);
      return dates;
    }, []);
    for (let i = 0; i < holidayDates.length; i++) {
      attendance.push({ date: holidayDates[i], type: "Holiday" });
    }
    const dates = attendance.map((e) => e.date);

    const absentDates = [];

    let monthStartDate = moment(startDate);

    while (monthStartDate <= endDate) {
      let formattedStartDate = monthStartDate.format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      );
      if (
        !dates.some((date) => moment(date).isSame(formattedStartDate, "day"))
      ) {
        absentDates.push(monthStartDate.toDate());
      }
      monthStartDate.add(1, "day");
    }

    for (let i = 0; i < absentDates.length; i++) {
      attendance.push({ date: absentDates[i], type: "Absent" });
    }

    attendance = attendance.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    res.status(200).json({ statusCode: 200, success: true, data: attendance });
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

async function getAllUserLog(req, res, next) {
  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const currentDateWithoutTime = new Date(year, month, day);

    if (req.role === EMPLOYEE_ROLE) {
      const id = req.id;
      const userLogs = await UserlogModel.find({ empId: id, $or: [ { date: currentDateWithoutTime }, { isLogout: true } ] })
        .populate("empId")
        .sort({ createdAt: -1 });


      const enrichedUserLogs = userLogs.map((userLog) => {
        const totalDurationInSeconds =
          userLog.timeBlock.reduce((total, timeBlock) => {
            const startTime = new Date(timeBlock.startTime);
            const endTime = timeBlock.endTime
              ? new Date(timeBlock.endTime)
              : new Date();
            return total + (endTime - startTime);
          }, 0) / 1000; // Convert to seconds
        const totalBreakTime = userLog.totalBreakTime;

        const breakTimeHours = Math.floor(totalBreakTime / 3600);
        const breakTimeMinutes = Math.floor((totalBreakTime % 3600) / 60);
        const breakTimeSeconds = Math.floor(totalBreakTime % 60);

        return {
          ...userLog.toObject(),
          totalDurationInSeconds,
          seconds: Math.floor(totalDurationInSeconds % 60),
          minutes: Math.floor((totalDurationInSeconds / 60) % 60),
          hours: Math.floor(totalDurationInSeconds / 3600),
          TotalBreakHour: breakTimeHours,
          TotalBreakMinute: breakTimeMinutes,
          TotalBreakSecond: breakTimeSeconds,
        };
      });

      res.status(200).json({ success: true, data: enrichedUserLogs });
    } else {
      const employees = await EmployeeModel.find({ company: req.id });
      const employeeIds = employees.map((e) => e._id);
      const userLogs = await UserlogModel.find({ empId: { $in: employeeIds }, $or: [ { date: currentDateWithoutTime }, { isLogout: true } ]  })
        .populate("empId")
        .sort({ createdAt: -1 });

      const enrichedUserLogs = userLogs.map((userLog) => {
        const totalDurationInSeconds =
          userLog.timeBlock.reduce((total, timeBlock) => {
            const startTime = new Date(timeBlock.startTime);
            const endTime = timeBlock.endTime
              ? new Date(timeBlock.endTime)
              : new Date();
            return total + (endTime - startTime);
          }, 0) / 1000; // Convert to seconds

        const totalBreakTime = userLog.totalBreakTime;
        const breakTimeHours = Math.floor(totalBreakTime / 3600);
        const breakTimeMinutes = Math.floor((totalBreakTime % 3600) / 60);
        const breakTimeSeconds = Math.floor(totalBreakTime % 60);

        return {
          ...userLog.toObject(),
          totalDurationInSeconds,
          seconds: Math.floor(totalDurationInSeconds % 60),
          minutes: Math.floor((totalDurationInSeconds / 60) % 60),
          hours: Math.floor(totalDurationInSeconds / 3600),
          TotalBreakHour: breakTimeHours,
          TotalBreakMinute: breakTimeMinutes,
          TotalBreakSecond: breakTimeSeconds,
        };
      });

      res.status(200).json({ success: true, data: enrichedUserLogs });
    }
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

async function salary(req, res, next) {
  try {
    if (req.role === COMPANY_ROLE) {
      const currentDate = new Date();

      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;

      if (req.query.year && !isNaN(req.query.year))
        year = parseInt(req.query.year);
      if (req.query.month && !isNaN(req.query.month))
        month = parseInt(req.query.month);

      let totalHoursInSeconds = req.user.workingHour * 20 * 3600;

      const employees = await EmployeeModel.aggregate([
        {
          $match: {
            company: { $eq: new mongoose.Types.ObjectId(req.id) },
          },
        },
        {
          $match: {
            isWorking: true,
          },
        },
        {
          $lookup: {
            localField: "department",
            foreignField: "_id",
            from: "departments",
            as: "department",
          },
        },
        {
          $lookup: {
            localField: "designation",
            foreignField: "_id",
            from: "designations",
            as: "designation",
          },
        },
        {
          $addFields: {
            designation: { $first: "$designation" },
            department: { $first: "$department" },
          },
        },
        {
          $lookup: {
            localField: "_id",
            foreignField: "empId",
            from: "userlogs",
            as: "userlogs",
            pipeline: [
              {
                $match: {
                  isLogout: true,
                  $expr: {
                    $and: [
                      { $eq: [{ $year: "$date" }, year] },
                      { $eq: [{ $month: "$date" }, month] },
                    ],
                  },
                },
              },
              {
                $unwind: "$timeBlock",
              },
              {
                $group: {
                  _id: "$date",
                  totalDuration: {
                    $sum: {
                      $subtract: ["$timeBlock.endTime", "$timeBlock.startTime"],
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  date: "$_id",
                  totalDurationInSeconds: {
                    $floor: { $divide: ["$totalDuration", 1000] },
                  },
                },
              },
              {
                $sort: {
                  date: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            totalSeconds: { $sum: "$userlogs.totalDurationInSeconds" },
          },
        },
        {
          $addFields: {
            paySalary: {
              $divide: [
                { $multiply: ["$totalSeconds", "$salary"] },
                totalHoursInSeconds,
              ],
            },
          },
        },
      ]).exec();
      res.status(200).json({ statusCode: 200, success: true, data: employees });
    } else {
      debugger;
      const currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth()+1;

      const findWorkingHour = await EmployeeModel.findById(req.id).populate('company');
      const workingHour=findWorkingHour.company.workingHour
      let totalHoursInSeconds = workingHour * 20 * 3600;

      const employees = await EmployeeModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.id) } },
        {
          $match: {
            isWorking: true,
          },
        },
        {
          $lookup: {
            localField: "department",
            foreignField: "_id",
            from: "departments",
            as: "department",
          },
        },
        {
          $lookup: {
            localField: "designation",
            foreignField: "_id",
            from: "designations",
            as: "designation",
          },
        },
        {
          $addFields: {
            designation: { $first: "$designation" },
            department: { $first: "$department" },
          },
        },
        {
          $lookup: {
            localField: "_id",
            foreignField: "empId",
            from: "userlogs",
            as: "userlogs",
            pipeline: [
              {
                $match: {
                  isLogout: true,
                  $expr: {
                    $and: [
                      { $eq: [{ $year: "$date" }, year] },
                      { $eq: [{ $month: "$date" }, month] },
                    ],
                  },
                },
              },
              {
                $unwind: "$timeBlock",
              },
              {
                $group: {
                  _id: "$date",
                  totalDuration: {
                    $sum: {
                      $subtract: ["$timeBlock.endTime", "$timeBlock.startTime"],
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  date: "$_id",
                  totalDurationInSeconds: {
                    $floor: { $divide: ["$totalDuration", 1000] },
                  },
                },
              },
              {
                $sort: {
                  date: 1,
                },
              },
            ],
          },
        },
        {
          $addFields: {
            totalSeconds: { $sum: "$userlogs.totalDurationInSeconds" },
          },
        },
        {
          $addFields: {
            paySalary: {
              $divide: [
                { $multiply: ["$totalSeconds", "$salary"] },
                totalHoursInSeconds,
              ],
            },
          },
        },
      ]).exec();
      const employeeData = employees.length > 0 ? employees[0] : null;
      res.status(200).json({ statusCode: 200, success: true, data: employeeData });
    }
  } catch (e) {
    next(new ApiError(400, e.message));
  }
}

module.exports = {
  startTime,
  stopTime,
  reportingTime,
  breakingTime,
  getUserLog,
  getAllUserLog,
  totalWorkingHours,
  attendance,
  salary,
};
