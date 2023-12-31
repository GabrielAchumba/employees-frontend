"use client"

import { useState, } from 'react';
import Router, { useRouter } from 'next/navigation'
import Link from 'next/link'
import { post } from "../../../backend_services/api_services"


export default function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await post({
      url: "users/store", 
      req: {
          email,
          password
        }
    })
    if(response){
        console.log("response: ", response)
        router.replace("/");
    }
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">Register</h1>
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
            <div className="mt-2">
                <button 
                onClick={handleSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Sign up
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}
