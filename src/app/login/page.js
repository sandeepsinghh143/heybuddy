"use client"
import Image from "next/image";
import logo from "/public/logo.png";
import { TextField } from "@mui/material";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";

export default function Login() {
  const [login,setLogin] = useState('');
  const [password,setPassword] = useState('');
  const router = useRouter();
  const handleSignIn = async (e) => {
    e.preventDefault();
    if(!login){
      return toast.warning('Enter either email or Mobile', {
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
    if(!password){
      return toast.warning('Please enter a password', {
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
      let res = await fetch("https://heybuddy-back.onrender.com/user/login",{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          login:login,
          password:password
        })
      })
      let data = await res.json();
      if(data.status==200){
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
      toast.error(err.message, {
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
  return (
    <div className=" flex justify-center items-center w-screen h-screen">
      <div className=" flex flex-col gap-12 p-4 w-full lg:w-1/2 xl:w-1/3 h-[600px]">
        <Image src={logo} width={60} alt="logo"/>
        <h1 className="text-5xl font-black">Login to Twitter</h1>
        <div>
            <form style={{
                display:"flex",
                flexDirection:"column",
                gap:"30px"}}>
              <TextField id="outlined-basic-1" type="text" label="Phone no, Email Address" variant="outlined" value={login} onChange={(e)=>setLogin(e.target.value)}/>
              <TextField id="outlined-basic-2" type="password" label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <Button text={"Log In"} handleClick={handleSignIn}/>
            </form>
        </div>
        <div className="flex justify-between items-center text-blue-500 blue-color-links">
            <div>Forgot password?</div>
            <Link href={"/signup"}>Sign up to Twitter</Link>
        </div>
      </div>
    </div>
  );
}