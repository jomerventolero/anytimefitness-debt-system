"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { useState } from 'react'


const Upload = () => {
  const [file, setFile] = useState<File | null>(null);

  const onchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);

    const formData = new FormData();

    formData.append("file", file!);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.log(error)
    }
    console.log("Submitted")
  }

  return (
    <div className="py-5 flex flex-col gap-5">
      <hr />
      <Drawer>
        <DrawerTrigger className='bg-black text-white rounded-lg px-4 py-2 w-[200px]'>
          Upload Excel File
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select a File to Upload</DrawerTitle>
            <DrawerDescription>Only Excel files are allowed</DrawerDescription>
            <Input type="file" placeholder="Upload File" className="w-[150px]" onChange={onchange}/>
          </DrawerHeader>
          <DrawerFooter className='flex flex-row w-full'>
            <Button className="w-[250px]">Submit</Button>
            <DrawerClose>
              <Button className="w-[250px]" variant="outline">Cancel</Button>
            </DrawerClose> 
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Upload