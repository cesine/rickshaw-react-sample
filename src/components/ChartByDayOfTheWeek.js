import React from 'react';

export default (props) => {
  console.log('By Day of the Week', props);

  return (
    <div>
      <span>{JSON.stringify(props).substring(0, 100)}</span>
    </div>
  );
};
