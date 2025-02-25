import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const DeleteModal = ({ isOpen, setIsOpen, title, discriptions, isCancel = true, onSubmit, submitText = "Delete", }: any) => {
    const onCancel = () => setIsOpen(false);
    return (
        <>
            <AlertDialog open={isOpen.isDelete} onOpenChange={() => setIsOpen(false)}>
                <AlertDialogContent style={{ borderRadius: "1rem" }} className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title || "Are you absolutely sure?"}</AlertDialogTitle>
                        <AlertDialogDescription>{discriptions || "This will permanently delete your data and remove data from our servers."}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {isCancel && (
                            <AlertDialogCancel
                                className="border-2 text-red-700 rounded-xl hover:bg-red-700 
                                         hover:text-white w-24"
                                onClick={onCancel}
                            >
                                Cancel
                            </AlertDialogCancel>
                        )}
                        <AlertDialogAction onClick={() => onSubmit(isOpen?.id, isOpen?.name)} className="border-2 text-green-700 rounded-xl hover:bg-green-700 hover:text-white w-24">
                            {submitText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteModal;
