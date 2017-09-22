import React from 'react';

export default (props) => {
  console.log('Days Without', props);

  return (
    <div>
      <span>{JSON.stringify(props).substring(0, 100)}</span>
    </div>
  );
};
