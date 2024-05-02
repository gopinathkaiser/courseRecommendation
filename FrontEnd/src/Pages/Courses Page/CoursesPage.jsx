import React, { useEffect } from 'react'
import Layout from '../../Layout'
import coursesList from './coursesList';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        const username = localStorage.getItem('name');
        if(username === ''){
            console.log(username);
            navigate('/')
        }
        
    },[])

  return (
   <Layout>
    <div className='p-[2rem]'>

        <p className='text-2xl font-semibold text-[#5C72EA] flex items-center'>Courses</p>

        
            <div className='grid grid-cols-4 grid-flow-row gap-[1rem] mt-[2rem]'>
                {
                    coursesList.map((item, index)=>{
                        return(
                            <div key={index} onClick={()=>navigate(`/courses/${item.route}`)} className='bg-[#DADADA] p-4 h-[17rem] rounded-md flex flex-col justify-center items-center gap-[1rem] cursor-pointer hover:scale-[1.03] transition-all'>
                                <p className='text-3xl'>{item.icon}</p>
                                <p className='text-center'>{item.name}</p>
                            </div>
                        )
                    })
                }
            </div>
    </div>
   </Layout>
  )
}

export default CoursesPage