"use client"
import Image from "next/image";
import banner from "/public/banner.png"
import logo from "/public/logo.png"
import google from "/public/google.png"
import Link from "next/link";
import { auth } from "./firebase";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth,googleProvider).then((res)=>{
      toast.success('Google Sign In Successful', {
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
      router.push("/success");
    }).catch((err)=>{
      toast.error('Something went wrong while Signing In', {
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
    })
  }
  return (
    <main className="flex min-h-screen items-center justify-center xl:justify-start">
      <div className="hidden xl:block">
        <Image src={banner} className="h-screen" alt="banner"/>
      </div>
      <div className=" flex flex-col j gap-16 p-10 items-center xl:items-start">
        <Image src={logo} width={60} alt="logo"/>
        <h1 className="text-7xl font-black">Happening now</h1>
        <h2 className="text-5xl font-black">Join Twitter today</h2>
        <div className="w-[70%]">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 justify-center items-center sign-btn" onClick={handleGoogleSignIn}><Image src={google} width={30} alt="google"/><span>Signup with Google</span></div>
          <div className="text-center sign-btn" onClick={()=>router.push("/signup")}>Sign up with phone or email</div>
        </div>
        <div className="mt-4">By singing up you agree to the <Link href={"/"} className="blue-color-links">Terms of Service</Link> and <Link href={"/"} className="blue-color-links">Privacy Policy</Link>, including <Link href={"/"} className="blue-color-links">Cookie Use</Link>.</div>
        <div className="text-xl mt-4">Already have an account? <Link href={"/login"} className="blue-color-links">Log in</Link></div>
        </div>
      </div>
    </main>
  );
}
