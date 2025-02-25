import React from "react";
import homeLogo from "@/assets/images.jpeg";
import billingInvoicing from "@/assets/billing-invoicing.avif";
import empTimeTrack from "@/assets/employee-time-tracking.avif";
import trackTime from "@/assets/ss-track-time.avif";
import timeLine from "@/assets/ss-timeline-availability.avif";
import speaker from "@/assets/speaker-greg.avif";
const UseCase = () => {
  return (
    <>
      <section className="py-20 px-8 text-[#422b72] font-sans bg-[#FDF1EC]	">
        <div className="mx-36 mt-10">
          <div className="mx-48 mb-9 text-center font-sans flex gap-5 flex-col">
            <p className="font-semibold text-lg">WHAT'S YOUR USE CASE?</p>
            <p className="font-bold text-5xl">
              Tracking accurately, measure Time, manage projects and teams{" "}
              <br /> we’ve got ‘em all
            </p>
          </div>
          <div className="flex flex-col gap-10 mt-28">
            <div className="flex gap-12">
              <div className="basis-2/3 p-6 ">
                <p className="text-base font-semibold text-[#E57CD8] uppercase">
                  Billing & invoicing with{" "}
                  <b className="text-2xl lowercase">staffTrack</b>
                </p>
                <h1 className="font-bold text-3xl my-4">
                  Record every billable hour
                </h1>
                <div className="text-xl max-w-lg">
                  A Time Tracking System is a software solution or tool used to
                  monitor, record, and analyze the time spent by individuals
                  employee on specific day. Employees can log in to the system
                  to view their daily start time, end time, and break
                  time.Customizable filters and search options facilitate
                  efficient data retrieval based on specific criteria.
                </div>
                <div className="mt-8 mb-3 inline-flex justify-start items-center gap-x-8 gap-y-5    ">
                  <a
                    className="bg-gradient-to-br from-pink-500 to-purple-500 px-9 py-3  items-center rounded-full text-center text-xl h-14 text-white  hover:from-[#422b72] hover:to-[#422b72]"
                    href=""
                  >
                    Start tracking for free
                  </a>
                </div>
              </div>
              <div className="basis-2/3		flex justify-center ">
                <img src={billingInvoicing} className="h-96" alt="none" />
              </div>
            </div>

            <div className="flex gap-12  ">
              <div className="basis-2/3 ml-4	flex">
                <img
                  src={empTimeTrack}
                  className="h-full w-[190%]"
                  alt="none"
                />
              </div>
              <div className="basis-7/12 p-6 ">
                <p className="text-base font-semibold text-[#E57CD8] uppercase">
                  Employee time tracking with{" "}
                  <b className="text-2xl lowercase">Stafftrack</b>
                </p>
                <h1 className="font-bold text-3xl my-4">
                  Boost accountability across teams
                </h1>
                <div className="text-xl max-w-lg">
                  Administrators have the ability to assign salaries to
                  employees based on their job roles, experience, and
                  performance.Salary adjustments, bonuses, and deductions can be
                  configured as needed, with options to specify fixed amounts or
                  percentage-based calculations. Deductions for attendance
                  violations such as late arrivals and early departures are
                  calculated based on predefined rules and policies.
                </div>
                <div className="mt-8 mb-3 inline-flex justify-start items-center gap-x-8 gap-y-5    ">
                  <a
                    className="bg-gradient-to-br from-pink-500 to-purple-500 px-9 py-3  items-center rounded-full text-center text-xl h-14 text-white hover:from-[#422b72] hover:to-[#422b72]"
                    href=""
                  >
                    Learn more about employee time tracking{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-60 mb-12 text-center">
              <div className="flex mb-4 justify-center">
                <img
                  src={speaker}
                  className="w-28 h-28 rounded-[50%]"
                  alt="none"
                />
              </div>
              <p className="text-[#422b72] mb-8 font-semibold text-2xl ">
                “Toggl Track offers full control to our team members to
                accurately track their time. It is extremely easy and intuitive,
                as well as non-invasive.”
              </p>
              <p className="text-[#422b72] text-base">
                — Greg Martel, COO and co-founder of Newlogic, a software
                consultancy of 50+ employees
              </p>
            </div>

            <div className="flex gap-12  ">
              <div className="basis-2/3 ml-4	flex justify-start ">
                <img src={trackTime} className="h-72" alt="none" />
              </div>
              <div className="basis-7/12 p-6 ">
                <p className="text-base font-semibold text-[#E57CD8] uppercase">
                  Project time tracking with{" "}
                  <b className="text-2xl text-purple-500 lowercase">staffTrack</b>
                </p>

                <h1 className="font-bold text-3xl my-4">
                  Track project time and hit deadlines with ease
                </h1>
                <div className="text-xl max-w-lg">
                  Admins can set project deadlines and milestones, track
                  progress against targets, and identify potential bottlenecks
                  or delays. The system provides real-time visibility into the
                  progress of each task and project, enabling employees to
                  manage their workload efficiently.
                </div>
                <div className="mt-8 mb-3 inline-flex justify-start items-center gap-x-8 gap-y-5    ">
                  <a
                    className="bg-gradient-to-br from-pink-500 to-purple-500 px-9 py-3  items-center rounded-full text-center text-xl h-14 text-white hover:from-[#422b72] hover:to-[#422b72]"
                    href=""
                  >
                    Learn more about the integration
                  </a>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="basis-2/3 p-6 ">
                <p className="text-base font-semibold text-purple-500 uppercase">
                  Team capacity planning with
                  <b className="text-2xl lowercase"> staffTrack</b>
                </p>
                <h1 className="font-bold text-3xl my-4">
                  Confidently schedule work without conflicts
                </h1>
                <div className="text-xl max-w-lg">
                  Administrators have the authority to create teams within this
                  platform. Admins have the flexibility to modify team
                  information, update project timelines, or add/remove members
                  as needed.Employees can access a dedicated section within this
                  platform to view the teams they are assigned to.
                </div>
                <div className="mt-8 mb-3 inline-flex justify-start items-center gap-x-8 gap-y-5    ">
                  <a
                    className="bg-purple-500 px-9 py-3  items-center rounded-full text-center text-xl h-14 text-white hover:bg-[#422b72] "
                    href=""
                  >
                    Start tracking for free
                  </a>
                </div>
              </div>
              <div className="basis-1/2	flex justify-center ">
                <img src={timeLine} className="h-72" alt="none" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UseCase;
