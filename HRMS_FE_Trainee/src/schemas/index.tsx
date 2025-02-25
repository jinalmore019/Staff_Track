import { z } from "zod";

export const formSchema = z.object({
  email: z.string().min(2, {
    message: "Please enter email",
  }),
  password: z.string().min(2, {
    message: "Please enter password",
  }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(2, {
    message: "Please enter email",
  }),
  password: z.string().min(2, {
    message: "Please enter old password",
  }),
  newPassword: z.string().min(2, {
    message: "Please enter new password",
  }),
});
export const verifyEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("Please enter valid email."),
});
export const verifyOtpSchema = z.object({
  otp: z.number().min(6, {
    message: "Please enter right otp",
  }),
});

export const cmpRegiSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter companyName",
  }),
  founder: z.string().min(2, {
    message: "Please enter founderName",
  }),
  email: z.string().min(2, {
    message: "Please enter email",
  }),
  password: z.string().min(8, {
    message: "Please enter password",
  }),
  startDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Date is required",
  }),
  workCategory: z.string().min(2, {
    message: "Please enter workCategory",
  }),
  workingHour: z.coerce.number().min(8, {
    message: "Please enter working hour",
  }),
  minStaff: z.coerce.number().min(1, {
    message: "Please enter minimumStaff",
  }),
  maxStaff: z.coerce.number().min(2, {
    message: "Please enter maximumStaff",
  }),
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
  pincode: z.coerce.number().min(2, {
    message: "Please enter pincode",
  }),
  landmark: z.string().min(2, {
    message: "Please enter landmark",
  }),
});

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Please Enter first name",
    })
    .regex(/^[^\d]+$/, {
      message: "Please Enter first name without numbers",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Please Enter last name",
    })
    .regex(/^[^\d]+$/, {
      message: "Please Enter last name without numbers",
    }),
  mobileNo: z.string().min(2, {
    message: "Please Enter mobile number",
  }),
  email: z
    .string()
    .min(2, {
      message: "Please enter email",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  gender: z.string().refine((value) => value.length > 0, {
    message: "Please select gender type.",
  }),
  department: z.string().min(2, {
    message: "Please enter department",
  }),
  designation: z.string().min(2, {
    message: "Please enter designation",
  }),
  dob: z.date({
    required_error: "Date is required",
    invalid_type_error: "Date is required",
  }),

});
