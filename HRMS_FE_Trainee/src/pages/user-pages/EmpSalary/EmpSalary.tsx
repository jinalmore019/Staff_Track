import React from "react";
import InnerLayout from "@/layout/InnerLayout";
import { useGetEmpSalaryQuery } from "@/store/services/Salary.service";
import Loading from "@/common/Loading";
import { DateFormat, LongDateFormat } from "@/common/DateFormat";

function UserSalary() {
  const { formatDate } = DateFormat();

  const { data: EmpSalary, isLoading } = useGetEmpSalaryQuery({});
  const totalDeduction = (EmpSalary?.data?.salary - EmpSalary?.data?.paySalary).toFixed(2);
  console.log(EmpSalary?.data,"EmpSalary")
  return (
    <>
      <InnerLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-between">
              <h1 className="text-white text-xl font-semibold mb-2 md:mb-0">
                Monthly assigned calculated salary
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-3">
              <div className="bg-white shadow-2xl rounded-3xl p-5">
                <span className="text-lg font-bold text-[#344767]">
                  Total Earning :
                </span>
                <h2 className="mt-2 text-3xl font-bold text-[#6e54d6]">
                  {EmpSalary?.data?.salary}
                </h2>
              </div>
              <div className="bg-white shadow-2xl rounded-3xl p-5">
                <span className="text-lg font-bold text-[#344767]">
                  Total Deductions :
                </span>
                <h2 className="mt-2 text-3xl font-bold text-[#6e54d6]">
                  {totalDeduction}
                </h2>
              </div>
              <div className="bg-white shadow-2xl rounded-3xl p-5">
                <span className="text-lg font-bold text-[#344767]">
                  Netpay (Rounded) :
                </span>
                <h2 className="mt-2 text-3xl font-bold text-[#6e54d6]">
                  { (EmpSalary?.data?.paySalary).toFixed(2)}
                </h2>
              </div>
              <div className="bg-white shadow-2xl rounded-3xl p-5">
                <span className="text-lg font-bold text-[#344767]">
                  Pay Date :
                </span>
                <h2 className="mt-2 text-3xl font-bold text-[#6e54d6]">
                 {LongDateFormat(EmpSalary?.data?.updatedAt)}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
              <div className="bg-white py-3 shadow-2xl rounded-2xl">
                <span className="text-lg font-bold text-[#344767] pl-5 pt-5 block">
                  Earning
                </span>
                <hr className="my-5 border-[grey] opacity-50" />
                <div className="px-6">
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">Basic pay </h2>
                    <h2 className="text-base font-bold text-[#344767]">
                      {EmpSalary?.data?.salary}
                    </h2>
                  </div>
                  <hr className="my-3 border-[grey] opacity-50" />
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">
                      Dearness Allowance{" "}
                    </h2>
                    <h2 className="text-base font-bold text-[#344767]">0000</h2>
                  </div>
                  <hr className="my-3 border-[grey] opacity-50" />
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">
                      House Rent Allowance{" "}
                    </h2>
                    <h2 className="text-base font-bold text-[#344767]">0000</h2>
                  </div>
                </div>
                <hr className="my-5 border-[grey] opacity-50" />
                <div className="flex justify-between px-6">
                  <h2 className="text-base text-[#4d5c78]">Total Earning </h2>
                  <h2 className="text-base font-bold text-[#344767]">
                    {EmpSalary?.data?.salary}
                  </h2>
                </div>
              </div>

              <div className="bg-white py-3 shadow-2xl rounded-2xl">
                <span className="text-lg font-bold text-[#344767] pl-5 pt-5 block">
                  Deductions{" "}
                </span>
                <hr className="my-5 border-[grey] opacity-50" />
                <div className="px-6">
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">
                      Professional Tex{" "}
                    </h2>
                    <h2 className="text-base font-bold text-[#344767]">00</h2>
                  </div>
                  <hr className="my-3 border-[grey] opacity-50" />
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">
                      Provident Fund{" "}
                    </h2>
                    <h2 className="text-base font-bold text-[#344767]">00</h2>
                  </div>
                  <hr className="my-3 border-[grey] opacity-50" />
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">
                      Other Deductions{" "}
                    </h2>
                    <h2 className="text-base font-bold text-[#344767]">
                      {" "}
                      {totalDeduction}
                    </h2>
                  </div>
                </div>
                <hr className="my-5 border-[grey] opacity-50" />
                <div className="px-6 py-4">
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">
                      Total Deductions{" "}
                    </h2>
                    <h2 className="text-base font-bold text-[#344767]">
                      {" "}
                      {totalDeduction}
                    </h2>
                  </div>
                  <hr className="my-3 border-[grey] opacity-50" />
                  <div className="flex justify-between">
                    <h2 className="text-base text-[#4d5c78]">Netpay </h2>
                    <h2 className="text-base font-bold text-[#344767]">
                      { (EmpSalary?.data?.paySalary).toFixed(2)}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </InnerLayout>
    </>
  );
}

export default UserSalary;
