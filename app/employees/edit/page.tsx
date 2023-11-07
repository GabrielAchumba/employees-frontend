"use client"

import  { FC, useContext, useState} from 'react';
import Router, { useRouter } from 'next/navigation'
import { useAppContext } from '../../../store/appContext'
import { DataStore } from '@/application_types/dataStore';
import Link from 'next/link';
import { post } from '@/backend_services/api_services';
import { Employee } from '@/application_types/employee';

interface EditProps {

}

const Edit: FC<EditProps> = ({}) => {

    const { dataStore } = useAppContext();
    console.log("dataStore: ", dataStore)
    const  employee  = dataStore as Employee
    console.log("employee 1: ", employee)

    const [email, setEmail] = useState(employee.email);
    const [firstName, setFirstName] = useState(employee ? employee.firstName : "")
    const [lastName, setLastName] = useState(employee ? employee.lastName : "")
    const router = useRouter()

  const handleSubmit = async () => {
    const response = await post({
      url: "users/store", 
      req: {
          email,
          firstName,
          lastName,
        }
    })
    if(response){
        console.log("response: ", response)
        router.push("employess/landing");
    }
  }

   
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">Update Employee</h1>
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
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
                >
                First Name
                </label>
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
                >
                Last Name
                </label>
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mt-2">
                <button 
                onClick={handleSubmit}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Update
                </button>
            </div>
            </form>
        </div>
    </div>
  )
}
 
export default Edit;