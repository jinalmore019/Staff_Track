import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Please enter user name",
    }),
    founder: z.string().min(1, { message: "Please enter founder name" }),

    email: z.string().min(1, { message: "Please enter email." }).email("This is not a valid email"),
   //  password: z.string().min(8),
    startDate: z.date({
        required_error: "Date is required",
        invalid_type_error: "Date is required",
    }),
    workCategory: z.string().min(1, {
        message: "Please select work category",
    }),    
    workingHour: z.coerce.number().min(8, {
        message: "Please enter working hour",
    }),
    maxStaff: z.coerce.number().positive(),
    minStaff:z.coerce.number().gte(2, 'Must be 2 and above').positive(),
    address: z.string().min(2, {
        message: "Please enter address",
    }),
    city: z.string().min(2, {
        message: "Please enter city",
    }),
    state: z.string().min(2, {
        message: "Please enter state",
    }),
    country: z.string().min(2, {
        message: "Please enter country",
    }),
    pincode: z.string().regex(/^\d+$/, {
        message: "Please enter a valid pincode (digits only)",
    }).min(2, {
        message: "Please enter a valid pincode",
    }),
    
    landmark: z.string().min(2, {
        message: "Please enter landmark",
    }),
});
