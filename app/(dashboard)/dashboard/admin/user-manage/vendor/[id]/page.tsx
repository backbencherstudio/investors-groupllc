"use client";
import React from 'react'
import { useParams } from 'next/navigation';
import VendorDetails from './_components/VendorDetails';


export default function page() {

  const { id } = useParams();
  console.log("id: ", id);


  return (
    <div>
      <VendorDetails id={id as string} />
    </div>
  )
}

