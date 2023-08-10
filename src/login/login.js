import React, { useState } from 'react'
import Input from '../input/input'
import './login.css'
import axios from "../plugin/axios";
import { useNavigate } from 'react-router-dom';
import Button54 from '../button-54/button';
const Login = () => {

  const navigate = useNavigate()
  // valid cred
  // email: workshop@gmail.com
  // pass: @pass322w
  const [data,Setdata] = useState({
    email:"",password:""
  })

 
 
  const [warn,setwarn]=useState({
    show:false,text:""
  })
  
  return (
    <div className='container'>

   
      <form   onSubmit={ async (e)=>{
        e.preventDefault()
       
        // post("token/login/", data)
        // post is method na sya option can be. [put,get,patch,delete] it dependce sa API nimo

        // 1st parameter ang API link
        // 2nd is ang data na imong e pasa

        await axios.post("token/login/", data).then((e)=>{

          //ang .then is pag mo gana ang api nato kini na code iyang e run else is kanang catch
          
          //dri gi print nakong authtoken na response sa api, tas nag gamit tag dot pra ma access specificaly ang auth_token
          // you can try console.log lang ang "e" pra makita ninyong reponse
          console.log(e.data.auth_token)

          //here is gi store nato sya sa local storage ang token for future use. you can check the localstorage sa application sa dev tool sa browser
          localStorage.setItem('token',e.data.auth_token)
          
          //here is gi gamit natong lahi na api pra ang token ma convert to credentials sa user
            axios.get("users/me/",{
              headers: {
                Authorization: `Token ${e.data.auth_token}`
              },
            }).then(e=>{
              //here is gi store nato ang credentials sa user sa localstorage

              setwarn({
                show:true,text:"Logging In...please wait"
              })
              setTimeout(()=>{
                setwarn({
                  show:false,text:""
                })
                //ang navigate is mura rasyag address na iyang agtoan, base the route sa app.js
                navigate('/main')
              },5000)
              localStorage.setItem('cred',JSON.stringify(e.data))
            })
          

        }).catch(e=>{
          //dri bisan mag error imong api di ma daot imong site, kibali gi catch niya ang system
          console.log(e.response.data.non_field_errors[0])
            setwarn({
              show:true,text:e.response.data.non_field_errors[0]
            })
            setTimeout(()=>{
              setwarn({
                show:false,text:""
              })
            },5000)
        })

       }}  className='form'>

        <h1>Pesbok</h1>
       <Input
        text="Email"
        type="email"
        value={data.email}
        onChange={(e)=>{
          Setdata({...data,email:e.target.value})
        }}
       />
       <Input
       text="Password"
       type="password"
       value={data.password}
        onChange={(e)=>{
          Setdata({...data,password:e.target.value})
        }}
       />

    <div className='warning' style={warn.show?{display:"flex"}:{display:"none"}}>

      <p>{warn.text}</p>

    </div>
    
    <Button54
    text="Login"
    />



     
     
       

      </form>
       
        
       
    </div>
  )
}

export default Login