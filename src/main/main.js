import React, { useEffect, useState } from 'react'
import Box from '../box/box'
import './main.css'
import { useNavigate } from 'react-router-dom'
import Button54 from '../button-54/button'
import axios from './../plugin/axios'
import Input from '../input/input'
const Main = () => {

    
    const navigate = useNavigate()
    const [rooms,setRooms] = useState([])
    const [search ,setsearch] = useState("")
    const data = JSON.parse(localStorage.getItem('cred'))

    //here gi access nato ang get rooms na api using token, so if wakay token di ka, ka access
    
    useEffect(()=>{
         axios.get('rooms/',{
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
            },
          }).then(e=>{
            //if mo gana ang api, e console.log niya ang e.data then e assign niya sa hook na search
            setRooms(e.data)
            console.log(e.data)
        }).catch(e=>{
            console.log("error lang sa")
        })

    },[])


  return (
    <div className='main'>
        <Button54

        onClick={()=>{
            localStorage.clear()
            navigate("/login")
        }}
        text="Logout"
        />
        <h1> ID: {data.id}</h1>
        <h1> Name: {data.first_name} {data.last_name}</h1>
        <h1>Email: {data.email}</h1>
        
        <h1>token: {localStorage.getItem('token')}</h1>

        <Input
        text="Search"
        type="text"
        value={search}
        onChange={(e)=>{
        setsearch(e.target.value)
        }}
       />
        
        <div className='room-con'>
            {
                //here nag gamit tag filter pra ma match natong mga roomname sa data nato sa atong search na hook
            rooms? rooms.filter(e=>e.roomName.toLowerCase().startsWith(search) 
            || e.roomName.toLowerCase().includes(search)).map((e,key)=>(
                <Box
                key={key}
                roomName={e.roomName}
                roomType={e.roomType}
                buildingNumber ={e.buildingNumber}
                />
            )):""}
         </div>
        
        
    </div>
  )
}

export default Main