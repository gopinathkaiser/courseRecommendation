// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import httpClient from '../../httpClient';

// const LoginPage = () => {

//     const navigate = useNavigate();
    
//     const [loginCredentials, setLoginCredentials] = useState({
//         email: '',
//         password: ''
//     })


//     const [registerCredentials, setRegisterCredentials] = useState({
//         email: '',
//         username:'',
//         password: ''
//     })

//     const [page, setPage] = useState('login');
    
//     const login = async() => {

//         if(page==='login'){
//             try{
//                 const resp = await httpClient.post('/api/v1/auth/login', loginCredentials)
                
//                 console.log(resp);
//                 if(resp?.status===200){
//                     if(loginCredentials.email==='admin@gmail.com'){
//                         localStorage.setItem('name',resp?.data?.data?.username)
//                         navigate('/admin/dashboard');
//                     } else {
//                         localStorage.setItem('name',resp?.data?.data?.username)
//                         navigate('/home');
//                     }
//                 }
                
//             } catch(err){
//                 console.error(err);
//             }
//         } else {
//             try{
//                 const resp = await httpClient.post('/api/v1/auth', registerCredentials)
                
//                 console.log(resp);
//                 if(resp?.status===201){
//                     alert('register successful');
//                     localStorage.setItem('name',resp?.data?.data?.username)
//                     navigate('/home');
//                 }
                
//             } catch(err){
//                 console.error(err);
//                 // if(err?.response?.status===401) {
//                 //     alert('Wrong loginCredentials')
//                 // } else if(err?.response?.status===404) {
//                 //     alert('User Not Found')
//                 // }
//             }
//         }

//     }

//     return (
//         <div className='w-full flex h-screen bg-[#EAEAEA]'>
//             <div className="w-[50%] grid place-items-center">
//                 <div>
//                     <p className='text-6xl'>Dive into<br />the world of<br /><span className='text-8xl font-semibold text-[#5C72EA]'>Courses</span></p>
//                     <p className='mt-3'>with Coursify</p>
//                 </div>
//             </div>
//             <div className="w-[50%] grid place-items-center">
//                 { page === 'login' ?

//                 <div className='w-[52%] flex flex-col justify-evenly items-center h-[60%] text-black bg-[#D5D5D5] rounded-lg'>
//                     <p className='font-medium text-xl'>Log in to your account</p>
//                     <div className='w-[70%]'>
//                         <p className='text-sm'>Email Id</p>
//                         <input type="text" onChange={(e)=>{setLoginCredentials(prev => ({...prev,email:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
//                         <p className='mt-[2rem] text-sm'>Password</p>
//                         <input type="password" onChange={(e)=>{setLoginCredentials(prev => ({...prev,password:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
//                         <p className='text-right mt-2 text-xs cursor-pointer'>Forgot Password?</p>
//                     </div>
//                     <p className='w-[70%] h-[3rem] rounded-lg grid place-items-center bg-[#5C72EA] text-white hover:bg-[#3E54D8] font-medium cursor-pointer' onClick={login}>Login</p>
//                     <p className='text-xs'>New to Coursify ? <span className='text-[#5C72EA] cursor-pointer' onClick={()=> setPage('register')}>Sign Up</span></p>
//                 </div> :

//                 <div className='w-[52%] flex flex-col justify-evenly items-center h-[65%] text-black bg-[#D5D5D5] rounded-lg'>
//                 <p className='font-medium text-xl'>Create a new account</p>
//                 <div className='w-[70%]'>
//                     <p className='text-sm'>Email Id</p>
//                     <input type="text" onChange={(e)=>{setRegisterCredentials(prev => ({...prev,email:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
//                     <p className='mt-[2rem] text-sm'>User Name</p>
//                     <input type="text" onChange={(e)=>{setRegisterCredentials(prev => ({...prev,username:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
//                     <p className='mt-[2rem] text-sm'>Password</p>
//                     <input type="password" onChange={(e)=>{setRegisterCredentials(prev => ({...prev,password:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
//                 </div>
//                 <p className='w-[70%] h-[3rem] rounded-lg grid place-items-center bg-[#5C72EA] text-white hover:bg-[#3E54D8] font-medium cursor-pointer' onClick={login}>Sign Up</p>
//                 <p className='text-xs'>Already have an account ? <span className='text-[#5C72EA] cursor-pointer' onClick={()=> setPage('login')}>Login</span></p>
//                 </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default LoginPage

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import httpClient from '../../httpClient';

