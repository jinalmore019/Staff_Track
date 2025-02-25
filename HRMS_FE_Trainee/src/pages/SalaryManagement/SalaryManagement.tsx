import React, { useState } from "react";
import InnerLayout from "@/layout/InnerLayout";

import {
  useGetEmpByNameQuery,
  useGetEmpSalaryQuery,
} from "@/store/services/Salary.service";
import Loading from "@/common/Loading";
import emptyProfile from "../../assets/empty-profile.png";
import { LongDateFormat } from "@/common/DateFormat";

const SalaryManagement = () => {
  const [searchInput, setSearchInput] = useState("");

  const { data: EmpData, isLoading } = useGetEmpByNameQuery(searchInput);
  const { data: EmpSalary } = useGetEmpSalaryQuery({});

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const totalDeduction = (
    selectedEmployee?.salary - selectedEmployee?.paySalary
  ).toFixed(2);

  console.log(selectedEmployee, "EmpSalary");
  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
              {/* <div className="flex overflow-auto gap-6"> */}
              <div className=" flex grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EmpSalary &&
                  EmpSalary.data
                    .filter((res) =>
                      `${res.firstName} ${res.lastName}`
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                    )
                    .sort((a, b) => {
                      // Sort based on how closely the full names match the search query
                      const aMatch = `${a.firstName} ${a.lastName}`
                        .toLowerCase()
                        .indexOf(searchInput.toLowerCase());
                      const bMatch = `${b.firstName} ${b.lastName}`
                        .toLowerCase()
                        .indexOf(searchInput.toLowerCase());
                      return aMatch - bMatch;
                    })
                    .map((res, i) => (
                      <div className="block" key={i}>
                        <div
                          onClick={() => {
                            setSelectedEmployee(res);
                          }}
                          className={`flex bg-white rounded-3xl items-center shadow-md p-3 gap-5  m-2 ${selectedEmployee?.id === res.id
                            ? "bg-[#eeeeee]"
                            : ""
                            }`}
                          style={{ width: "350px" }}
                        >
                          <div className="w-28 h-28 flex items-center justify-center">
                            <img
                              src={
                                (res.profilePic && res.profilePic) ||
                                emptyProfile
                              }
                              alt=""
                              className="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div>
                            <h1 className="text-[#422b72] font-bold text-[21px] mt-3">
                              {res?.firstName + " " + res?.lastName}
                            </h1>
                            <h3 className="pt-2 font-semibold">
                              {res?.designation?.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {selectedEmployee && (
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5"></div>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex justify-center items-center gap-5">

                    <hr className="my-2 w-96 border-[grey] opacity-50" />
                    <h1 className="text-2xl font-bold text-[#dea34b]">
                      {selectedEmployee?.firstName +
                        " " +
                        selectedEmployee?.lastName}
                    </h1>
                    <hr className="my-2 w-96 border-[grey] opacity-50" />
                  </div>
                </div>
                <div className="flex ">
                  <div
                    className="bg-white py-3 mt-10 shadow-2xl w-full rounded-2xl"
                    style={{
                      boxShadow:
                        "rgba(136, 165, 191, 0.48) 6px 2px 16px 8px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                    }}
                  >
                    <span className="text-lg font-bold text-[#344767] text-left pl-5 pt-5">
                      Salary{" "}
                    </span>
                    <hr className="my-5 border-[grey] opacity-50" />
                    <div className="px-6">
                      <div className="flex">
                        <h2 className="text-base text-[#4d5c78] text-left ">
                          Salary
                        </h2>
                        <h2 className="text-base text-[#344767] font-bold text-left ml-auto ">
                          {selectedEmployee?.salary}
                        </h2>
                      </div>
                    </div>

                    <hr className="my-5 border-[grey] opacity-50" />

                    <div className="px-6 py-4">
                      <div className="flex ">
                        <h2 className="text-base text-[#4d5c78] text-left ">
                          Total Deductions{" "}
                        </h2>
                        <h2 className="text-base text-[#344767] font-bold text-left ml-auto">
                          {totalDeduction}
                        </h2>
                      </div>
                      <hr className="my-3 w-full border-[grey] opacity-50" />
                      <div className="flex ">
                        <h2 className="text-base text-[#4d5c78] text-left ">
                          Netpay
                        </h2>
                        <h2 className="text-base text-[#344767] font-bold text-left ml-auto">
                          {(selectedEmployee?.paySalary).toFixed(2)}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-5 mt-3">
                  <div className="bg-white w-full  shadow-2xl rounded-3xl p-5">
                    <span className="text-lg font-bold text-[#344767] text-left">
                      Total Earning:
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-left text-[#6e54d6]">
                      {selectedEmployee?.salary}
                    </h2>
                  </div>
                  <div className="bg-white w-full  shadow-2xl rounded-3xl p-5">
                    <span className="text-lg font-bold text-[#344767] text-left">
                      Total Deductions:
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-left text-[#6e54d6]">
                      {totalDeduction}
                    </h2>
                  </div>
                  <div className="bg-white w-full  shadow-2xl rounded-3xl p-5">
                    <span className="text-lg font-bold text-[#344767] text-left">
                      Netpay (Rounded):
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-left text-[#6e54d6]">
                      {(selectedEmployee?.paySalary).toFixed(2)}
                    </h2>
                  </div>
                  <div className="bg-white w-full  shadow-2xl rounded-3xl p-5">
                    <span className="text-lg font-bold text-[#344767] text-left">
                      Pay Date:
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-left text-[#6e54d6]">
                      {LongDateFormat(selectedEmployee?.updatedAt)}
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </InnerLayout>
    </>
  )
}

export default SalaryManagement;
