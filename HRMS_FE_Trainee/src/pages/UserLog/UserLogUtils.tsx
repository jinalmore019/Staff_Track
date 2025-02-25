import {z} from "zod";
export const formSchema= z 
  .object ({
    searchDate: z.date({
        required_error: "Date is required",
        invalid_type_error: "Date is required",
    })
  })