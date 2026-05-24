
"use client"
import React from 'react'
import InvestorDetails from './_components/InvestorDetails'
import { useParams } from 'next/navigation';
import { useGetUserByIdQuery } from '@/redux/features/user/UserApi';

export default function page() {
  const { id } = useParams();
  console.log("id: ", id);



  return (
    <div>
      <InvestorDetails id={id as string} />
    </div>
  )
}
