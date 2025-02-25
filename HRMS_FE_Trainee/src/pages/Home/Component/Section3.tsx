import React from "react";
import chartImage from "@/assets/feature-charts.avif";
import approvals from "@/assets/feature-approvals.avif";
import screenPlan from "@/assets/screen-plan.avif";
import icon1 from "@/assets/icon-thumbs-up.avif";
import icon2 from "@/assets/icon-eye.avif";
import icon3 from "@/assets/icon-done.avif";
import icon4 from "@/assets/icon-timer.avif";
import icon5 from "@/assets/icon-sync.avif";
import icon6 from "@/assets/icon-money.avif";
import { Navigate } from "react-router-dom";
import { Link } from "react-scroll";

const Section3 = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ behavior: "smooth" }); // Scroll to top
  };

  return (
    <div className="py-20 px-8">
      <div className="max-w-6xl my-0 mx-auto mt-10">
        <div className="flex flex-col gap-5 text-center mx-44 mb-10 ">
          <h1 className="font-semibold text-5xl text-[#422b72]">
            What's new at Staff Track?
          </h1>
        </div>

        <div className="mt-8 flex gap-8 ">
          <div className="flex-1 bg-[#F7D8F3] rounded-xl px-8 pt-8 pb-6 mb-8 flex gap-5 flex-col-reverse justify-between	">
            <div className="overflow-hidden relative pt-2">
              <img src={chartImage} alt="" />
            </div>
            <div className="">
              <h5 className="text-[#422b72] font-semibold mb-5 leading-7 text-xl">
                Introducing StaffTrack Analytics: A new way to slice and present
                your data in Staff Track
              </h5>
              <div className="text-[#625480] leading-6">
                Our reporting dashboards offer flexibility and customization,
                allowing you to design reports that align perfectly with your
                company objectives. From tree charts showcasing employee
                demographics to line graphs tracking absenteeism trends, you
                have the freedom to customise it according to your organization.
              </div>
              <a
                href=""
                className="text-[#422b72] mt-6 inline-block font-semibold	"
              >
                Sign up to try for free
              </a>
            </div>
          </div>
          <div className="flex-1 bg-[#FDEAE2] rounded-xl px-8 pt-8 pb-6 mb-8 flex gap-5 flex-col-reverse justify-between	">
            <div className="overflow-hidden relative pt-2">
              <img src={approvals} alt="" />
            </div>
            <div className="">
              <h5 className="text-[#422b72] font-semibold mb-5 leading-7 text-xl">
                Submission & Approvals for Time Entries
              </h5>
              <div className="text-[#625480] leading-6">
                Your team can now submit their time entries weekly and admins
                can review, approve or reject submissions or leave in the
                StaffTrack web app. Upon reviewing, you can lock the specific
                details to prevent further data entry edits.
              </div>
              <a
                href=""
                className="text-[#422b72] mt-6 inline-block font-semibold "
              >
                Invite your team to track time
              </a>
            </div>
          </div>
        </div>

        <div className="p-10 bg-[#422b72] rounded-xl ">
          <div className="mb-10 border-b-2 border-solid border-[#6B5A74] pr-56 pb-10 relative">
            <h3 className="mb-4 text-[#FFDE91] text-[170%] font-bold leading-5">
              Use the same login credentials for Staff Track
            </h3>
            <p className="text-[#D5D0D7] m-0 text-lg">
              Experience all that StaffTrack offers. One login, two powerful
              tools. As we continuously integrate Track and Plan, we're shaping
              the productivity and profitability hub for agencies and internal
              teams.
            </p>
          </div>

          <div className="text-center">
            <div>
              <h2 className="text-white mx-28 mb-8 mt-11 font-semibold text-[40px]">
                For every Staff Track user, there's a vibrant path ahead with
                Toggl Plan. Real vibrant.
              </h2>
              <p className="text-[#D5D0D7] text-lg">
                Discover how visual team scheduling can redefine team and
                project success.
              </p>
            </div>

            <div className="mt-9 mb-16 ">
              <div className="w-[90%] relative overflow-hidden inline-block align-top	">
                <img src={screenPlan} alt="" />
              </div>
            </div>

            <div className="flex my-10 gap-8">
              <div className="px-5 pb-5 pt-9 relative flex-1 rounded-xl border-2 border-solid border-[#A876F5] bg-[#EEE4FD] ">
                <p className="font-semibold text-sm gap-5 justify-center items-center text-[#422b72]	">
                  USE<b className="text-2xl text-[#A876F5]"> Staff Track </b>FOR
                  TEAM AND PROJECT PLANNING
                </p>
                <p className="text-[#6B5A74] leading-7 text-center relative px-4 pt-4 pb-5">
                  Tired of bulky project tools and coloring Excel cells for team
                  planning? There's a better way.
                </p>
                <div className="flex justify-center">
                  <hr className="border-t-4 border-solid border-[#A876F5] w-20" />
                </div>

                <div className="mt-8 px-3">
                  <div className="my-4 flex items-center	gap-x-5">
                    <div className="inline-block overflow-hidden relative align-top	">
                      <img src={icon1} alt="" className="h-11 w-11" />
                    </div>
                    <p className="flex-1 text-[#6B5A74] text-left">
                      Create{" "}
                      <strong className="text-[#5e426d] ">
                        effective work schedules{" "}
                      </strong>
                      without clunky spreadsheets or complex software
                    </p>
                  </div>
                  <div className="my-4 flex items-center	gap-x-5">
                    <div className="inline-block overflow-hidden relative align-top	">
                      <img src={icon2} alt="" className="h-11 w-11" />
                    </div>
                    <p className="flex-1 text-[#6B5A74] text-left ">
                      <strong className="text-[#5e426d] ">
                        Get visibility{" "}
                      </strong>
                      into your team's availability and workload
                    </p>
                  </div>
                  <div className="my-4 flex items-center	gap-x-5">
                    <div className="inline-block overflow-hidden relative align-top	">
                      <img src={icon3} alt="" className="h-11 w-11" />
                    </div>
                    <p className="flex-1 text-[#6B5A74] text-left">
                      Stay on schedule and{" "}
                      <strong className="text-[#5e426d] ">
                        get tasks done{" "}
                      </strong>
                      by deadlines
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-9 relative flex-1 rounded-xl border-2 border-solid border-[#E57CD8] bg-[#EEE4FD] ">
                <p className="font-semibold text-sm gap-5 justify-center items-center text-[#422b72]	">
                  INTEGRATE IT WITH
                  <b className="text-2xl text-[#E57CD8]"> Staff Track </b>
                </p>
                <p className="text-[#6B5A74] leading-7 text-center relative px-4 pt-4 pb-5">
                  Love how Toggl Track makes sense of your hours? Turn that time
                  data into strategic team and project roadmaps.
                </p>
                <div className="flex justify-center">
                  <hr className="border-t-4 border-solid border-[#E57CD8] w-20" />
                </div>

                <div className="mt-8 px-3">
                  <div className="my-4 flex items-center	gap-x-5">
                    <div className="inline-block overflow-hidden relative align-top	">
                      <img src={icon4} alt="" className="h-11 w-11" />
                    </div>
                    <p className="flex-1 text-[#6B5A74] text-left">
                      View plans and{" "}
                      <strong className="text-[#E57CD8] ">
                        track task time{" "}
                      </strong>
                      in Toggl Plan without having to switch tools
                    </p>
                  </div>
                  <div className="my-4 flex items-center	gap-x-5">
                    <div className="inline-block overflow-hidden relative align-top	">
                      <img src={icon5} alt="" className="h-11 w-11" />
                    </div>
                    <p className="flex-1 text-[#6B5A74] text-left ">
                      <strong className="text-[#E57CD8] ">
                        {" "}
                        Two-way sync{" "}
                      </strong>
                      ensures updated data in both tools
                    </p>
                  </div>
                  <div className="my-4 flex items-center	gap-x-5">
                    <div className="inline-block overflow-hidden relative align-top	">
                      <img src={icon6} alt="" className="h-11 w-11" />
                    </div>
                    <p className="flex-1 text-[#6B5A74] text-left">
                      Access{" "}
                      <strong className="text-[#E57CD8] ">
                        advanced time reports{" "}
                      </strong>
                      in Toggl Track to assess project profitability and team
                      productivity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex text-center items-center gap-6 mt-8 justify-center">
            <h3 className="text-[#FEFBFA] text-[32px] font-semibold">
              It's time to plan your team and projects better
            </h3>
            <Link
              to="useCase"
              smooth={true}
              duration={500}
              className="bg-[#A876F5] px-9 py-4 items-center rounded-full text-center  hover:bg-[#7B7EA8] h-14 font-semibold text-white"
              onClick={handleScrollToTop}
            >
              Explore Staff Tack
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;



