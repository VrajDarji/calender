import { create } from "zustand";

interface Modal{
    data:{date:number,month:string,year:number},
    isOpen:boolean,
    onOpen: (d: { date: number; month: string; year: number }) => void;
    onClose:()=>void;
}
export const useModal=create<Modal>((set)=>({
    data:{date:1,month:'January',year:2023},
    isOpen:false,
    onOpen:(d)=>set({isOpen:true,data:d}),
    onClose:()=>set({isOpen:false}),
}))