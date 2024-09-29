import React from 'react';

const DataDisplay = ({ data }) => {
    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default DataDisplay;
