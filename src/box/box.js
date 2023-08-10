import React from 'react'
import './box.css'
const Box = (props) => {
  return (
    <div className='box' >
        <div className='bg' style={{backgroundColor:props.color}}>
            {props.roomType}
        </div>
        <div className='text'>
        <h1>{props.roomName}</h1>
        <p>{props.buildingNumber}</p>
        </div>
    </div>
  )
}

export default Box