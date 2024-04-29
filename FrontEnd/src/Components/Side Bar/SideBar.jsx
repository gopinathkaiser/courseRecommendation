import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { RiShutDownLine } from "react-icons/ri";

const SideBar = () => {

    const navigate = useNavigate();

    const loc = window.location.href.split('/')[3]

    const username = localStorage.getItem('name')

  return (
    <div className='w-[17rem] h-screen fixed py-[2rem] flex flex-col justify-between left-0 bg-[#DADADA]'>

        <div>
            <p className='ml-[2rem] text-2xl text-[#5C72EA] font-bold cursor-pointer' onClick={()=> navigate('/home')}>Coursify</p>

            <div className='flex flex-col mt-[5rem]'>
                <p className='py-[0.8rem] cursor-pointer hover:bg-[#5C72EA] hover:text-white pl-[2rem]' style={{backgroundColor: loc==='home' && '#5C72EA50'}} onClick={()=>navigate('/home')}>Home</p>
                <p className='py-[0.8rem] cursor-pointer hover:bg-[#5C72EA] hover:text-white pl-[2rem]' style={{backgroundColor: loc==='courses' && '#5C72EA50'}} onClick={()=>navigate('/courses')}>Courses</p>
                <p className='py-[0.8rem] cursor-pointer hover:bg-[#5C72EA] hover:text-white pl-[2rem]' style={{backgroundColor: loc==='scholarship' && '#5C72EA50'}} onClick={()=>navigate('/scholarship')}>Scholarship</p>
                <p className='py-[0.8rem] cursor-pointer hover:bg-[#5C72EA] hover:text-white pl-[2rem]' style={{backgroundColor: loc==='exams' && '#5C72EA50'}} onClick={()=>navigate('/exams')}>Entrance Exam</p>
                <p className='py-[0.8rem] cursor-pointer hover:bg-[#5C72EA] hover:text-white pl-[2rem]' style={{backgroundColor: loc==='interest' && '#5C72EA50'}} onClick={()=>navigate('/interest')}>Find your Interest</p>
                <p className='py-[0.8rem] cursor-pointer hover:bg-[#5C72EA] hover:text-white pl-[2rem]' style={{backgroundColor: loc==='chat' && '#5C72EA50'}} onClick={()=>navigate('/chat')}>Community Chat</p>
                <p className='py-[0.8rem] cursor-pointer hover:bg-[#5C72EA] hover:text-white pl-[2rem]' style={{backgroundColor: loc==='Questions' && '#5C72EA50'}} onClick={()=>navigate('/Questions')}>Questions</p>
            </div>
        </div>

        <div>
            <p className='pl-[2rem] flex items-center cursor-pointer'><span className='text-2xl mr-3'><FaUserCircle/></span>{username}</p>
            <p className='pl-[2rem] mt-7 flex items-center cursor-pointer' onClick={()=>navigate('/')}><span className='text-2xl mr-3 opacity-70'><RiShutDownLine/></span>Log Out</p>
        </div>
        
    </div>
  )
}

export default SideBar