const LoginPage = () => {

    const navigate = useNavigate();
    
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    })

    const [registerCredentials, setRegisterCredentials] = useState({
        email: '',
        username:'',
        password: '',
        confirmPassword: ''
    })

    const [page, setPage] = useState('login');
    
    const login = async() => {
        // Login logic
                if(page==='login'){
            try{
                const resp = await httpClient.post('/api/v1/auth/login', loginCredentials)
                
                console.log(resp);
                if(resp?.status===200){
                    if(loginCredentials.email==='admin@gmail.com'){
                        localStorage.setItem('name',resp?.data?.data?.username)
                        navigate('/admin/dashboard');
                    } else {
                        localStorage.setItem('name',resp?.data?.data?.username)
                        navigate('/home');
                    }
                }
                
            } catch(err){
                console.error(err);
            }
        } else {
            try{
                const resp = await httpClient.post('/api/v1/auth', registerCredentials)
                
                console.log(resp);
                if(resp?.status===201){
                    alert('register successful');
                    localStorage.setItem('name',resp?.data?.data?.username)
                    navigate('/home');
                }
                
            } catch(err){
                console.error(err);
                // if(err?.response?.status===401) {
                //     alert('Wrong loginCredentials')
                // } else if(err?.response?.status===404) {
                //     alert('User Not Found')
                // }
            }
        }
    }

    const signUp = async() => {
        if(registerCredentials.password !== registerCredentials.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if(!validateEmail(registerCredentials.email)) {
            alert('Invalid email address');
            return;
        }

        try {
            const resp = await httpClient.post('/api/v1/auth', registerCredentials)
                
            console.log(resp);
            if(resp?.status===201){
                alert('register successful');
                localStorage.setItem('name',resp?.data?.data?.username)
                navigate('/home');
            }
                
        } catch(err) {
            console.error(err);
            // Handle error
        }
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    return (
        <div className='w-full flex h-screen bg-[#EAEAEA]'>
            <div className="w-[50%] grid place-items-center">
                <div>
                    <p className='text-6xl'>Dive into<br />the world of<br /><span className='text-8xl font-semibold text-[#5C72EA]'>Courses</span></p>
                    <p className='mt-3'>with Coursify</p>
                </div>
            </div>
            <div className="w-[50%] grid place-items-center">
                { page === 'login' ?

                <div className='w-[52%] flex flex-col justify-evenly items-center h-[60%] text-black bg-[#D5D5D5] rounded-lg'>
                    {/* Login form */}
                    {/* <div className='w-[52%] flex flex-col justify-evenly items-center h-[60%] text-black bg-[#D5D5D5] rounded-lg'> */}
                     <p className='font-medium text-xl'>Log in to your account</p>
                     <div className='w-[70%]'>
                         <p className='text-sm'>Email Id</p>
                         <input type="text" onChange={(e)=>{setLoginCredentials(prev => ({...prev,email:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
                         <p className='mt-[2rem] text-sm'>Password</p>
                         <input type="password" onChange={(e)=>{setLoginCredentials(prev => ({...prev,password:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
                         <p className='text-right mt-2 text-xs cursor-pointer'>Forgot Password?</p>
                     </div>
                     <p className='w-[70%] h-[3rem] rounded-lg grid place-items-center bg-[#5C72EA] text-white hover:bg-[#3E54D8] font-medium cursor-pointer' onClick={login}>Login</p>
                     <p className='text-xs'>New to Coursify ? <span className='text-[#5C72EA] cursor-pointer' onClick={()=> setPage('register')}>Sign Up</span></p>
                </div> :

                <div className='w-[52%] flex flex-col justify-evenly items-center h-[65%] text-black bg-[#D5D5D5] rounded-lg'>
                    <p className='font-medium text-xl'>Create a new account</p>
                    <div className='w-[70%]'>
                        <p className='text-sm'>Email Id</p>
                        <input type="text" onChange={(e)=>{setRegisterCredentials(prev => ({...prev,email:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
                        <p className='text-sm'>User Name</p>
                        <input type="text" onChange={(e)=>{setRegisterCredentials(prev => ({...prev,username:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
                        <p className='text-sm'>Password</p>
                        <input type="password" onChange={(e)=>{setRegisterCredentials(prev => ({...prev,password:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
                        <p className='text-sm'>Re-enter Password</p>
                        <input type="password" onChange={(e)=>{setRegisterCredentials(prev => ({...prev,confirmPassword:e.target.value}))}} className='bg-[#FFFFFF90] text-black w-full h-[2.5rem] rounded-md mt-2 pl-3 outline-none'/>
                    </div>
                    <p className='w-[70%] h-[3rem] rounded-lg grid place-items-center bg-[#5C72EA] text-white hover:bg-[#3E54D8] font-medium cursor-pointer' onClick={signUp}>Sign Up</p>
                    <p className='text-xs'>Already have an account ? <span className='text-[#5C72EA] cursor-pointer' onClick={()=> setPage('login')}>Login</span></p>
                </div>
                }
            </div>
        </div>
    )
}

export default LoginPage

