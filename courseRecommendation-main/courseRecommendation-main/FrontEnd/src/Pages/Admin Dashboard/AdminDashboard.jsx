// // import React, { useState,useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import PostForm from './PostForm';
// // import Layout from '../../Layout';


// // const AdminDashboard = () => {
// //   const [showForm, setShowForm] = useState(false);
// //   const [posts, setPosts] = useState([]);

// //   const navigate = useNavigate();

// //   const toggleForm = () => {
// //     setShowForm(prev => !prev);
// //   };

// //   useEffect(() => {
// //     const username = localStorage.getItem('name');
// //     if(username === 'admin'){
// //       navigate('/admin/dashboard')
// //     }else{
// //       navigate('/');
// //     }
// //     if(username === null) navigate("/");
// //     fetch('http://localhost:8080/api/v1/posts')
// //       .then(response => response.json())
// //       .then(data => setPosts(data.data))
// //       .catch(error => console.error('Error fetching posts:', error));
// //   }, []);


// //   return (
// //     <Layout>
// //     <div className='w-full h-full flex flex-col items-center'>
// //       <div className='w-full bg-[#EAEAEA] p-4 flex justify-between'>
// //         <p className='text-2xl font-semibold text-[#5C72EA]'>Admin Dashboard</p>
// //         <button
// //           className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
// //           onClick={toggleForm}
// //         >
// //           Create Post
// //         </button>
// //       </div>
// //       {showForm && <PostForm showForm={showForm} toggleForm={toggleForm} />}
// //       <div className='w-full h-full flex flex-col justify-center items-center'>
// //         {posts.map(post => (
// //           <div key={post.id} className='bg-white shadow-md p-4 rounded-md mb-4 w-full md:w-1/2'>
// //             <p className='text-lg font-semibold'>{post.title}</p>
// //             <p className='text-gray-600'>{post.caption}</p>
// //             <img src={post.image} alt={post.title} className='w-full mt-2 rounded-md' />
// //             <div className='flex justify-between items-center mt-4'>
// //               <p className='text-gray-500'>Posted by {post.userDetails ? post.userDetails.username : 'admin'}</p>
// //               <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //     </Layout>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PostForm from './PostForm';
// import Layout from '../../Layout';

// const AdminDashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setShowForm(prev => !prev);
//   };
//   const username = localStorage.getItem('name');
//   useEffect(() => {
//     //  username = localStorage.getItem('name');
//     if (username !== 'admin') {
//       navigate('/');
//     }

//     fetch('http://localhost:8080/api/v1/posts/')
//       .then(response => response.json())
//       .then(data => setPosts(data.data))
//       .catch(error => console.error('Error fetching posts:', error));
//   }, []);

//   const handleDelete = id => {
//     fetch(`http://localhost:8080/api/v1/posts/delete/${id}`, {
//       method: 'GET',
//     })
//       .then(response => response.json())
//       .then(() => {
//         // Fetch updated posts after deletion
//         fetch('http://localhost:8080/api/v1/posts/')
//           .then(response => response.json())
//           .then(data => setPosts(data.data))
//           .catch(error => console.error('Error fetching posts:', error));
//       })
//       .catch(error => console.error('Error deleting post:', error));
//   };

//   return (
//     <Layout>
//       <div className='w-full h-full flex flex-col items-center'>
//         <div className='w-full bg-[#EAEAEA] p-4 flex justify-between'>
//           <p className='text-2xl font-semibold text-[#5C72EA]'>Admin Dashboard</p>
//           <button
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
//             onClick={toggleForm}
//           >
//             Create Post
//           </button>
//         </div>
//         {showForm && <PostForm showForm={showForm} toggleForm={toggleForm} />}
//         <div className='w-full h-full flex flex-col justify-center items-center'>
//           {posts.map(post => (
//             <div key={post.id} className='bg-white shadow-md p-4 rounded-md mb-4 w-full md:w-1/2'>
//               <p className='text-lg font-semibold'>{post.title}</p>
//               <p className='text-gray-600'>{post.caption}</p>
//               <img src={post.image} alt={post.title} className='w-full mt-2 rounded-md' />
//               <div className='flex justify-between items-center mt-4'>
//                 <p className='text-gray-500'>Posted by {post.userDetails ? post.userDetails.username : 'admin'}</p>
//                 <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
//                 {username === 'admin' && (
//                   <button
//                     className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//                     onClick={() => handleDelete(post.id)}
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PostForm from './PostForm';
// import Layout from '../../Layout';

// const AdminDashboard = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [deleteId, setDeleteId] = useState(null); // Track the post id to delete
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setShowForm(prev => !prev);
//   };
//   const username = localStorage.getItem('name');
//   useEffect(() => {
//     //  username = localStorage.getItem('name');
//     if (username !== 'admin') {
//       navigate('/');
//     }

