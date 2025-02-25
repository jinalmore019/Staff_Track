import React, { useState } from "react";
import InnerLayout from "@/layout/InnerLayout";
import { useGetTeamByNameQuery } from "../../../store/services/Team.service.js";
import emptyProfile from "../../../assets/empty-profile.png";
import Loading from "@/common/Loading.js";
const UserTeam = () => {
  const { data: getTeam, isLoading } = useGetTeamByNameQuery("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <InnerLayout>
      <div className="h-fit">
        <h1 className="text-xl font-semibold text-white gap-2 mt-5">
          Project Teams
        </h1>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {getTeam &&
                getTeam.data.map((item, i) => (
                  <div

                    key={i}
                    className={`flex-none bg-white rounded-xl shadow-md p-5 text-center w-64 mr-6 whitespace-nowrap cursor-pointer ${selectedTeam?.id === item.id ? "bg-[#ECECEC]" : ""
                      }`}
                    onClick={() => {
                      setSelectedTeam(item);
                    }}
                  >
                    <h1 className="text-2xl font-bold text-[rgb(66,43,114)]">
                      {item.project.projectTitle}
                    </h1>
                  </div>
                ))}
            </div>
        )}

        {selectedTeam && (
          <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-xl p-10 gap-16 mt-8">
            <div className="md:w-1/3">
              <h1 className="text-2xl font-bold text-[#DEA34B] mb-2 ml-1">
                Leader
              </h1>
              <div className="bg-[rgba(162,160,160,0.27)] rounded-3xl flex flex-col items-center shadow-md w-full md:w-64 h-[275px] justify-center">
                <div className="w-28 h-28 mx-9 flex items-center justify-center bg-black rounded-full">
                  <img
                    src={selectedTeam?.leaderId?.profilePic || emptyProfile}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <h1 className="text-[#422B72] font-bold text-[21px] mt-3">
                  {selectedTeam?.leaderId?.firstName +
                    " " +
                    selectedTeam?.leaderId?.lastName}
                </h1>
                <h3 className="pt-2 font-semibold">
                  {selectedTeam?.leaderId?.designation?.name}
                </h3>
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold text-[#DEA34B] mb-2">
                Members
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-h-72 overflow-auto">
                {selectedTeam.members.map((member, index) => (
                  <div className="bg-[#ECECEC] rounded-xl flex flex-col items-center shadow-md w-full  py-5 px-2">
                    <div className="w-12 h-12 flex items-center justify-center bg-black rounded-full">
                      <img
                        src={member?.profilePic || emptyProfile}
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <h1 className="text-[rgb(66,43,114)] font-bold mt-3">
                      {member?.firstName + " " + member?.lastName}
                    </h1>
                    <h3 className="font-semibold">
                      {member?.designation?.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </InnerLayout>
  );
};

export default UserTeam;

