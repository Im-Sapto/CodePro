import React from 'react'
import logo from '/CodeProLogo.png';

// function Logo({
//  width = '100px',
//  className=''}) {
//   return (
//     <div className={`font-bold ${className}`}>CodePro</div>
//   )
// }

const Logo = ({
  className = '' }) => {
  return (
    <div className='w-[24px] flex'>
      <img className='rounded m-2' src={logo} alt="CodePro" />
      <div className={`font-bold ${className} m-2`}>CodePro</div>
    </div>
  );
};

export default Logo;