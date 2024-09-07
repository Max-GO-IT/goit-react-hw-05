import React from 'react';
import { ThreeDots } from 'react-loader-spinner'; 
const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}

export default Loader;