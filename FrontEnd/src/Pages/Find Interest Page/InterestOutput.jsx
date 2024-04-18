import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

const InterestOutput = ({ interestsList, setPage }) => {

    // const array = [
    //     {
    //         FutureDemand: "High - Growing demand for healthcare managers due to an aging population and complex healthcare systems",
    //         Name: "Hospital Management",
    //         RequiredSkills: [
    //             'Strong analytical and problem-solving skills',
    //             'Understanding of healthcare systems and regulations', 
    //             'Leadership and business acumen', 
    //             'Excellent communication and interpersonal skills'
    //         ],
    //         UpskillingCourses:[
    //             'Healthcare Finance and Revenue Cycle Management', 
    //             'Healthcare Policy and Regulatory Affairs', 
    //             'Medical Staff Management and Leadership in Healthcare Organizations'
    //         ]
    //     },
    //     {
    //         FutureDemand: "High - Growing demand for healthcare managers due to an aging population and complex healthcare systems",
    //         Name: "Hospital Management",
    //         RequiredSkills: [
    //             'Strong analytical and problem-solving skills',
    //             'Understanding of healthcare systems and regulations', 
    //             'Leadership and business acumen', 
    //             'Excellent communication and interpersonal skills'
    //         ],
    //         UpskillingCourses:[
    //             'Healthcare Finance and Revenue Cycle Management', 
    //             'Healthcare Policy and Regulatory Affairs', 
    //             'Medical Staff Management and Leadership in Healthcare Organizations'
    //         ]
    //     },
    //     {
    //         FutureDemand: "High - Growing demand for healthcare managers due to an aging population and complex healthcare systems",
    //         Name: "Hospital Management",
    //         RequiredSkills: [
    //             'Strong analytical and problem-solving skills',
    //             'Understanding of healthcare systems and regulations', 
    //             'Leadership and business acumen', 
    //             'Excellent communication and interpersonal skills'
    //         ],
    //         UpskillingCourses:[
    //             'Healthcare Finance and Revenue Cycle Management', 
    //             'Healthcare Policy and Regulatory Affairs', 
    //             'Medical Staff Management and Leadership in Healthcare Organizations'
    //         ]
    //     }
    // ]

  return (
    <div className='w-full h-screen p-[2rem]'>
      <p className='text-2xl font-semibold text-[#5C72EA] flex items-center'><span className='text-black mr-2 hover:text-[#5C72EA] cursor-pointer' onClick={()=>setPage('selection')}><IoArrowBack/></span>According to your selections, these are the suggestions.</p>
      <div className='mt-[2rem] h-[90%] gap-[1.3rem] grid grid-cols-3'>
        {
            interestsList.map((item,index)=>{
                return(
                    <div key={index} className="w-full bg-[#DADADA] h-full rounded-md p-[2rem]">
                        <p className='font-semibold'>{index+1}. {item.Name}</p>
                        <p className='mt-[2rem]'><span className='font-semibold'>Future Demand:</span> {item.FutureDemand}</p>
                        <p className='mt-8 font-semibold'>Required Skills:</p>
                        <ul className='list-disc mt-2'>
                            {item.RequiredSkills.map((item, index)=>{
                                return (
                                    <li className='mt-2' key={index}>{item}</li>
                                )
                            })}
                        </ul>

                        <p className='mt-8 font-semibold'>Upskilling Courses:</p>
                        <ul className='list-disc mt-2'>
                            {item.UpskillingCourses.map((item, index)=>{
                                return (
                                    <li className='mt-2' key={index}>{item}</li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}
export default InterestOutput
