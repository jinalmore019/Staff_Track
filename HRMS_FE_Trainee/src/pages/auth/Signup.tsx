import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import loginImage from "../../assets/Group 11.png";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const  SignUp=()=> {
  return (
    <div className="flex justify-between px-4 ">
      <div className="w-1/2 flex flex-col  justify-center px-40 gap-6">
        <div className="flex-col gap-3 flex">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="">Enter your Register Details</p>
        </div>
        <div className="flex flex-col w-auto gap-5">
          <Input
            type="name"
            className="shadow appearance-none border border-[#d2d6da] rounded-[10px] py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
          />
          <Input
            type="email"
            className="shadow appearance-none border border-[#d2d6da] rounded-[10px] py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
          <Input
            type="password"
            className="shadow appearance-none border border-[#d2d6da] rounded-[10px] py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Agree the <span className="font-bold">Terms and Conditions</span>
            </label>
          </div>
        </div>

        <Button className="bg-blue-500 rounded-xl text-white" variant="outline">
          Sign Up
        </Button>

        <p className="px-20">
          Already have an account?
          <Link className="text-blue-600/100 font-bold" to="/">
    
            Sign In
          </Link>
        </p>
      </div>

      <div className="relative w=1/2 h-[100vh]">
        <img
          className="h-[100vh] w-[100vh] px-1 py-5"
          src={loginImage}
          alt=""
        />
        <div className="absolute top-[50%] text-white px-20  text-2xl font-bold text-center">
          <p className="">Attention is the new currency.</p>
          <p className="text-sm font-thin">
            The more effortless the writing looks, the more effort the writer
            actually put into the process..
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
