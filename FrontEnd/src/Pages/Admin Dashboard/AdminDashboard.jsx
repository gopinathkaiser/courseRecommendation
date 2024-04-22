import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import Layout from '../../Layout';


const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  useEffect(() => {
    const username = localStorage.getItem('name');
    if(username === 'admin'){
      navigate('/admin/dashboard')
    }
    fetch('http://localhost:8080/api/v1/posts')
      .then(response => response.json())
      .then(data => setPosts(data.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);


  return (
    <Layout>
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-full bg-[#EAEAEA] p-4 flex justify-between'>
        <p className='text-2xl font-semibold text-[#5C72EA]'>Admin Dashboard</p>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
          onClick={toggleForm}
        >
          Create Post
        </button>
      </div>
      {showForm && <PostForm showForm={showForm} toggleForm={toggleForm} />}
      <div className='w-full h-full flex flex-col justify-center items-center'>
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
  );
};

export default AdminDashboard;







