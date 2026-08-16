import Link from "next/link"
import LoginForm from "../components/login-form"

export default function() {
    return (
        <>
            <LoginForm />
            <Link href="/auth/register">Don't have an account? Register</Link>
        </>
    )
}