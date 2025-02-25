import React from "react";
import { Button } from "@/components/ui/button";
import {  useNavigate  } from "react-router-dom";

import humanInsight from "../../../assets/human-with-insights.avif";
import heartHands from "../../../assets/illo-hearthands-ec83cef093ffc7f52b05d2064dfa7bc7.png";
import flowerClock from "../../../assets/illo-flower-clock-a5c3884200f1f3953cdc060a95f070b7.png";
import toggleDevice from "../../../assets/illo-toggl-devices-d06587f566d4b463024dab3bfb702d9a.png";
import mockUp from "../../../assets/mockup-report.avif";
import rating from "../../../assets/rating.svg";


const WhyToggl = () => {
    const navigate=useNavigate ()
  return (
    <>
      <section className="bg-[#FDF1EC]">
        <div className="py-20 px-8 font-sans mt-10">
          <div className="mx-40">
            <div className="flex gap-3 my-9">
              <div className="basis-2/3">
                <p className="font-semibold text-6xl text-[#422b72] pb-5">
                  Why Staff Track?{" "}
                </p>
                <p className="font-semibold text-4xl text-[#422b72]">
                  Why we should be your number one choice?
                </p>
                <p className="text-2xl mt-8 text-[#422b72]">
                  It's not just about the checkIn and CheckOut. We provide
                  facilities like manage holidays , leaves , attendance of
                  employees.You also store your project details and create
                  teams.It's time tracking designed for employees who can start
                  and stop there work time.
                </p>
              </div>
              <img src={humanInsight} className="h-96" alt="none" />
              <div></div>
            </div>
            <p className="text-2xl mb-8 mt-20 font-semibold text-[#422b72]">
              Why business <span className="text-[#E57CD8]">choose</span> Staff
              Track:
            </p>
            <div className="flex gap-7 mb-4">
              <div className="bg-[#FDEAE2] basis-2/4	 rounded-xl ">
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex justify-center">
                    <img src={heartHands} className="h-36" alt="none" />
                  </div>
                  <div className="text-[#422b72]">
                    <p className=" font-semibold text-xl mb-3">
                      Your Data is our Responsibility
                    </p>
                    <div className="text-base">
                      Rest assured. Your data is safe with us. Staff Track
                      is an HRMS provider data security. Be assured that your
                      employees’ data under staff track's care are
                      well-managed & safeguarded
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFEBBD] basis-2/4	rounded-xl">
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex justify-center">
                    <img src={flowerClock} className="h-36" alt="none" />
                  </div>
                  <div className="text-[#422b72]">
                    <p className=" font-semibold text-xl mb-3">
                      100% accurate time tracking
                    </p>
                    <div className="text-base">
                      Win the trust of your staff with Staff Track. Get accurate
                      data with an anti-surveillance time tracking solution that
                      your employees are happy to use.
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="bg-[#F7D8F3] basis-2/4	 rounded-xl">
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex justify-center">
                    <img src={toggleDevice} className="h-36" alt="none" />
                  </div>
                  <div className="text-[#422b72]">
                    <p className=" font-semibold text-xl mb-3">
                      Adaptable tools across platforms
                    </p>
                    <div className="text-base">
                      Everyone works differently. Our tools — spanning from web
                      to mobile to integrations — cater to varied work styles,
                      ensuring everyone finds their rhythm in tracking their
                      tasks.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-8 mt-10 pl-8 bg-[#FAE5F7] rounded-xl">
              <div className="basis-4/6	text-[#422b72]">
                <p className="font-semibold text-2xl mb-4">
                  We make time tracking simple for team members, and reporting
                  easy for team managers
                </p>
                <p className="text-bse">
                  Our origin is simple: we needed a great time tracker, so we
                  built one. Every design choice reflects our commitment to
                  user-friendly experiences, ensuring time tracking remains a
                  tool, not a dreaded chore.
                </p>
                <div className="p-5 mt-8 bg-[#FCF2FB] rounded-xl">
                  <p className="font-bold">
                    “Clients love the summaries, colleagues love the simplicity.
                    We have used it for 7+ years and it is still going very
                    well. The ease of use of Staff Track is unprecedented.”
                  </p>
                  <div className="flex gap-4 mt-3 mb-21align-top ">
                    <img src={rating} className="h-4" alt="none" />
                    5/5 stars on Capterra
                  </div>
                  <p>— Jakub H, Founder of a design agency</p>
                </div>
              </div>
              <div className="basis-3/6 justify-end flex">
                <img src={mockUp} className="h-96" alt="none" />
              </div>
            </div>
            <div className="mt-11 flex gap-4">
              <div className="text-[#422b72] basis-4/6	">
                <p className="font-semibold text-3xl mb-3">
                  Over 70,000+ business have said yes to Staff Track.
                </p>
                <p className="text-lg">
                  All plans come with free cost. No credit card
                  required to start.
                </p>
              </div>
              <div className="flex basis-3/6	 justify-center mb-3  items-center gap-x-8 gap-y-5    ">
                <Button type="submit" onClick={()=>navigate("/Cmpinfo")} className="bg-gradient-to-br from-pink-500 to-purple-500 px-9 py-3  items-center rounded-full text-center text-xl h-14 text-white hover:from-[#422b72] hover:to-[#422b72]">
                Start tracking for free
                            </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyToggl;
