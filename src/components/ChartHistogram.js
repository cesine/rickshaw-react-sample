import React from 'react';

export default (props) => {
  console.log('Histogram', props);

  return (
    <div>
      <span>{JSON.stringify(props).substring(0, 100)}</span>
    </div>
  );
};
