import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as z from "zod";
import { useState } from "react";
import Tooltips from "@/common/Tooltips";
import { CloseIcon, DeleteIcon, PlusCircleIcon } from "@/common/icons";
import { useDeleteTagsMutation, useGetTagsByNameQuery, usePostTagsMutation } from "@/store/services/Tags.service";
import { useToast } from "@/components/ui/use-toast";
import DeleteModal from "@/common/DeleteModal";

export const tagFormSchema = z.object({
    name: z.optional(
        z.string().min(2, {
            message: "please enter Tag.",
        })
    )
});
export type tagInitialData = {
    name: string;
};



export const TagAddPopUp = ({
    form,
    modal,
    setModal
}: any) => {

    const [deleteModal, setDeleteModal] = useState({
        id: "",
        isDelete: false,
    });

    const { toast } = useToast()

    const { data: getTags } = useGetTagsByNameQuery("");
    const [AddTags] = usePostTagsMutation();
    const [DeleteTags] = useDeleteTagsMutation();


    const onSubmit = async () => {
        const lisTT = getTags;
        const newData = form.getValues();
        const response = await AddTags(newData);
        toast({
            className: response?.error ? "bg-red-500 text-white" : "bg-green-500 text-white ",
            title: response?.error ? response?.error?.data?.message : "Tag added successfully",
        })

        form.reset();
    };

    const onDelete = async (id: number) => {
        try {
            await DeleteTags({ id });
            setDeleteModal((prev) => ({ ...prev, isDelete: false }));
        } catch (e) {
            console.error("Error deleting data:", e);
        }
    };

    return (

        <>
            <Dialog
                open={modal}
                onOpenChange={() => {
                    setModal(false);
                    form.reset();
                }}
            >
                {/* </Dialog> */}

                <DialogContent
                    style={{ borderRadius: "1rem" }}
                    className="sm:max-w-[425px] bg-[#F4F4F4] rounded-xl"
                >
                    <DialogHeader>
                        <DialogTitle className="text-[#422b72] font-bold text-2xl">
                            Tags
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex gap-7">
                        <div className="flex-1">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <div className="col-span-3">
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72] w-full"
                                                            placeholder="Enter Tag"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                        <div className="">
                            <Tooltips title={"Add Tags"}>
                                <Button onClick={onSubmit}>
                                    <PlusCircleIcon
                                        className=""
                                    />
                                </Button>
                            </Tooltips>
                        </div>
                    </div>
                    <div className="bg-white shadow-2xl p-5 flex flex-wrap overflow-hidden h-60 overflow-y-auto scrollbar">
                        {getTags &&
                            getTags?.data?.map((item, i: number) => (
                                <div className="items-center py-1 px-4 bg-[#605080] rounded m-1 flex gap-5">
                                    <span className="font-bold text-white"> {item.name}</span>
                                    <div className="flex justify-end">
                                        <Button
                                            className="p-0 bg-transparent"
                                            onClick={() => {
                                                setDeleteModal({
                                                    id: item?.id,
                                                    isDelete: true,
                                                });
                                            }}
                                        >
                                            <CloseIcon className="text-white text-lg"/>
                                        </Button>
                                        <DeleteModal
                                            isOpen={deleteModal}
                                            setIsOpen={setDeleteModal}
                                            onSubmit={(i) => onDelete(i)}
                                        />
                                    </div>
                                </div>

                            ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
