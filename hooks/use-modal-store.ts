import { Server } from '@prisma/client';
import { types } from 'util';
import {create} from 'zustand'

export type ModalType="createServer"|"invite";

interface ModalData{
    server:Server
}
interface ModalStore{
    type:ModalType|null;
    isOpen:boolean;
    data:ModalData;
    onOpen:(types:ModalType)=> void;
    onClose:()=>void;
}
export const useModal=create<ModalStore>((set)=>({
    type:null,
    isOpen:false,
    data:{},
    onOpen:(type)=> set({isOpen:true,type}),
    onClose:()=> set({type:null,isOpen:false})
}))