import React from 'react'
import Logo from './Logo'
import UserButton from './UserButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import  Link  from 'next/link';

const Header = async () => {
  const Session = await getServerSession(authOptions)
  return (
    <header className=' bg-transparent dark:bg-transparent'>
        <nav className='flex flex-col sm:flex-row items-center 
        p-5 pl-2 dark:bg-transparent max-w-7xl mx-auto'>
            <Logo/>
          <div className="flex-1 flex items-center justify-end space-x-4">

                <Link
                  href={"/library"}
                  prefetch={false}
                >
                  <p className='text-neutral-600 font-bold text-sm'> Library</p>
                  
                </Link>
            <UserButton Session={Session}/>
          </div>
        </nav>
    </header>
  )
}

export default Header