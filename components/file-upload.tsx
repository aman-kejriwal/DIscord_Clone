
"use client"

import {FileIcon, X} from "lucide-react"
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
                <button
                    onClick={()=>onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4 "></X>    
                </button>
            </div>
        )
    }
    if(value&&fileType==="pdf"){
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
                <div className="flex bg-green-200 border-2 p-3 rounded-md">

                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
                <a 
                href={value}
                target="_blank"
                rel="noopener noreferror"  
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {value}
                </a>
                    </div>
                <button
                    onClick={()=>onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4 "></X>    
                </button>
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