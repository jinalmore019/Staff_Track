import React from "react";
import homeLogo from "@/assets/logoo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const handleScrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <header>
        <nav className="bg-[#422b72] text-white ">
          <div className="flex">
            <div>
              <img src={homeLogo} className="w-32 h-24" alt="Logo" />
            </div>
            <ul className="flex p-8 basis-3/6 text-lg	 gap-9 ml-4 cursor-pointer	">
              <li onClick={() => handleScrollToSection("heroSection")}>Home</li>
              <li onClick={() => handleScrollToSection("useCase")}>useCase</li>
              <li onClick={() => handleScrollToSection("whatNew")}>
                What's new
              </li>
              <li onClick={() => handleScrollToSection("whyUs")}>Why Us</li>
            </ul>
            <div className="flex justify-end p-6 basis-5/12 gap-5	">
              <Button
                type="submit"
                onClick={() => navigate("/login")}
                className="hover:bg-white  md:outline-2  font-bold border-2	w-32 outline-[#422b72] rounded-[10px] hover:text-[#422b72] bg-[#422b72] text-white"
              >
                LogIn
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
