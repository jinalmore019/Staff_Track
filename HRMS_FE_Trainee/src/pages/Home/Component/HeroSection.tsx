// import { IoMdArrowDropright } from "react-icons/io";
// import heroImage from "../../../assets/screen-track-app.avif";
// import { Button } from "@/components/ui/button";
// import {  useNavigate  } from "react-router-dom";

// const HeroSection = () => {
//     const navigate=useNavigate ()
//     return (
//         <div className="bg-[#422b72] text-white p-28 top-20">
//             <div className="flex mx-[31.667px] px-8 pt-8 gap-8">
//                 <div className="basis-2/4 ">
//                     <h1 className="font-bold my-6 text-5xl text-left font-sans leading-tight">
//                        STAFF TRACK
//                     </h1>
//                     <h1 className="font-semibold my-6 text-4xl text-left font-sans leading-tight">
//                         Time tracking that's  easy, powerful<br /> and 
//                         frictionless.
//                     </h1>
//                     <p className="leading-6 max-w-[90%]">Staff track HR Software effectively eases human resource processes for all businesses payroll submissions, leave & claims tracking, and attendance recording.</p>
//                     <div className="mt-8 mb-3 font-bold flex justify-start items-center gap-x-8 gap-y-5	">
//                         <Button type="submit" onClick={()=>navigate("/Cmpinfo")} className="bg-[#E57CD8] px-9 py-4 text-base items-center rounded-full text-center  hover:bg-[#7B7EA8] h-14">
//                         Register your company
//                             </Button>
                        
//                         <a className="text-base items-center text-center hover:text-[#E57CD8] h-14 w-60 no-underline flex" href="/">
//                             Or explore toggle track <IoMdArrowDropright />
//                         </a>
//                     </div>
//                 </div>
//                 <div className=" basis-2/4">
//                     <img src={heroImage} alt="" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeroSection;


import { IoMdArrowDropright } from "react-icons/io";
import heroImage from "../../../assets/screen-track-app.avif";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#422b72] text-white p-28 top-20">
      <div className="flex mx-[31.667px] px-8 pt-8 gap-8">
        <div className="basis-2/4 ">
          <h1 className="font-bold my-6 text-5xl text-left font-sans leading-tight">
            STAFF TRACK
          </h1>
          <h1 className="font-semibold my-6 text-4xl text-left font-sans leading-tight">
            Time tracking that's easy, powerful
            <br /> and frictionless.
          </h1>
          <p className="leading-6 max-w-[90%]">
            Staff track HR Software effectively eases human resource processes
            for all businesses payroll submissions, leave & claims tracking, and
            attendance recording.
          </p>
          <div className="mt-8 mb-3 font-bold flex justify-start items-center gap-x-8 gap-y-5	">
            <Button
              type="submit"
              onClick={() => navigate("/Cmpinfo")}
              className="bg-[#E57CD8] px-9 py-4 text-base items-center rounded-full text-center  hover:bg-[#7B7EA8] h-14"
            >
              Register your company
            </Button>

            <a
              className="text-base items-center text-center hover:text-[#E57CD8] h-14 w-60 no-underline flex"
              href="/"
            >
              Or explore staff track <IoMdArrowDropright />
            </a>
          </div>
        </div>
        <div className=" basis-2/4">
          <img src={heroImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

