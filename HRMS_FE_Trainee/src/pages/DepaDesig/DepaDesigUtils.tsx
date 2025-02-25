import * as z from "zod";

export const formSchema = z
    .object({
        name: z.string().min(2, {
            message: "Please enter department name.",
        }),
})

export type departData = {
        name: string;
};
