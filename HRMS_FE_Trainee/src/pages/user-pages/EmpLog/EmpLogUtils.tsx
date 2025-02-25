import {z} from "zod";
export const formSchema= z 
  .object ({
    startDate: z.date({
        required_error: "Date is required",
        invalid_type_error: "Date is required",
    }),
    endDate: z
         .date ({
            invalid_type_error: "Date is invalid",
         })
  })