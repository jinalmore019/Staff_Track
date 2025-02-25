import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm'>
      <div className='text-white flex flex-col items-center'>
        <InfinitySpin
          visible={true}
          width="200"
          color="#FFFFFF"
          ariaLabel="infinity-spin-loading"
        />
        <div className='text-xl'>Loading</div>
      </div>
    </div>
  );
}

export default Loading;
