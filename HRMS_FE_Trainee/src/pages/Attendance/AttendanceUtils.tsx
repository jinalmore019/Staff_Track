import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CloseIcon } from "../../common/icons";
import dp from "../../assets/speaker-greg.avif"




export const ProfilePopUp = ({ modal, setModal }: any) => {
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="overlay fixed inset-0 bg-black opacity-70"></div>
          <div className="fixed w-[45%]" onClick={(e) => e.stopPropagation()} >
            <div className="bg-[#422b72] p-8 shadow-md relative h-[90vh]">
              <div className="flex justify-between my-10">
                <div className="flex-1 pl-16 text-3xl font-bold text-white">Profile</div>
                <div className=" text-2xl text-white" onClick={() => setModal(false)}>
                  <CloseIcon/>
                </div>

              </div>
              <div className="h-32 w-32 bg-black absolute top-28 left-32 rounded-full z-30 my-5 justify-center overflow-hidden shadow-2xl">
                <img src={dp} alt="" className="object-cover w-full h-full" />
              </div>

              

              <div className="bg-white absolute ml-24 mt-10 pt-12 right-[-50px] w-[94%] shadow-md ">
                <div className="p-10">
                  <p className="text-gray-400">EMAIL</p>
                  <h3 className="pb-2 text-xl">rajvi@gmail.com</h3>
                  <hr className="" />
                  <div className="flex py-2">
                    <div className="flex-1 border-r border-gray-300">
                      <p className="text-gray-400">FIRST NAME</p>
                      <h3 className="text-xl">rajvi</h3>
                    </div>
                    <div className="flex-1 pl-4">
                      <p className="text-gray-400">LAST NAME</p>
                      <h3 className="text-xl">Kumbhani</h3>
                    </div>
                  </div>
                  <hr className="" />
                  <div className="flex py-2">
                    <div className="flex-1 border-r border-gray-300">
                      <p className="text-gray-400">DEPARTMENT</p>
                      <h3 className="text-xl">Backend development</h3>
                    </div>
                    <div className="flex-1 pl-4">
                      <p className="text-gray-400">Designation</p>
                      <h3 className="text-xl">Node developer</h3>
                    </div>
                  </div>
                  <hr className="" />
                  <p className="text-gray-400 pt-2">MOBILE NO.</p>
                  <h3 className="pb-2 text-xl">98980 98980</h3>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}


