
// we are taking files using this file to create a server
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
const f = createUploadthing();

const handleAuth = () => {
    const {userId} = auth();
    if (!userId) throw new Error("unathorized")
        return  {userId:userId};
}

export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB" } })   
        .middleware(({res})   => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
          }),
    messageFile: f(["image", "pdf"])
        .middleware(({res}) => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
          })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;