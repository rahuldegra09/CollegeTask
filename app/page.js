'use client'
import CollegeTable from '../components/CollegeTable';
import colleges from '../data/dummyData.json';
const Home = () => {
  
  return (
    <div className=" p-6  grid">
      <h1 className="sm:text-2xl text-xs font-bold mb-4">Colleges List</h1>
      <CollegeTable colleges={colleges} />
    </div>
  );
};

export default Home;