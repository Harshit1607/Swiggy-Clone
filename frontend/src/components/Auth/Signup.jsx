import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAuth, getLogin } from '../../Redux/userAction'

const Signup = () => {
  const {hiddenSignup} = useSelector(state=>state.userReducer)
  const dispatch = useDispatch()
  return (
    <div className="auth-container" style={{display: hiddenSignup? "none" : ""}}>
      <div className="auth-cut">
        <span onClick={()=>dispatch(closeAuth)}>X</span>
      </div>
      <div className="auth-type">
        <div className="auth-type-left">
          <span></span>
          <span onClick={()=>dispatch(getLogin)}>Login</span>
        </div>
        <div className="auth-type-right"></div>
      </div>
      <div className="auth-fields">
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <button>Signup</button>
      </div>
    </div>
  )
}

export default Signup