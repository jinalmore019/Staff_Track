import InnerLayout from "@/layout/InnerLayout";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { verifyEmailSchema, verifyOtpSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import Forgotphoto from "@/assets/Forgot password-amico.png";
import otpphoto from "@/assets/Enter OTP-bro.png";
import {
  usePostVerifyEmailMutation,
  usePostVerifyOtpMutation,
} from "@/store/services/employee/Profile.service";
import { toast } from "@/components/ui/use-toast";

const Verify = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [VerifyEmail] = usePostVerifyEmailMutation();
  const [VerifyOtp] = usePostVerifyOtpMutation();
  const [attemptCount, setAttemptCount] = useState(1); 

  function handleChange(OTP) {
    setOTP(OTP);
  }
  const onSubmit = () => {};
  const onEmailSubmit = async () => {
    const data = form.getValues();
    if (!data.email) {
      setShowFirstDiv(true);
    } else {
      setEMAIL(data.email); // Update email state
      const response = await VerifyEmail(data);
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success
          ? "Otp send on email successfully"
          : response?.data?.message,
      });
      if (response?.data?.success === true) {
        setShowFirstDiv(false);
      } else {
        setShowFirstDiv(true);
        form.reset();
      }
    }
  };
  useEffect(() => {
    setAttemptCount(0);
  }, [showFirstDiv]);


  const onOtpSubmit = async (e) => {
    e.preventDefault();
    setAttemptCount(attemptCount + 1);
    console.log(attemptCount, "attemptCount");
    if (attemptCount >= 4) {
      setTimeout(() => {
        toast({
          className: "bg-red-500 text-white",
          title: "Maximum attempts reached. Please try again later.",
        });
      }, 600);
      setOTP("");
      setShowFirstDiv(true);
      return;
    }
    const data = { otp: OTP, email: EMAIL };
    const response = await VerifyOtp(data);
    setOTP("");
    if (response?.data?.success) {
      navigate("/forgot-password");
    } else {
      toast({
        className: response?.data?.success
          ? "bg-green-500 text-white "
          : "bg-red-500 text-white",
        title: response?.data?.success ? "" : response?.data?.message,
      });
    }
  };


  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const otpForm = useForm<z.infer<typeof verifyOtpSchema>>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      // otp: 000000,
    },
  });
  return (
    <>
      {/* <InnerLayout> */}
      <div className="relative flex justify-center items-center h-[100vh]">
        <div className="h-80 bg-[rgb(66,43,114)]  w-full top-0 left-0 -z-10 pt-7 fixed flex">
          {" "}
        </div>

        <div className="flex justify-center w-full">
          <div className="shadow-2xl bg-white w-full lg:w-1/3 md:w-1/2 sm:w-full px-5 rounded-2xl">
            <div className="flex justify-center items-center my-4 ">
              <img
                src={showFirstDiv ? Forgotphoto : otpphoto}
                alt=""
                className="w-44 h-44"
              />
            </div>

            <h1 className="text-[#484c7f] font-bold text-3xl text-center mb-4">
              {showFirstDiv ? "Verify Email" : "Enter OTP"}
            </h1>
            <p className="text-[#484c7f] text-center">
              {showFirstDiv
                ? "We will send you an OTP by email after you enter your email.l"
                : "Enter the genuine OTP that we sent to you."}
            </p>
            {showFirstDiv && (
              <>
                <div className="w-full">
                  <Form {...form}>
                    <form
                      className="space-y-8"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="grid gap-4 py-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="grid w-full items-center gap-4">
                              <div className="col-span-3">
                                <FormControl>
                                  <Input
                                    type="text"
                                    className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
                                    placeholder="email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        className="hover:text-[#484c7f] w-full font-bold text-2xl py-6 rounded-xl bg-[#484c7f] text-white"
                        variant="outline"
                        onClick={() => {
                          onEmailSubmit();
                        }}
                        type="submit"
                      >
                        Next
                      </Button>
                    </form>
                  </Form>

                  <div className="flex items-center space-x-2 justify-end p-3">
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="text-[#484c7f] font-bold">
                        <Button
                          type="button"
                          onClick={() => navigate("/login")}
                          className=""
                        >
                          Back to login
                        </Button>
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {!showFirstDiv && (
              <>
                <div className="w-full">
                  <Form {...otpForm}>
                    <form
                      className="space-y-8"
                      onSubmit={otpForm.handleSubmit(onSubmit)}
                    >
                      <div className="grid gap-4 py-4">
                        <div className="flex justify-center ">
                          <OTPInput
                            name="otp"
                            onChange={handleChange}
                            value={OTP}
                            inputStyle="w-16 h-16 text-4xl border mx-4"
                            numInputs={6}
                            renderSeparator={<span>- </span>}
                            renderInput={(props) => <input {...props} />}
                          />
                        </div>
                      </div>

                      <Button
                        className="hover:text-[#484c7f] w-full font-bold text-2xl py-6 rounded-xl bg-[#484c7f] text-white"
                        variant="outline"
                        onClick={onOtpSubmit}
                        type="submit"
                      >
                        Next
                      </Button>
                    </form>
                  </Form>
                  <div className="flex items-center space-x-2 justify-end p-3">
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="text-[#484c7f] font-bold">
                        <Button
                          type="button"
                          onClick={() => navigate("/login")}
                          className=""
                        >
                          Back to login
                        </Button>
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* </InnerLayout> */}
    </>
  );
};

export default Verify;
