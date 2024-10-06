import React from 'react';
import LineChart from './LineChart';

const CardWithChartImage = (props) => {
  const place = props.place
   const type = props.type
  return (
    <div className="min-w-[900px] mx-[50px] p-6 bg-[rgba(0,0,0,0.75)] shadow-lg rounded-lg flex space-x-8">
        
      {/* Left side: Chart Image and Image */}
      <div className="w-1/2 flex flex-col space-y-4">
      <h1
          src="https://via.placeholder.com/150"
          alt="Sample"
          className="w-full h-64 object-cover rounded-md flex items-start justify-center text-white gap-2 text-5xl font-bold uppercase"
        >
          {/* <img src="https://flagsapi.com/BE/flat/64.png/" alt="" /> */}
          {place}</h1>
        <LineChart country={place} type={type}/>

        {/* Additional Image */}
        
      </div>

      {/* Right side: Description */}
      <div className="w-1/2">
        <h2 className="text-2xl  font-bold text-[#2596BE] mb-4">Product Performance</h2>
        <p className="text-gray-700">
          This section provides an overview of the product's performance over time. The image on
          the left represents a chart that displays sales trends, offering insights into sales
          growth and market demand.
        </p>
        <ul className="mt-4 text-gray-600 list-disc pl-5">
          <li>Sales in January: 12 units</li>
          <li>Sales in February: 19 units</li>
          <li>Sales in March: 3 units</li>
          <li>Sales in April: 5 units</li>
          <li>Sales in May: 2 units</li>
        </ul>
      </div>
    </div>
  );
};

export default CardWithChartImage;
