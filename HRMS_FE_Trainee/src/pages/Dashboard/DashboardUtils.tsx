import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
export const NoticePopUp = ({ modal, setModal, form, onSubmit }: any) => {
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
                        <DialogTitle className="text-[#422b72] font-bold text-2xl">{isEdit === "EDIT" ? "Edit" : isEdit === "VIEW" ? "Details of" : "Add"} Notice</DialogTitle>
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
                                                    <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter first name" {...field} />
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
                                                    <Input type="text" className="col-span-3 border text-[#422b72] rounded-[10px] focus:outline-[#7b7ea8] focus:text-[#422b72]" placeholder="Enter middle name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {!isDisable && (
                                <Button type="submit" className="hover:bg-white  md:outline-2  font-bold border-2	 outline-[#422b72] rounded-[10px] hover:text-[#422b72] bg-[#422b72] text-white">
                                    Save changes
                                </Button>
                            )}
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};
