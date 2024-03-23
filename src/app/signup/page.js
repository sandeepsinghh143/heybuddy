"use client"
import Image from "next/image";
import logo from "/public/logo.png"
import { TextField } from "@mui/material";
import Button from "@/components/Button";
import BasicSelect from "@/components/Select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";

export default function Signup(){
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [name,setName] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');
    const [mail,setMail] = useState(false);
    const [cont,setCont] = useState(false);
    const router = useRouter();
  const handleMonth = (event) => {
    setMonth(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!password || !confirmPassword){
      return toast.warning('Password is required', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    if(password.length<8){
      return toast.warning('Password too short. At least 8 characters required', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    if(password!=confirmPassword){
      return toast.warning('Password does not match', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    try{
      let res = await fetch("https://heybuddy-back.onrender.com/user/register",{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          name,
          login,
          password,
          date,
          month,
          year
        })
      });
      let data = await res.json();
      if(data.status==201){
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
        router.push("/success")
      }
      else{
        toast.warning(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
      }
    }
    catch(err){
      return toast.error(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }

  }
  const handleNext = (e) => {
    e.preventDefault();
    if(!name || !login || !month || !date || !year){
      return toast.warning('Missing Credentials', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }
    setCont(true);
  }

    const months= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    let years=[];
    let dates;
    let startYear = 1980;
    let currentYear = new Date().getFullYear();
    for(let i = startYear; i <= currentYear; i++){
        years.push(i)
    }
    if(month==months[1]){
        if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
            dates=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
        }
        else{
            dates=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
        }
    }
    else if(month==months[3] || month==months[5] || month==months[8] || month==months[10]){
        dates=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    }
    else{
        dates=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    }
    return (
        <div className=" flex justify-center items-center w-screen h-screen">
      <div className=" flex flex-col gap-12 xl:w-1/3 p-4 w-full h-[600px]">
        <Image src={logo} width={60} alt="logo" className="self-center"/>
        <h1 className="text-3xl font-black">{cont?"Continue":"Create an account" }</h1>
        <div>
            {cont?
            (<form style={{
              display:"flex",
              flexDirection:"column",
              gap:"30px",
              }}>
            <TextField id="outlined-basic-3" label="Password" variant="outlined" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <TextField id="outlined-basic-4" label="Confirm Password" variant="outlined" type="password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
            <Button text={"Sign Up"} handleClick={handleSubmit}/>
          </form>)
            :(<form style={{
                display:"flex",
                flexDirection:"column",
                gap:"30px"}}>
              <TextField id="outlined-basic-1" label="Name" variant="outlined" type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
              <TextField id="outlined-basic-2" label={mail?"Email":"Phone number"} variant="outlined" type={mail?'email':'text'} onChange={(e)=>setLogin(e.target.value)} value={login}/>
              <div onClick={()=>setMail(!mail)} className="blue-color-links cursor-pointer">{mail?"Use Phone":"Use email"}</div>
              <div>
                <h3 className="text-xl font-black">Date of birth</h3>
                <div>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>
              </div>
              <div className="flex justify-between items-center gap-5">
                 <BasicSelect data={months} extra={"Month"} wid={50} val={month} handleChange={handleMonth}/>
                 <BasicSelect data={dates} extra={"Date"} wid={25} val={date} handleChange={handleDate}/>
                 <BasicSelect data={years} extra={"Year"} wid={25} val={year} handleChange={handleYear}/>
              </div>
              <Button text={"Next"} handleClick={handleNext}/>
            </form>)}
        </div>
      </div>
    </div>
    )
}