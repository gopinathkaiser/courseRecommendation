import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../Layout'
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

const FeedPage = () => {


  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem('name');
    console.log(username);
    if(username === 'admin'){
      navigate('/admin/dashboard')
    }
    if(username === ''){
      console.log(username);
      navigate('/')
    }
    fetch('http://localhost:8080/api/v1/posts')
      .then(response => response.json())
      .then(data => setPosts(data.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);
  

  return (
    <Layout>
      <div className='w-full'>
      <div className='w-full mt-3 h-full flex flex-col justify-center items-center'>
        {posts.map(post => (
          <div key={post.id} className='bg-white shadow-md p-4 rounded-md mb-4 w-full md:w-1/2'>
            <p className='text-lg font-semibold'>{post.title}</p>
            <p className='text-gray-600'>{post.caption}</p>
            <img src={post.image} alt={post.title} className='w-full mt-2 rounded-md' />
            <div className='flex justify-between items-center mt-4'>
              <p className='text-gray-500'>Posted by {post.userDetails ? post.userDetails.username : 'admin'}</p>
              <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </Layout>
  )
}

export default FeedPage