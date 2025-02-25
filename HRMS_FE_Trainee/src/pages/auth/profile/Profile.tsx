import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import loginImage from "../../../assets/Group 11.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Profile() {
  return (
    <div className="bg-gray-200">
      <img
        className="h-[300px] w-[1450%] px-1 py-5 absolute top-0 left-0 z-0"
        src={loginImage}
        alt=""
      />
      <div className="grid gap-4 grid-cols-1 p-10 z-10 relative pt-52">
        <nav>
          <div className="bg-white flex gap-2 rounded-3xl w-[1450px] p-4 items-center justify-between">
            <div className="flex gap-3 items-center">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                className="h-[70px] w-[70px] rounded-[18px]"
                alt=""
                srcSet=""
              ></img>
              <div>
                <h1 className="font-bold text-2xl px-4 ">HELLO</h1>
                <p className="font-thin px-4">Ui Devloper</p>
              </div>
            </div>
            <Button
              className="bg-blue-500  rounded-xl text-white"
              variant="outline"
            >
              Change password
            </Button>
          </div>
        </nav>
        <div className="grid gap-4 grid-cols-2">
          <div className="bg-white rounded-3xl w-[700px] p-4 h-fit">
            <h1 className="font-bold text-2xl">Personal Info</h1>
            <hr className="my-5 border-[grey]" />
            <div className="gap-4 grid-row  grid grid-cols-2">
              <Input
                type="first name"
                className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="First Name"
              />
              <Input
                type="last name"
                className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Last Name"
              />
              <Input
                type="mobile number"
                className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Mobile Number"
              />
              <Input
                type="email"
                className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              />

              <Select>
                <SelectTrigger className="w-[321px] shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Male</SelectItem>
                  <SelectItem value="dark">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white rounded-3xl w-[720px] p-4">
            <h1 className="font-bold text-2xl">Personal Info</h1>
            <hr className="my-5 border-[grey]" />
            <div className="gap-4 grid-row  grid grid-cols-2">
              <Input
                type="department"
                className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Department"
              />
              <Input
                type="designation"
                className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Designation"
              />

              <Input
                type="date"
                className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Date of Joining"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl w-[1450px] p-4">
          <h1 className="font-bold text-2xl px-4 py-4">Indentification Info</h1>
          <hr className="my-5 border-[grey]" />
          <div className="gap-4 grid-row  grid grid-cols-5">
            <Input
              type="adhar card number"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Adhar Card Number"
            />
            <Input
              type="pan card number"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Pan Card Number"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl w-[1450px] p-4">
          <h1 className="font-bold text-2xl px-4 py-4">Communication Info</h1>
          <hr className="my-5 border-[grey]" />
          <div className="gap-4 grid-row  grid grid-cols-4">
            <Input
              type="father full name"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Father Full Name"
            />
            <Input
              type="mother full name"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Mother Full Name"
            />
            <Input
              type="address"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="address"
            />
            <Input
              type="city"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="city"
            />
            <Input
              type="state"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="State"
            />
            <Input
              type="country"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Country"
            />
            <Input
              type="pincode"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Pincode"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl w-[1450px] p-4">
          <h1 className="font-bold text-2xl px-4 py-4">
            Emergency Contact Info
          </h1>
          <hr className="my-5 border-[grey]" />
          <div className="gap-4 grid-row  grid grid-cols-5">
            <Input
              type="person name"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Person Name"
            />
            <Input
              type="contact number"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Contact Number"
            />
          </div>
        </div> 

        <div className="bg-white rounded-3xl w-[1450px] p-4">
          <h1 className="font-bold text-2xl px-4 py-4">Bank Information</h1>
          <hr className="my-5 border-[grey]" />
          <div className="gap-4 grid-row  grid grid-cols-4">
            <Input
              type="account holder name"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Account Holder Name"
            />
            <Input
              type="bank name"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Bank Name"
            />
            <Input
              type="IFSC code"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="IFSC Code"
            />
            <Input
              type="account number"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Account Number"
            />
            <Input
              type=" confirm account number"
              className="shadow appearance-none border border-[#d2d6da]  rounded-[10px] py-2 px-3 max-w-[350px] text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm Account Number"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
