import { useState, useEffect } from 'react';
import logo from "../public/iit.jpg";
import india from "../public/indiatoday.png";
import Image from 'next/image';
import Link from 'next/link';
const CollegeTable = ({ colleges }) => {
    const [visibleColleges, setVisibleColleges] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); // Track the expanded index
    const [currentOffset, setCurrentOffset] = useState(0);
    const [selectedColleges, setSelectedColleges] = useState([]);
    const [selectedCollegeIndex, setSelectedCollegeIndex] = useState(null); // Track the selected college index
    const rowsPerPage = 10;
    useEffect(() => {
        // Load the initial set of colleges
        loadInitialColleges();
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCheckboxChange = (index) => {
        setSelectedColleges((prevSelected) => {
            if (prevSelected.includes(index)) {
                // Deselect the college
                return prevSelected.filter(collegeIndex => collegeIndex !== index);
            } else {
                // Select the college
                return [...prevSelected, index];
            }
        });
    };



    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // Toggle the specific index
    };
    const loadInitialColleges = () => {
        const initialColleges = colleges.slice(0, rowsPerPage);
        setVisibleColleges(initialColleges);
        setCurrentOffset(rowsPerPage); // Set offset for next batch
    };


    const loadMoreColleges = () => {
        if (currentOffset < colleges.length) {
            const moreColleges = colleges.slice(currentOffset, currentOffset + rowsPerPage);
            setVisibleColleges((prevVisibleColleges) => [...prevVisibleColleges, ...moreColleges]);
            setCurrentOffset((prevOffset) => prevOffset + rowsPerPage);
        }
    };



    const handleScroll = () => {
        // Check if we're close to the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            loadMoreColleges();
        }
    };
    const compareFees = () => {
        if (selectedColleges.length === 0) {
            // Show all rows
            setVisibleColleges(colleges);
        } else {
            // Show only selected colleges
            const selectedCollegesData = colleges.filter((_, index) => selectedColleges.includes(index));
            setVisibleColleges(selectedCollegesData);
        }
    };

    const comparePlacement = () => {
        if (selectedColleges.length === 0) {
            // Show all rows
            setVisibleColleges(colleges);
        } else {
            // Show only selected colleges
            const selectedCollegesData = colleges.filter((_, index) => selectedColleges.includes(index));
            setVisibleColleges(selectedCollegesData);
        }
    };



    const sortTable = (key) => {
        const sortedColleges = [...visibleColleges].sort((a, b) =>
            a[key] > b[key] ? 1 : -1
        );
        setVisibleColleges(sortedColleges);
    };

    const filterColleges = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredColleges = colleges.filter((college) =>
            college.college.toLowerCase().includes(searchTerm)
        );
        setVisibleColleges(filteredColleges);
    };
    const toggleCutoff = (index) => {
        // Toggle between showing and hiding the cutoff for the clicked college
        setSelectedCollegeIndex(selectedCollegeIndex === index ? null : index);
    };


    return (
        <div className='bg-white text-black '>
            <input
                type="text"
                placeholder="Search by college name"
                className="border p-2 mb-4 w-full max-w-md"
                onChange={filterColleges}
            />
            {visibleColleges.length > 0 ? (
                <div className="overflow-x-auto">
                <table className="min-w-full   border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border bg-cyan-400  border-gray-200 block md:table-row">
                            <th className="p-4 text-left block md:table-cell border-r">CD Rank</th>
                            <th
                                className="p-4 border-r text-left block md:table-cell cursor-pointer"
                                onClick={() => sortTable('college')}
                            >
                                Colleges
                            </th>
                            <th
                                className="p-4 border-r text-left block md:table-cell cursor-pointer"
                                onClick={() => sortTable('fees')}
                            >
                                Courses Fees
                            </th>
                            <th
                                className="p-4 text-left border-r block md:table-cell cursor-pointer"
                                onClick={() => sortTable('placement')}
                            >
                                Placement
                            </th>
                            <th
                                    className="p-4 text-left border-r block md:table-cell cursor-pointer"
                                onClick={() => sortTable('rating')}
                            >
                                User Review
                            </th>
                            <th
                                className="p-4 text-left block md:table-cell cursor-pointer"
                                onClick={() => sortTable('ranking')}
                            >
                                Ranking
                            </th>
                        </tr>
                    </thead>
                    <tbody className="block w-full md:table-row-group  ">
                        {visibleColleges.map((college, index) => {
                            const images = [logo, logo, india, india, logo]; // Example images array
                            const shownImages = images.slice(0, 2); // Show only first 2 images
                            const moreCount = images.length - shownImages.length; // Count of additional images

                            return (
                                <tr
                                    key={index}
                                    className="border  border-red-400 block md:table-row"
                                >
                                    <td className="p-1 border-b w-28 block align-top md:table-cell">{college.rank}</td>

                                    <td className="p-2 block border-r md:table-cell  content-start">

                                        <div className='grid grid-flow-row'>
                                            <div className='flex gap-2  '>
                                                <Image
                                                    className='w-10 h-10 mt-1  '
                                                    src={college.image}
                                                    alt="My SVG Image"
                                                    width={100}
                                                    height={100}
                                                />
                                                <div className='grid grid-flow-row '>
                                                    <h1 className=' text-cyan-400'>{college.college}</h1>
                                                    <p className='text-xs'>{college.address}</p>
                                                    <div className='w-fit flex flex-col bg-yellow-400   p-1 border-l-4 border-red-700 mt-3'>
                                                        <p className='text-sm text-orange-600'>{college.Course}
                                                            <button
                                                                onClick={() => toggleCutoff(index)} // Toggle for the specific college
                                                                className="ml-2 focus:outline-none"
                                                            >
                                                                {selectedCollegeIndex === index ? (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="2"
                                                                        stroke="currentColor"
                                                                        className="w-4 h-4 text-orange-600 rotate-180"
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth="2"
                                                                        stroke="currentColor"
                                                                        className="w-4 h-4 text-orange-600"
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        </p>

                                                        {/* Conditionally render the cutoff based on the selected index */}
                                                        {selectedCollegeIndex === index && (
                                                            <p className="text-xs mt-2">{college.cutoff}</p>
                                                        )}
                                                    </div>
                                                    {/* Conditionally render the cutoff based on the state */}
                                                </div>
                                            </div>

                                            <div className='flex justify-between mt-8 font-serif font-bold' >
                                                <div className=' flex gap-1 place-items-center'>
                                                    <svg className="w-4 h-4 text-orange-500 " stroke="currentColor" viewBox="0 -3 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#000000" />
                                                    </svg>
                                                    <Link href="/" className='text-orange-500'>Apply Now</Link>
                                                </div>

                                                <div className=' gap-1 grid grid-flow-col place-items-center'>
                                                    <svg className="w-4 h-4 text-green-700 " viewBox="0 -2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z" fill="#1C274C" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 16.75C12.2106 16.75 12.4114 16.6615 12.5535 16.5061L16.5535 12.1311C16.833 11.8254 16.8118 11.351 16.5061 11.0715C16.2004 10.792 15.726 10.8132 15.4465 11.1189L12.75 14.0682V3C12.75 2.58579 12.4142 2.25 12 2.25C11.5858 2.25 11.25 2.58579 11.25 3V14.0682L8.55353 11.1189C8.27403 10.8132 7.79963 10.792 7.49393 11.0715C7.18823 11.351 7.16698 11.8254 7.44648 12.1311L11.4465 16.5061C11.5886 16.6615 11.7894 16.75 12 16.75Z" fill="#1C274C" />
                                                    </svg>
                                                    <Link href="/" className='text-green-700'>Download Broucher</Link>
                                                </div>

                                                <div className=' flex gap-1 place-items-center '>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedColleges.includes(index)}
                                                        onChange={() => handleCheckboxChange(index)}
                                                        className="mr-1"
                                                    />


                                                    <h3 className=''>Add To Compare</h3>
                                                </div>

                                            </div>

                                        </div>
                                    </td>
                                    <td className="p-4 pr-12 border-r block content-start md:table-cell">
                                        <div className="flex flex-col gap-2 w-36">
                                            <h1 className="text-lg text-green-600 font-bold"> ₹{college.fees}</h1>
                                            <h2 className='text-xs'> {college.coursefee}</h2>
                                            <h3 className='text-xs'> -{college.sem}</h3>
                                            <div className='grid grid-flow-col place-items-center mt-2'>
                                                <svg fill="none" className="w-4 h-4 text-orange-500  " stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1,8A1,1,0,0,1,2,7H9.586L7.293,4.707A1,1,0,1,1,8.707,3.293l4,4a1,1,0,0,1,0,1.414l-4,4a1,1,0,1,1-1.414-1.414L9.586,9H2A1,1,0,0,1,1,8Zm21,7H14.414l2.293-2.293a1,1,0,0,0-1.414-1.414l-4,4a1,1,0,0,0,0,1.414l4,4a1,1,0,0,0,1.414-1.414L14.414,17H22a1,1,0,0,0,0-2Z" /></svg>
                                                <button onClick={compareFees} className='text-orange-500 font-bold rounded'>
                                                    Compare Fees
                                                </button>
                                            </div>

                                        </div>
                                    </td>

                                    <td className="p-4 pr-10 border-r block  content-start md:table-cell">
                                        <div className="flex flex-col gap-1 w-44">
                                            <h1 className="text-lg text-green-600 font-bold"> ₹{college.average}</h1>
                                            <p className='text-xs'>Average Package</p>
                                            <h1 className="text-lg text-green-600 font-bold"> ₹{college.high}</h1>
                                            <p className='text-xs'>Highest Package</p>
                                            <div className='grid grid-flow-col place-items-center mt-2'>
                                                <svg fill="none" className="w-4 h-4 text-orange-500  " stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1,8A1,1,0,0,1,2,7H9.586L7.293,4.707A1,1,0,1,1,8.707,3.293l4,4a1,1,0,0,1,0,1.414l-4,4a1,1,0,1,1-1.414-1.414L9.586,9H2A1,1,0,0,1,1,8Zm21,7H14.414l2.293-2.293a1,1,0,0,0-1.414-1.414l-4,4a1,1,0,0,0,0,1.414l4,4a1,1,0,0,0,1.414-1.414L14.414,17H22a1,1,0,0,0,0-2Z" /></svg>
                                                <button onClick={comparePlacement} className=' text-orange-500 font-bold rounded'>
                                                    Compare Placement
                                                </button>
                                            </div>

                                        </div>
                                    </td>
                                    <td className="p-4 block border-r content-start md:table-cell w-52">
                                        <div className='flex  place-items-baseline  w-fit'>
                                            <div className='w-2 h-2 bg-orange-400 rounded-3xl'></div>
                                            <p className='pl-1 font-thin text-xl'>{college.rating}</p>
                                        </div>
                                        <p className='text-xs font-serif'>{college.userrate}</p>
                                        <div className='mt-4 bg-yellow-200 rounded p-1 flex text-orange-700 '  >
                                            <svg className="w-4 h-4 " viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4 24L9 19L19 29L39 9L44 14L19 39L4 24Z" fill="#2F88FF" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className='text-xs'>Best In Social Life</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-4 h-4  rotate cursor-pointer"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </td>

                                    <td className="p-4 block  content-start md:table-cell w-52">
                                        <div className='grid grid-flow-col place-items-center  w-fit'>
                                            <p className='pl-1  text-l '>{college.ranking}/</p>
                                            <div className='flex place-items-center'>
                                                <p className=' text-orange-500 text-xs'> {college.outoff}</p>
                                                <p className='pl-2'>in india</p>
                                            </div>
                                        </div>
                                        <div className='mt-4 rounded p-1'>
                                            <div className='flex place-items-center'>
                                                <Image src={india} alt='xx' className='w-10 h-10'></Image>
                                                <p className='text-2xl font-serif pl-3'>{college.rankingyear}</p>
                                            </div>
                                            <div className='w-fit h-8 flex flex-row bg-cyan-300 rounded p-1 border-l-4 border-red-700 mt-3'>
                                                <div className='flex flex-wrap gap-1 place-items-center'>
                                                    {images.slice(0, 3).map((img, idx) => (
                                                        <Image
                                                            key={idx}
                                                            src={img}
                                                            alt={`Image ${idx + 1}`}
                                                            className="w-3 h-3"
                                                        />
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => toggleExpand(index)}
                                                    className="flex items-center space-x-2  hover:bg-yellow-400 p-2 rounded"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        className={`w-4 h-4 transition-transform transform ${expandedIndex === index ? 'rotate-180' : ''}`}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                    <span className="text-blue-500">{expandedIndex === index ? 'Show less' : `+${images.length - 2} more`}</span>
                                                </button>

                                                {/* Conditionally Render Images */}
                                                {expandedIndex === index && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {images.map((img, idx) => (
                                                            <Image
                                                                key={idx}
                                                                src={img}
                                                                alt={`Image ${idx + 1}`}
                                                                className="w-4 h-4"
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>


                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            ) : (
                <p className="text-center text-3xl text-red-500">No colleges found</p>
            )}
        </div>
    );
};

export default CollegeTable;