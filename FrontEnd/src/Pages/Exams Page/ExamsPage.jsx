import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import httpClient from '../../httpClient';

const ExamsPage = () => {

    const [exams, setExams] = useState([]);

    useEffect(()=>{

        const getExams = async() => {
            try{
                const resp = await httpClient.get('/api/v1/EntranceExams');
                console.log(resp.data.data);
                setExams(resp.data.data);
            } catch(err) {
                console.error(err);
            }
        }

        getExams();

    },[])

  return (
    <Layout>
        <div className='p-[2rem] w-full'>
            <p className='text-2xl font-semibold text-[#5C72EA]'>Entrance Exams</p>
            {
                exams?.map((item, index)=>{

                    const examsList = JSON.parse(item.exam);

                    return(
                        <div className='mt-[2rem]' key={index}>
                            <p className='text-xl text-[#5C72EA]'>{item.course}</p>
                            <div className='grid grid-cols-3 gap-[1rem] grid-flow-row'>
                                {
                                    examsList?.map((item,index)=>{
                                        if(item !== ''){
                                            return(
                                                <div key={index} className='mt-5 py-[1.8rem] px-[1rem] h-[20rem] flex flex-col justify-between rounded-md w-full bg-[#DADADA]'>
                                                    <p className='font-semibold'>{index+1}. {item.ExamName}</p>
                                                    <p><span className='font-semibold'>Purpose:</span> {item.Purpose}</p>
                                                    <p><span className='font-semibold'>Eligibility:</span> {item.Eligibility}</p>
                                                    <p><span className='font-semibold'>Application Mode:</span> {item.ApplicationMode}</p>
                                                </div>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </Layout>
  )
}

export default ExamsPage


// exam : [
//     {
//         'ExamName': 'Central University Entrance Test (CUET) for UG courses', 
//         'Purpose': 'Admission into all UG Programmes in all Central Universities', 
//         'Eligibility': 'Class 12', 
//         'ApplicationMode': 'Online'
//     }, 
//     {
//         'ExamName': 'BHU Undergraduate Entrance Test (BHU UET)', 
//         'Purpose': 'Admission in UG programmes in BHU', 
//         'Eligibility': 'Class 12, 12+', 
//         'ApplicationMode': 'Online, By Post'
//     }, 
//     {
//         'ExamName': 'Banasthali Vidyapith Admission', 
//         'Purpose': 'Admission in Class 6, 9 & 11, Graduation, Post Graduation', 
//         'Eligibility': 'Class 5, 8, 10 Passed (Only Girls)', 
//         'ApplicationMode': 'Online, Post'
//     }, 
//     '', 
//     ''
// ]