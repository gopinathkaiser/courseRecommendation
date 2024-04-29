import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import './findInterest.css'
import { FaAngleDown } from "react-icons/fa6";
import { technical_interests, non_technical_interests, interests, achievements } from './optionsList';
import httpClient from '../../httpClient';
import InterestOutput from './InterestOutput';

const FindInterest = () => {

    const [page, setPage] = useState('selection');

    const [interestsList, setInterestsList] = useState([]);

    const [dropDown, setDropDown] = useState({
        tech: false,
        nonTech: false,
        general: false,
        achievements: false
    })

    const [selectedOptions, setSelectedOptions] = useState({
        tech: '',
        nonTech: '',
        general: '',
        achievements: ''
    })

    useEffect(()=>{
        setSelectedOptions({
            tech: '',
            nonTech: '',
            general: '',
            achievements: ''
        })
    },[page])

    const submit = async() => {
        try{
            const resp = await httpClient.post('http://localhost:5000/pred/recommend',{
                'tech': selectedOptions.tech,
                'interest': selectedOptions.general,
                'non_tech': selectedOptions.nonTech,
                'ach': selectedOptions.achievements
            })

            setInterestsList(resp?.data?.content?.recommend);
            setPage('output');
        } catch(err) {
            console.error(err);
        }
    }

  return (
    <Layout>
        { page === 'selection' ?
            <div className='w-full flex flex-col justify-between h-screen p-[2rem] select-none'>
            <div>
                <p className='text-2xl font-semibold text-[#5C72EA]'>Find Your Interest</p>
                <p className='mt-2'>Choose one option from each menu</p>
            </div>

            
            <div className='h-[60%] w-full'>

                <div className='flex h-[50%] items-center justify-between'>

                <div className='w-[40%] relative'>
                    <div className="w-full tech h-[3rem] cursor-pointer rounded-md bg-[#dadada] px-[1rem] relative flex justify-between items-center" onClick={()=>setDropDown((prev)=>({...prev, tech:!dropDown.tech}))}>
                        <p className='text-sm' style={{opacity: !selectedOptions.tech && '50%'}}>{selectedOptions.tech ? selectedOptions.tech :'Choose your Interest'}</p>
                        <p className='opacity-50'><FaAngleDown/></p>
                    </div>
                    <div className='w-full absolute z-10 bg-[#DADADA] rounded-md transition-all overflow-y-scroll' style={{maxHeight: dropDown.tech ? '10rem' : '0rem'}}>
                        {
                            technical_interests.map((item,index)=>{
                                return(
                                    <div key={index} className='cursor-pointer w-full py-[0.8rem] px-[1.5rem] hover:bg-[#80808020]' onClick={()=>{setSelectedOptions((prev)=>({...prev, tech:item})); setDropDown((prev)=>({...prev, tech:false}))}}>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> 

                <div className='w-[40%] relative'>
                    <div className="w-full nonTech h-[3rem] cursor-pointer rounded-md bg-[#dadada] px-[1rem] relative flex justify-between items-center" onClick={()=>setDropDown((prev)=>({...prev, nonTech:!dropDown.nonTech}))}>
                        <p className='text-sm' style={{opacity: !selectedOptions.nonTech && '50%'}}>{selectedOptions.nonTech ? selectedOptions.nonTech :'Choose your Interest'}</p>
                        <p className='opacity-50'><FaAngleDown/></p>
                    </div>
                    <div className='w-full absolute z-10 bg-[#DADADA] rounded-md transition-all overflow-y-scroll' style={{maxHeight: dropDown.nonTech ? '10rem' : '0rem'}}>
                        {
                            non_technical_interests.map((item,index)=>{
                                return(
                                    <div key={index} className='cursor-pointer w-full py-[0.8rem] px-[1.5rem] hover:bg-[#80808020]' onClick={()=>{setSelectedOptions((prev)=>({...prev, nonTech:item})); setDropDown((prev)=>({...prev, nonTech:false}))}}>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> 
                
                </div>

                <div className='flex h-[50%] items-center justify-between'>

                <div className='w-[40%] relative'>
                    <div className="w-full general h-[3rem] cursor-pointer rounded-md bg-[#dadada] px-[1rem] relative flex justify-between items-center" onClick={()=>setDropDown((prev)=>({...prev, general:!dropDown.general}))}>
                        <p className='text-sm' style={{opacity: !selectedOptions.general && '50%'}}>{selectedOptions.general ? selectedOptions.general :'Choose your Interest'}</p>
                        <p className='opacity-50'><FaAngleDown/></p>
                    </div>
                    <div className='w-full absolute z-10 bg-[#DADADA] rounded-md transition-all overflow-y-scroll' style={{maxHeight: dropDown.general ? '10rem' : '0rem'}}>
                        {
                            interests.map((item,index)=>{
                                return(
                                    <div key={index} className='cursor-pointer w-full py-[0.8rem] px-[1.5rem] hover:bg-[#80808020]' onClick={()=>{setSelectedOptions((prev)=>({...prev, general:item})); setDropDown((prev)=>({...prev, general:false}))}}>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> 

                <div className='w-[40%] relative'>
                    <div className="w-full achievements h-[3rem] cursor-pointer rounded-md bg-[#dadada] px-[1rem] relative flex justify-between items-center" onClick={()=>setDropDown((prev)=>({...prev, achievements:!dropDown.achievements}))}>
                        <p className='text-sm' style={{opacity: !selectedOptions.achievements && '50%'}}>{selectedOptions.achievements ? selectedOptions.achievements :'Choose your Interest'}</p>
                        <p className='opacity-50'><FaAngleDown/></p>
                    </div>
                    <div className='w-full absolute z-10 bg-[#DADADA] rounded-md transition-all overflow-y-scroll' style={{maxHeight: dropDown.achievements ? '10rem' : '0rem'}}>
                        {
                            achievements.map((item,index)=>{
                                return(
                                    <div key={index} className='cursor-pointer w-full py-[0.8rem] px-[1.5rem] hover:bg-[#80808020]' onClick={()=>{setSelectedOptions((prev)=>({...prev, achievements:item})); setDropDown((prev)=>({...prev, achievements:false}))}}>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> 
                
                </div>

            </div>

            <div className='w-full flex justify-end gap-[1.5rem] items-center'>
                <p className='border-2 border-[#5C72EA] text-[#5C72EA] py-[0.5rem] px-[1.2rem] rounded-md cursor-pointer' onClick={()=>setSelectedOptions({tech: '',nonTech: '',general: '',achievements: ''})}>Reset</p>
                <p className='text-white py-[0.5rem] px-[1.2rem] rounded-md bg-[#5C72EA] cursor-pointer' onClick={submit}>Submit</p>
            </div>
        </div> 
        :
        <InterestOutput interestsList={interestsList} setPage={setPage}/>
        }
    </Layout>
  )
}

export default FindInterest


