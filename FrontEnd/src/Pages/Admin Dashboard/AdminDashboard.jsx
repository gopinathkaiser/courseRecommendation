// import React from 'react'
// import PostForm from './PostForm'

// const AdminDashboard = () => {
//   return (
//     <div className='w-full h-screen p-[2rem] bg-[#EAEAEA]'>
//       <p className='text-2xl font-semibold text-[#5C72EA]'>Admin Dashboard</p>
//       <PostForm />
//     </div>
//   )
// }

// export default AdminDashboard

import React, { useState } from 'react';
import PostForm from './PostForm';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  console.log(showForm);

  return (
    <div className='relative w-full h-screen p-[2rem] bg-[#EAEAEA]'>
      <p className='text-2xl font-semibold text-[#5C72EA]'>Admin Dashboard</p>
      <button
        className='absolute top-0 right-0 m-[1rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        onClick={toggleForm}
      >
        Create Post
      </button>
      <PostForm showForm={showForm} toggleForm={toggleForm} />
    </div>
  );
};

export default AdminDashboard;



