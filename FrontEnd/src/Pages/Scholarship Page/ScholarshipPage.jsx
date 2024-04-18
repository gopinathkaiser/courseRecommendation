import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import httpClient from '../../httpClient'

const ScholarshipPage = () => {

    const [scholarship, setScholarship] = useState();

    useEffect(()=>{
        const getScholarship = async() => {
            try{
                const resp =await httpClient.get('/api/v1/scholarship');
                setScholarship(resp?.data?.data);
            } catch(err){
                console.error(err);
            }
        }

        getScholarship();
    },[])

  return (
    <Layout>
        <div className='p-[2rem]'>

            <p className='text-2xl font-semibold text-[#5C72EA]'>Scholarships</p>

            <div className='grid grid-cols-3 grid-flow-row gap-[1rem] mt-[2rem]'>
                {
                    scholarship?.map((item)=>{
                        return(
                            <div key={item.id} className='h-[29rem] relative p-[2rem] bg-[#DADADA] rounded-md'>
                                <p className='font-semibold'>{item.id}. {item.sname}</p>
                                <p className='text-sm mt-1 opacity-60'>{item.aname==='nil'? 'Private': item.aname}</p>
                                <p className='text-sm opacity-60'>{item.authority}</p>
                                <table className='w-full mt-[1rem] text-sm'>
                                    <tbody>
                                        <tr>
                                            <td className='py-4'>
                                                <p className='font-semibold'>Category:</p>
                                                <p>{item.category}</p>
                                            </td>
                                            <td className='py-4'>
                                                <p className='font-semibold'>Cutoff:</p>
                                                <p>{item.cutoff}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-4'>
                                                <p className='font-semibold'>State:</p>
                                                <p>{item.state}</p>
                                            </td>
                                            <td className='py-4'>
                                                <p className='font-semibold'>Income Limit:</p>
                                                <p>{item.incomelimit}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className='mt-2'><span className='font-semibold'>Benefits:</span> {item.benefit}</p>
                                <p className='mt-2'><span className='font-semibold'>Applicable for: <br /></span>{item.applbranch}</p>
                                <a href={item.link} className='mt-auto text-sm text-blue-500 absolute bottom-[2rem]'>Click Here is view more details</a>
                            </div>
                        )
                    })
                }
            </div>

            
        </div>
    </Layout>
  )
}

export default ScholarshipPage



// {
//     "id": 1,
//     "sname": "Vocational Education Fee Reimbursement.",
//     "authority": "Government",
//     "aname": "Tribal Development Department",
//     "category": "ST",
//     "cutoff": "pass",
//     "state": "Maharashtra",
//     "applbranch": "Engineering, Pharmacy , Animal Husbandry, Dairy Development, Vaastu Shastra, MBA, MCA",
//     "incomelimit": "250000",
//     "benefit": "Tuition Fee and Exam Fee",
//     "link": "https://mahadbtmahait.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AC6B28ED14CE96709",
// }