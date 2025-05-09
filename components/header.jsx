"use client";

import { useStoreUser } from '@/hooks/use-store-user';
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton} from '@clerk/nextjs'
import React from 'react'
import {BarLoader} from "react-spinners";

const Header = () => {

  console.log("header mounted");

  const {isLoading} = useStoreUser()
  return (
    <div>
        <header className='fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60'>
          <nav>
            <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </nav>

          {isLoading && <BarLoader width={"100%"} color='#36d7b7'/>}
        </header>
    </div>
  )
}

export default Header