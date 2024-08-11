import React, { useEffect, useRef, useState } from 'react'

const Otp = ({length = 4, handleOtpChange}) => {
  const [otp, setOtp] =useState(new Array(length).fill(""));
  const inputRef = useRef([]);
  useEffect(()=>{
    if(inputRef.current[0]){
      inputRef.current[0].focus();
    }
  }, [])
  const handleChange = (e, index)=>{
    const value = e.target.value;
    if(isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const fullOtp = newOtp.join("");
    if(fullOtp.length === length){
      handleOtpChange(fullOtp)
    }

    if(value && index < length-1 && inputRef.current[index+1]){
      inputRef.current[index + 1].focus();
    }
  }
  const handleClick = (index)=>{
    inputRef.current[index].setSelectionRange(1,1);

    if(index > 0 && !otp[index-1]){
      inputRef.current[otp.indexOf("")].focus();
    }
  }
  const handleKeyDown = (e, index)=>{
    if(
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index-1]
    ){
      inputRef.current[index-1].focus();
    }
  }
  return (
    <div className='otp-field'>
      {otp.map((value, index) =>{
        return(
          <input 
            key={index}
            ref={(input)=>{inputRef.current[index] = input}}
            type='text'
            value={value}
            onChange={(e)=>{handleChange(e, index)}}
            onClick={()=>{handleClick(index)}}
            onKeyDown={(e)=>{handleKeyDown(e, index)}}
            
          />
        )
      })}
    </div>
  )
}

export default Otp