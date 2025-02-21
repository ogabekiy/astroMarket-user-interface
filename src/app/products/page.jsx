"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // next/navigation dan import qiling

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/categories');
  }, [router]);

  return <div></div>;
}