'use client'
import axios from "axios"
import { useEffect,use } from "react"

export default function FilePage({params}) {
    const { filename } = use(params);
    useEffect(() => {
        axios.get(`/api/transcribe?filename=${filename}`);
    },[filename])
    return (
        <>
        <div>{filename}</div>
        </>
    )
}