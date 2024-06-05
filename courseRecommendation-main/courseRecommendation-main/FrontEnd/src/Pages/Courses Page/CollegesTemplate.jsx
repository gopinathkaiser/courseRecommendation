import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const CollegesTemplate = ({list}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem('name');
    if(username === null){
      navigate('/');
    }
   
}, []);

  return (
    <div className='flex flex-col gap-[1rem] mt-[2rem]'>
     
  {list?.map((item, index) => {
    return (
      <a key={index} href={item.website} target='_blank'>
        <div className='bg-[#DADADA] rounded-md text-sm hover:scale-[1.01] cursor-pointer transition-all'>
          <table className='w-full h-[4rem]'>
            <tbody>
              <tr>
                <td className='w-[10%] text-center'>
                  {item.rank === 1 ? (
                    <span className='font-bold text-3xl text-yellow-500'>1</span>
                  ) : item.rank === 2 ? (
                    <span className='font-bold text-3xl text-gray-500'>2</span>
                  ) : item.rank === 3 ? (
                    <span className='font-bold text-3xl text-orange-800'>3</span>
                  ) : (
                    <span>{item.rank}</span>
                  )}
                </td>
                <td className='w-[60%]'>{item.name}</td>
                <td className='w-[30%]'>{item.city}, {item.state}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </a>
    );
  })}
</div>

  )
}

export default CollegesTemplate
