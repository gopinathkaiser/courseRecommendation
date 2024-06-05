// import React, { useEffect, useState } from 'react'
// import Layout from '../../Layout'
// import httpClient from '../../httpClient'
// import { useNavigate } from 'react-router-dom';

// const ScholarshipPage = () => {

//     const [scholarship, setScholarship] = useState();
//     const navigate = useNavigate();
//     useEffect(()=>{
//         const username = localStorage.getItem('name');
//         if(username === null){
//           navigate('/');
//         }

//         const getScholarship = async() => {
//             try{
//                 const resp =await httpClient.get('/api/v1/scholarship');
//                 setScholarship(resp?.data?.data);
//             } catch(err){
//                 console.error(err);
//             }
//         }

//         getScholarship();
//     },[])

//   return (
//     <Layout>
//         <div className='p-[2rem]'>

//             <p className='text-2xl font-semibold text-[#5C72EA]'>Scholarships</p>

//             <div className='grid grid-cols-3 grid-flow-row gap-[1rem] mt-[2rem]'>
//                 {
//                     scholarship?.map((item)=>{
//                         return(
//                             <div key={item.id} className='h-[29rem] relative p-[2rem] bg-[#DADADA] rounded-md'>
//                                 <p className='font-semibold'>{item.id}. {item.sname}</p>
//                                 <p className='text-sm mt-1 opacity-60'>{item.aname==='nil'? 'Private': item.aname}</p>
//                                 <p className='text-sm opacity-60'>{item.authority}</p>
//                                 <table className='w-full mt-[1rem] text-sm'>
//                                     <tbody>
//                                         <tr>
//                                             <td className='py-4'>
//                                                 <p className='font-semibold'>Category:</p>
//                                                 <p>{item.category}</p>
//                                             </td>
//                                             <td className='py-4'>
//                                                 <p className='font-semibold'>Cutoff:</p>
//                                                 <p>{item.cutoff}</p>
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td className='py-4'>
//                                                 <p className='font-semibold'>State:</p>
//                                                 <p>{item.state}</p>
//                                             </td>
//                                             <td className='py-4'>
//                                                 <p className='font-semibold'>Income Limit:</p>
//                                                 <p>{item.incomelimit}</p>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                                 <p className='mt-2'><span className='font-semibold'>Benefits:</span> {item.benefit}</p>
//                                 <p className='mt-2'><span className='font-semibold'>Applicable for: <br /></span>{item.applbranch}</p>
//                                 <a href={item.link} className='mt-auto text-sm text-blue-500 absolute bottom-[2rem]'>Click Here is view more details</a>
//                             </div>
//                         )
//                     })
//                 }
//             </div>

            
//         </div>
//     </Layout>
//   )
// }

// export default ScholarshipPage



import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import httpClient from '../../httpClient';
import { useNavigate } from 'react-router-dom';

const ScholarshipPage = () => {
    const [scholarship, setScholarship] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [cutoffFilter, setCutoffFilter] = useState('');
    const [incomeLimit,setIncomeLimit] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('name');
        if (username === null) {
            navigate('/');
        }

        const getScholarship = async () => {
            try {
                const resp = await httpClient.get('/api/v1/scholarship');
                console.log(resp.data.data);
                setScholarship(resp?.data?.data);
            } catch (err) {
                console.error(err);
            }
        };

        getScholarship();
    }, []);

    const filteredScholarships = scholarship.filter((item) => {
        return (
            (categoryFilter === '' || item.category === categoryFilter) &&
            (stateFilter === '' || item.state === stateFilter) && 
            (incomeLimit === '' || item.incomelimit <= parseFloat(incomeLimit))
        );
    });

    return (
        <Layout>
            <div className="p-[2rem]">
                <p className="text-2xl font-semibold text-[#5C72EA]">Scholarships</p>

                <div className="flex gap-4 mt-[2rem]">
                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="EBC">EBC</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor="state">State:</label>
                        <select
                            id="state"
                            value={stateFilter}
                            onChange={(e) => setStateFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Maharastra">Maharastra</option>
                            <option value="Uttar pradesh">Uttar pradesh</option>
                            <option value="West bengal">West bengal</option>
                            <option value="Karnataka">Karnataka</option>
                            
                        </select>
                    </div>
                    <div>
                        <label htmlFor="incomeLimit">IncomeLimit:</label>
                        <input
                            id="incomeLimit"
                            type="number"
                            value={incomeLimit}
                            onChange={(e) => setIncomeLimit(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 grid-flow-row gap-[1rem] mt-[2rem]">
                    {filteredScholarships.map((item) => (
                        <div
                            key={item.id}
                            className="h-[29rem] relative p-[2rem] bg-[#DADADA] rounded-md"
                        >
                            <p className='font-semibold'>{item.id}. {item.sname}</p>
                                 <p className='text-sm mt-1 opacity-60'>{item.aname==='nil'? 'Private': item.aname}</p>
                                 <p className='text-sm opacity-60'>{item.authority}</p>
                                 <table className='w-full mt-[1rem] text-sm'>
                                     <tbody>
                                         <tr>
                                             <td className='py-4'>
                                                 <p className='font-semibold'>Category:</p>
                                                 <p>{item.category}</p>
                                             </td>
                                             <td className='py-4'>
                                                 <p className='font-semibold'>Cutoff:</p>
                                                 <p>{item.cutoff}</p>
                                             </td>
                                         </tr>
                                         <tr>
                                             <td className='py-4'>
                                                 <p className='font-semibold'>State:</p>
                                                 <p>{item.state}</p>
                                             </td>
                                             <td className='py-4'>
                                                 <p className='font-semibold'>Income Limit:</p>
                                                 <p>{item.incomelimit}</p>
                                             </td>
                                         </tr>
                                     </tbody>
                                 </table>
                                 <p className='mt-2'><span className='font-semibold'>Benefits:</span> {item.benefit}</p>
                                 <p className='mt-2'><span className='font-semibold'>Applicable for: <br /></span>{item.applbranch}</p>
                                 <a href={item.link} className='mt-auto text-sm text-blue-500 absolute bottom-[2rem]'>Click Here is view more details</a>
                        </div>
                    ))}
                </div>
            </div>
            
      
    </Layout>
  )
}

export default ScholarshipPage