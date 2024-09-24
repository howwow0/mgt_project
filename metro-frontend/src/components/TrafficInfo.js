import React, { useState } from 'react';

const TrafficInfo = () => {
  const [trafficData, setTrafficData] = useState([
    { location: 'Station 1', load: 'High' },
    { location: 'Road 1', load: 'Medium' },
  ]);

  return (
    <div className="traffic-info">
      <h2>Traffic Load Information</h2>
      <ul>
        {trafficData.map((item, index) => (
          <li key={index}>
            {item.location}: {item.load} load
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrafficInfo;
