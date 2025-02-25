import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginImage from "../../assets/Group 11.png";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-4">
      <div className="w-1/2 flex flex-col  justify-center px-40 gap-4">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="">Enter your email and password to signIn</p>
        <div className="flex flex-col w-auto gap-4">
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
        </div>
        <label className="relative inline-flex items-center cursor-pointer ">
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 font-medium text-sm  text-gray-900 dark:text-gray-300">
            Remember me
          </span>
        </label>

        <Button
          className="bg-blue-500 rounded-xl text-white"
          variant="outline"
          onClick={() => navigate("/dashboard")}
        >
          Login
        </Button>

        <p className="px-20">
          Don't have an Account?
          <Link className="text-blue-600/100 font-bold" to="/dashboard">
            Sign up
          </Link>
        </p>
      </div>

      <div className="relative  w=1/2 h-[100vh]">
        <img
          className="h-[100vh] w-[100vh] px-1 py-5"
          src={loginImage}
          alt=""
        />
        <div className="absolute top-[50%] text-white px-20  text-2xl font-bold text-center">
          <p className="">Attention is the new currency.</p>
          <p className="text-sm font-thin">
            The more effortless the writing looks, the more effort the writer
            actually put into the process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
