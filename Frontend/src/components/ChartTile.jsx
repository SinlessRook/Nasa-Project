import React from 'react';
import LineChart from './LineChart';
import { useState,useEffect } from 'react';
import { climateChangeStory,LineChart_CO } from '../assets/Constants';
const CardWithChartImage = (props) => {
  const place = props.place
   const type = props.type
   const [loaded,setloaded]=useState(false)
   const [desc,setdesc]=useState([])

   useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming LineChart_CO is defined and returns the data
        let data = await LineChart_CO(place, type);
        console.log(data)
        // Convert data into the correct format
        const years=data[0]
        const values=data[1]
        data = years.reduce((acc, year, index) => {
          acc[year] = values[index];  // Set the year as the key and the value as the value
          return acc;
        }, {});
        data = Object.keys(data).map(year => ({
          Date: year,
          Value: data[year]  
        }));
        // Fetch climate change insights
        const insights = await climateChangeStory(data);
        console.log(data)
        // Set the insights to state
        setdesc(insights);
      } catch (e) {
        console.log(e);
      } finally {
        setloaded(true);
      }
    };

    fetchData();
  }, [place]); // Empty dependency array to run once on mount

  // You can log the desc state after it is updated
  useEffect(() => {
    if (loaded) {
      console.log(desc);
    }
  }, [desc, loaded]); // Logs desc once it's loaded
  return (
    <>
    {!loaded?<div>Loading....</div>:<>
      <div className="md:min-w-[900px] md:mx-[50px] p-6 bg-[rgba(0,0,0,0.75)] shadow-lg rounded-lg flex flex-col md:flex-row space-x-8">
        
        {/* Left side: Chart Image and Image */}
        <div className="w-full md:w-1/2 flex flex-col space-y-4">
        <h1
            src="https://via.placeholder.com/150"
            alt="Sample"
            className="w-full h-16 md:h-42 object-cover rounded-md flex items-start justify-center text-white gap-2 text-5xl font-bold uppercase"
          >
            {/* <img src="https://flagsapi.com/BE/flat/64.png/" alt="" /> */}
            {place}</h1>
          <LineChart country={place} type={type}/>
  
          {/* Additional Image */}
          
        </div>
  
        {/* Right side: Description */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-2xl font-bold text-[#2596BE] mb-4">Climate Story</h2>
          <p className="text-gray-700 text-lg text-white opacity-70">
            This section provides an overview of the Carbon Monoxide Emission over Years. The image on
            the left represents a chart that displays trends, offering insights into the data.
          </p>
          <ul className="mt-4 text-white list-disc pl-5 text-lg opacity-70">
            <li>{desc[0]}</li>
            <li>{desc[1]}</li>
            <li>{desc[2]}</li>
            <li>{desc[3]}</li>
            
          </ul>
        </div>
      </div>
    
    </>}
    </>

  );
};

export default CardWithChartImage;