//     fetch('http://localhost:8080/api/v1/posts/')
//       .then(response => response.json())
//       .then(data => setPosts(data.data))
//       .catch(error => console.error('Error fetching posts:', error));
//   }, []);

//   const handleDelete = id => {
//     setDeleteId(id); // Set the id to delete
//   };

//   const confirmDelete = () => {
//     if (deleteId) {
//       fetch(`http://localhost:8080/api/v1/posts/delete/${deleteId}`, {
//         method: 'GET',
//       })
//         .then(response => response.json())
//         .then(() => {
//           // Fetch updated posts after deletion
//           fetch('http://localhost:8080/api/v1/posts/')
//             .then(response => response.json())
//             .then(data => setPosts(data.data))
//             .catch(error => console.error('Error fetching posts:', error));
//         })
//         .catch(error => console.error('Error deleting post:', error))
//         .finally(() => setDeleteId(null)); // Reset deleteId after deletion
//     }
//   };

//   const cancelDelete = () => {
//     setDeleteId(null); // Reset deleteId if cancel is clicked
//   };

//   return (
//     <Layout>
//       <div className='w-full h-full flex flex-col items-center'>
//         <div className='w-full bg-[#EAEAEA] p-4 flex justify-between'>
//           <p className='text-2xl font-semibold text-[#5C72EA]'>Admin Dashboard</p>
//           <button
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
//             onClick={toggleForm}
//           >
//             Create Post
//           </button>
//         </div>
//         {showForm && <PostForm showForm={showForm} toggleForm={toggleForm} />}
//         <div className='w-full h-full flex flex-col justify-center items-center'>
//           {posts.map(post => (
//             <div key={post.id} className='bg-white shadow-md p-4 rounded-md mb-4 w-full md:w-1/2'>
//               <p className='text-lg font-semibold'>{post.title}</p>
//               <p className='text-gray-600'>{post.caption}</p>
//               <img src={post.image} alt={post.title} className='w-full mt-2 rounded-md' />
//               <div className='flex justify-between items-center mt-4'>
//                 <p className='text-gray-500'>Posted by {post.userDetails ? post.userDetails.username : 'admin'}</p>
//                 <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
//                 {username === 'admin' && (
//                   <>
//                     {deleteId !== post.id ? ( // Show delete button only if deleteId matches post id
//                       <button
//                         className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//                         onClick={() => handleDelete(post.id)}
//                       >
//                         Delete
//                       </button>
//                     ) : (
//                       <div>
//                         <p>Are you sure you want to delete this post?</p>
//                         <button
//                           className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
//                           onClick={confirmDelete}
//                         >
//                           Confirm
//                         </button>
//                         <button
//                           className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
//                           onClick={cancelDelete}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import Layout from '../../Layout';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [deleteId, setDeleteId] = useState(null); 
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };
  const username = localStorage.getItem('name');
  useEffect(() => {
    //  username = localStorage.getItem('name');
    if (username !== 'admin') {
      navigate('/');
    }

    fetchPosts(); 
  }, []);

  const fetchPosts = () => {
    fetch('http://localhost:8080/api/v1/posts/')
      .then(response => response.json())
      .then(data => setPosts(data.data))
      .catch(error => console.error('Error fetching posts:', error));
  };

  const handleDelete = id => {
    setDeleteId(id);
  };

  const handlePost = async() => {
    setPosts(fetchPosts());
  };

  const handlePostClick = async() => {
    setPosts(fetchPosts());
  }

  const confirmDelete = () => {
    if (deleteId) {
      fetch(`http://localhost:8080/api/v1/posts/delete/${deleteId}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(() => {
          
          fetchPosts();
        })
        .catch(error => console.error('Error deleting post:', error))
        .finally(() => setDeleteId(null)); 
    }
  };

  const cancelDelete = () => {
    setDeleteId(null); 
  };

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
        {showForm && <PostForm showForm={showForm} toggleForm={toggleForm} handlePost={handlePost} onClick={handlePostClick} post = {setPosts}/>}
        <div className='w-full h-full flex flex-col justify-center items-center'>
          {posts.map(post => (
            <div key={post.id} className='bg-white shadow-md p-4 rounded-md mb-4 w-full md:w-1/2'>
              <p className='text-lg font-semibold'>{post.title}</p>
              <p className='text-gray-600'>{post.caption}</p>
              <img src={post.image} alt={post.title} className='w-full mt-2 rounded-md' />
              <div className='flex justify-between items-center mt-4'>
                <p className='text-gray-500'>Posted by {post.userDetails ? post.userDetails.username : 'admin'}</p>
                <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
                {username === 'admin' && (
                  <>
                    {deleteId !== post.id ? ( 
                      <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <div>
                        <p>Are you sure you want to delete this post?</p>
                        <button
                          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                          onClick={confirmDelete}
                        >
                          Confirm
                        </button>
                        <button
                          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                          onClick={cancelDelete}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;








