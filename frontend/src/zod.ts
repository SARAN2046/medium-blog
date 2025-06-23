import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;
