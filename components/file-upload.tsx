
"use client"
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"

interface fileUploadProps {
    onChange:(url?:string)=>void;
    value:string;
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload=({onChange,value,endpoint}:fileUploadProps)=>{
    console.log(value);
    return (
            // <UploadDropzone 
            // endpoint={endpoint}
            // onClientUploadComplete={(res)=>{
            // onChange(res?.[0].url)
            // }}
            // onUploadError={(error:Error)=>{
            //     console.log(error);
            //     console.log("Aman KUMKEJ");
            // }}
            // />
            <UploadButton 
            endpoint={endpoint}
            />
    )  
}