import InnerLayout from "@/layout/InnerLayout";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
// import { Checkbox } from "@/components/ui/checkbox";
import { forgotPasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import photo from "../../assets/Forgot password-pana (1).png";
import { usePostChangePasswordMutation } from "@/store/services/employee/Profile.service";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [ChangePassword] = usePostChangePasswordMutation();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      newPassword: "",
    },
  });
  const onSubmit = async () => {
    const data = form.getValues();
    console.log(data);
    const response = await ChangePassword(data);
    if (!response?.error) {
      navigate("/login");
    }
  };
  return (
    <>
      <InnerLayout>
        <div className="flex justify-center">
          <div className="shadow-2xl bg-white w-1/3 px-5 rounded-2xl">
            <div className="flex justify-center items-center my-4 ">
              <img src={photo} alt="" className="w-44 h-44" />
            </div>

            <h1 className="text-[#484c7f] font-bold text-3xl text-center mb-4">
              Forget password
            </h1>

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
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid items-center gap-4">
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3  border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]  focus:font-semibold"
                                placeholder="password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="grid items-center gap-4">
                          <div className="col-span-3">
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3  border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]  focus:font-semibold"
                                placeholder="new password"
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
                  >
                    Sign Up
                  </Button>
                </form>
              </Form>
            </div>
            <div className="flex items-center space-x-2 justify-end p-3">
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="text-[#484c7f] font-bold">
                  <Button
                    type="submit"
                    onClick={() => navigate("/login")}
                    className=""
                  >
                    Back to login
                  </Button>
                </span>
              </label>
            </div>
          </div>
        </div>
      </InnerLayout>
    </>
  );
};

export default ForgotPassword;
