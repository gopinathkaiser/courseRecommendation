import React from 'react'

const CollegesTemplate = ({list}) => {
  return (
    <div className='flex flex-col gap-[1rem] mt-[2rem]'>
      {
        list?.map((item,index)=>{
            return(
                <table key={index} className='bg-[#DADADA] h-[4rem] rounded-md text-sm hover:scale-[1.01] cursor-pointer transition-all'>
                    <tbody>
                        <tr>
                            <td className='w-[10%] text-center'>{item.rank === 1 ? <span className='font-bold text-3xl text-yellow-500'>1</span>: item.rank === 2 ? <span className='font-bold text-3xl text-gray-500'>2</span>: item.rank === 3 ? <span className='font-bold text-3xl text-orange-800'>3</span>: item.rank}</td>
                            <td className='w-[60%]'>{item.name}</td>
                            <td className='w-[30%]'>{item.city}, {item.state}</td>
                        </tr>
                    </tbody>
                </table>
            )
        })
      }
    </div>
  )
}

export default CollegesTemplate
