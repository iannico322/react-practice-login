import React from 'react'
import './input.css'
const Input = (props) => {
  return (
    <div className='input-field'>
        <p>{props.text}</p>
        <input type={props.type} value={props.value} onChange={props.onChange} placeholder={props.text} required/>
    </div>
    
  )
}

export default Input