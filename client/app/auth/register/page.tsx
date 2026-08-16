import RegisterForm from "../components/register-form"
import Link from "next/link"

export default function() {
    return (
        <>
            <RegisterForm />
            <Link href="/auth/login">Already have an account? Login</Link>
        </>
    )
}