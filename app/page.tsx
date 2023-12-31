"use client"

import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/navigation'
import { post, sessionKey } from "../backend_services/api_services"

import Link from 'next/link'

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [loginPayload, setLoginPayload] = useState<any>({});

  /* () => {
    const localData = localStorage.getItem('loginPayload');
    return localData ? JSON.parse(localData) : {};
  } */

  const router = useRouter()
  console.log(router)

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const payload = {
      url: "users/login", 
      req: {
          email,
          password
        }
    }

    const response = await post(payload) as any

    if(response){
      setLoginPayload(response.data)
    }
  }

useEffect(() => {
    const inMin = 24 * 60;
    let expiredAt = new Date(new Date().getTime() + (60000 * inMin));
    let obj = {
      value: loginPayload,
      expiredAt: expiredAt.toISOString()
    }
    sessionStorage.setItem(sessionKey, JSON.stringify(obj));
    console.log("loginPayload: ", loginPayload)
    if(Object.entries(loginPayload).length > 0){
      router.push("employees/landing");
    }
    
  }, [loginPayload]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
            <form className="mt-6">
            <div className="mb-4">
                <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
                >
                Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
                >
                Password
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <Link
                href="/"
                className="text-xs text-blue-600 hover:underline"
            >
                Forget Password?
            </Link>
            <div className="mt-2">
                <button 
                onClick={handleSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Login
                </button>
            </div>
            </form>

            <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
                href="/authentication/signup"
                className="font-medium text-blue-600 hover:underline"
            >
                Sign up
            </Link>
            </p>
        </div>
    </div>
  )
}
