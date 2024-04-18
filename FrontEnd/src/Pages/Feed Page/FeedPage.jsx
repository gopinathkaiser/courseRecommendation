import React from 'react'
import Layout from '../../Layout'
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

const FeedPage = () => {

  const data = [
    {
      id: 1,
      profilePic: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      username: 'Dog_Lover',
      uploadImg: 'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
      imgDescription: "Literally can't get over with these cutie.",
      Likes: 250
    },
    {
      id: 2,
      profilePic: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      username: 'Cat_Lover',
      uploadImg: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      imgDescription: 'The look in his face 😍',
      Likes: 200
    }
  ]

  

  return (
    <Layout>
      <div className='w-full'>
        <div className='w-[50%] py-[2rem] flex flex-col gap-[3rem] mx-auto bg-[#DADADA]'>
          {
            data.map((item)=>{
              return(
                <div key={item.id} className='w-[90%] mx-auto'>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <img src={item.profilePic} alt="Profile Pic" className='w-[3rem] h-[3rem] rounded-full'/>
                      <p className='ml-4'>{item.username}</p>
                    </div>
                    <div className='flex items-center'>
                      <p className='p-[0.3rem] mr-[1rem] text-xs border-2 cursor-pointer rounded-md border-[#5C72EA]'>Follow</p>
                      <p className='cursor-pointer'><SlOptionsVertical/></p>
                    </div>
                  </div>

                  <div className='w-full mt-4 grid place-items-center'>
                    <img src={item.uploadImg} alt="Uploaded" />
                  </div>

                  <div className='mt-4 text-[1.4rem] flex items-center gap-[1.5rem]'>
                    <p className='cursor-pointer flex items-center'><FaRegHeart/><span className='text-xs ml-1'>{item.Likes}</span></p>
                    <p className='cursor-pointer'><FaRegComment/></p>
                  </div>

                  <div className='flex items-center mt-4'>
                    <p className='font-semibold'>{item.username}:</p>
                    <p className='ml-1'>{item.imgDescription}</p>
                  </div>

                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default FeedPage