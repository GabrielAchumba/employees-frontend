"use client"
import  { FC, ReactNode, useEffect, useState, useContext} from 'react';
import Router, { useRouter } from 'next/navigation'
import { get } from "../../../backend_services/api_services";
import {Employee} from "../../../application_types/employee"
import { useAppContext } from '../../../store/appContext'

interface LandingProps {

}


const Landing: FC<LandingProps> = ({}) => {

    const TdStyle = {
        ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-black lg:py-7 lg:px-4`,
        TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
        TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
        TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
    }

    const router = useRouter()

    const { setDataStore } = useAppContext();

    const [employees, setEmployees] = useState<Employee[]>([])
    const tableHeaders = [
        {label: "Employee Email", name: "email"},
        {label: "First Name", name: "firstName"},
        {label: "Last Name", name: "lastName"},
        {label: "Actions", name: "actions"}
    ]

    const editEmployee = (employee:Employee) => {
        console.log("employee:", employee)
        setDataStore(employee)
        router.push("edit")

    }

    useEffect(() => {

        async function getEmployees() {
            const url = "users/index"
            const response = await get(url) as any;
            console.log(response.data)
            setEmployees(response.data);
        }

        getEmployees()
        
    }, [])

    return ( 
        
            <section className='bg-white dark:bg-dark py-20 lg:py-[120px]'>
                <div className='container'>
                    <div className='flex flex-wrap -mx-4'>
                    <div className='w-full '>
                        <div className='max-w-full overflow-x-auto'>
                        <table className='w-full table-auto'>
                            <thead className='text-center bg-primary'>
                            <tr>
                                {tableHeaders.map((tableHeader) => {
                                    return (<th key={tableHeader.name} className={TdStyle.ThStyle}> {tableHeader.label} </th>)
                                })}
                            </tr>
                            </thead>

                            <tbody>
                                {employees.map(employee => {
                                    return (
                                        <tr key={employee._id}>
                                            <td className={TdStyle.TdStyle2}>{employee.email}</td>
                                            <td className={TdStyle.TdStyle2}>{employee.firstName}</td>
                                            <td className={TdStyle.TdStyle2}>{employee.lastName}</td>
                                            <td className={TdStyle.TdStyle2}>
                                            <a onClick={() => {editEmployee(employee)}} className={TdStyle.TdButton}>
                                                Edit
                                            </a>
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
     );
}
 
export default Landing;