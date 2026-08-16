import * as v from "valibot";

export const registerSchema = v.object({
    email: v.pipe(v.string("Excpected string"), v.email("Excepted email")),
    username: v.pipe(
        v.string("Excpected string"), 
        v.minLength(3, "Username must be at least 3 characters"),
        v.maxLength(50, "Username must be at most 50 characters")
    ),
    password: v.pipe(
        v.string("Excpected string"),
        v.minLength(10, "Password must be at least 10 characters"),
        v.maxLength(255, "Password must be at most 255 characters"),
        v.check((val) => !v.EMOJI_REGEX.test(val), "Do not use emojis")
    )
})

export const loginSchema = v.object({
    combined: v.union([
        v.pipe(v.string("Excpected string"), v.email("Excepted email")),
        v.pipe(
            v.string("Excpected string"), 
            v.minLength(3, "Username must be at least 3 characters"),
            v.maxLength(50, "Username must be at most 50 characters")
        )
    ]),
    password: v.pipe(
        v.string("Excpected string"),
        v.minLength(10, "Password must be at least 10 characters"),
        v.maxLength(255, "Password must be at most 255 characters"),
        v.check((val) => !v.EMOJI_REGEX.test(val), "Do not use emojis")
    )
})

export type RegisterType = v.InferInput<typeof registerSchema>;
export type LoginType = v.InferInput<typeof loginSchema>;