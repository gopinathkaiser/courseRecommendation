import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import fileSelector from '../Courses Page/fileSelector';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import CollegesTemplate from '../Courses Page/CollegesTemplate';

const CollegePage = () => {

    const navigate = useNavigate();
    const username = localStorage.getItem('name');
    if (username === '') {
        console.log(username);
        navigate('/')
    }

    const [colleges, setColleges] = useState();

    useEffect(() => {
        const loc = window.location.href.split('/')[4];
        const files = fileSelector(loc);
        setColleges(files)
    }, [])

    return (
        <Layout>
            <div className='p-[2rem]'>
                <p className='text-2xl font-semibold text-[#5C72EA] flex items-center'><span className='text-black mr-2 hover:text-[#5C72EA] cursor-pointer' onClick={() => navigate('/courses')}><IoArrowBack /></span>Colleges</p>
                <CollegesTemplate list={colleges} />
            </div>
        </Layout>
    )
}

export default CollegePage
