import React from 'react'
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export const formSchema = z
    .object({
        title: z.string().min(2, {
            message: "Please enter Title",
        }),
        description: z.string().min(2 ,{
            message: "Please enter Description",
        }),
    })

    export type noticeIntialData = {
        title: string;
        description?: string | null;
    };
    
export const NoticeAddPopUp = ({ form, onSubmit, modal, setModal, isEdit }: any) => {

  return (
    <>
       <Dialog
            open={modal}
            onOpenChange={() => {
                setModal(false);
                form.reset();
            }}
        >
            <DialogContent style={{ borderRadius: "1rem" }} className="sm:max-w-[425px] bg-[#F4F4F4] rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-[#422b72] font-bold text-2xl">{isEdit === "EDIT" ? "Edit" : "Add"} Notice </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-4 py-4 ">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel>Title</FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel>Description</FormLabel>
                                        <div className="col-span-3">
                                            <FormControl>
                                                <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="hover:bg-white  md:outline-2  font-bold border-2	 outline-[#422b72] rounded-[10px] hover:text-[#422b72] bg-[#422b72] text-white">
                            Save Notice
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </>
  )
}
