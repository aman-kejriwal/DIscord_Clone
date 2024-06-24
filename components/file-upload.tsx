
"use client"

import {X} from "lucide-react"
import Image from "next/image"

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"

interface fileUploadProps {
    onChange:(url?:string)=>void;
    value:string;
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload=({onChange,value,endpoint}:fileUploadProps)=>{
    const fileType=value?.split(".").pop();
    if(value&&fileType!=="pdf"){
        return (
            <div className="relative h-20 w-20">
                <Image 
                fill
                src={value}
                alt ="Upload"
                className="rounded-full"
                />
            </div>
        )
    }
    console.log(value);
    return (
            <UploadDropzone 
                endpoint={endpoint}
                onClientUploadComplete={(res)=>{
                onChange(res?.[0].url)
                }}
                onUploadError={(error:Error)=>{
                    console.log(error);
                }}
            />
    )  
}