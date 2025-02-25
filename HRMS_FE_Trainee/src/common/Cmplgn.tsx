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
import { formSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "@/store/services/Login.service";
import { useAuth } from "@/Context/ContextToken";
import { useToast } from "@/components/ui/use-toast";
import image from "../assets/Computer login-amico (1).png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Cmplgn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [postLogin] = usePostLoginMutation();
  const { setToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const formData = form.getValues();
  const onSubmit = async (e) => {
    const trimmedFormData = {
      email: formData.email.trim(),
      password: formData.password.trim()
    };
    try {
      const response = await postLogin(trimmedFormData);
      
      if (response?.data?.success === false) {
        toast({
          className: "bg-red-500 text-white",
          title: response?.data?.message
        });
      }
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        const decodedToken: any = jwtDecode(response.data.token ?? "");
        
        if (decodedToken?.role === "Company") {
          setToken(response.data.token);
          navigate("/dashboard");
        }
        if (decodedToken?.role === "Employee") {
          navigate("/emp-dashboard");
        }
      }
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  return (
    <>
      <div className="grid h-[100vh] p-5 ">
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 lg:px-40 gap-4">
          <h1 className="text-[#484c7f] font-bold text-3xl">Sign In</h1>
          <p className="text-[#484c7f]">
            Enter your email and password to signIn
          </p>

          <div className="flex flex-col gap-4 ">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="gap-4 py-4 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 grid grid-cols-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid w-full items-center gap-4">
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              type="text"
                              className="col-span-3 trim border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold"
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
                      <FormItem className="grid w-full items-center gap-4">
                        <div className="relative col-span-3">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"} 
                              className="trim col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] focus:font-semibold pr-12"
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute inset-y-0 right-0 flex items-center text-lg text-[#484c7f] bg-transparent "
                          >
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                          </Button>

                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="hover:text-[#484c7f] w-full font-bold text-2xl py-6 rounded-xl bg-[#484c7f] text-white"
                  variant="outline"
                >
                  Sign In
                </Button>
              </form>
            </Form>
            <div className="flex items-center space-x-2 justify-end p-3">
              <span className="text-[#484c7f] font-bold">
                <Button onClick={() => navigate("/verify")} className="">
                  Forgot password ?
                </Button>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 md:w-1/2 hidden lg:flex justify-center items-center p-5 rounded-2xl h-[95vh] fixed right-5">
          <div className="h-4/5 w-3/4">
            <img src={image} alt="Computer login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cmplgn;
