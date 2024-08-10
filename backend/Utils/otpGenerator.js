const otpGenerator = () => {
  const otp = Math.floor((Math.random()*9999) + 1)
  return otp;
}

export default otpGenerator