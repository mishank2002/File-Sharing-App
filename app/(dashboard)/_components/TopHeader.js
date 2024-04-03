import { UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import SideNav from './SideNav';

function TopHeader() {
    const [isActive, setIsActive] = useState(false);
    const sideNavRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target) && isActive) {
                toggleSideNav(); // Close the sidebar when clicked outside of it
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isActive]);

    const toggleSideNav = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <div className='flex p-5 border-b items-center justify-between md:justify-end'>
                <AlignJustify className='md:hidden' onClick={toggleSideNav} />
                <Image src='/logo.png' width={150} height={100} className='md:hidden' onClick={toggleSideNav} />
                <UserButton />
            </div>
            {isActive && <SideNav ref={sideNavRef} onClose={toggleSideNav} />}
        </div>
    );
}

export default TopHeader;
