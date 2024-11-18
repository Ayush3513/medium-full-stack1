import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BACKEND_URL } from '@/config'
import { SignupInput } from '@ayush3513/med-common'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [authInput, setAuthInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        try {
            const payload = type === "signup" ? authInput : { email: authInput.email, password: authInput.password };
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, payload);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || "An error occurred during authentication");
            } else {
                setError("An unexpected error occurred");
            }
        }
    }

    return (
        <>
            <div className="flex items-center justify-center px-8 py-12 lg:px-12">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">
                            {type === "signup" ? "Create an account" : "Login to account"}
                        </h1>
                        <p className="text-gray-500">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            <Link to={`/${type === "signup" ? "signin" : "signup"}`} className="text-gray-900 ml-3 underline underline-offset-4">
                                {type === "signup" ? "Login" : "Sign Up"}
                            </Link>
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {type === "signup" && (
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input 
                                    onChange={(e) => setAuthInput(prev => ({ ...prev, name: e.target.value }))}
                                    id="username" 
                                    placeholder="Enter your username" 
                                    required 
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                onChange={(e) => setAuthInput(prev => ({ ...prev, email: e.target.value }))}
                                id="email" 
                                placeholder="m@example.com" 
                                required 
                                type="email" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                onChange={(e) => setAuthInput(prev => ({ ...prev, password: e.target.value }))}
                                id="password" 
                                required 
                                type="password" 
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button className="w-full" type="submit">
                            {type === "signup" ? "Sign Up" : "Login"}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden bg-gray-50 lg:block">
                <div className="flex h-full items-center justify-center px-8">
                    <div className="max-w-md space-y-4">
                        <blockquote className="text-2xl font-medium leading-normal">
                            &ldquo;The customer service I received was exceptional. The support team went above and beyond to address my
                            concerns.&rdquo;
                        </blockquote>
                        <div className="space-y-1">
                            <p className="text-lg font-medium">Jules Winnfield</p>
                            <p className="text-gray-500">CEO, Acme Inc</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth