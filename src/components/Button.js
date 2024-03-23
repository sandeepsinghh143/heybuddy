"use client"
export default function Button({text,handleClick}){
    return (
        <button className="my-btn" onClick={handleClick}>{text}</button>
    )
}