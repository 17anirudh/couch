import type { RegisterType, LoginType } from "@/types/auth";
import { registerSchema, loginSchema } from "@/types/auth";
import { parse } from "valibot";
import { API_URL } from "./config";

export async function register(data: RegisterType): Promise<void> {
    try {
        const parsedData = parse(registerSchema, data);
        const response: Response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "credentials": "include",
            },
            body: JSON.stringify(parsedData),
        });
        if(!response.ok) {
            throw new Error(`Failed to register user with status: ${response.status}`);
        }
    }
    catch (err: unknown) {
        throw new Error(`Failed to contact server: ${err}`);
    }
}

export async function login(data: LoginType): Promise<void> {
    try {
        const parsedData = parse(loginSchema, data);
        const response: Response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "credentials": "include",
            },
            body: JSON.stringify(parsedData),
        });
        if(!response.ok) {
            throw new Error(`Failed to register user with status: ${response.status}`);
        }
    }
    catch (err: unknown) {
        throw new Error(`Failed to contact server: ${err}`);
    }
}