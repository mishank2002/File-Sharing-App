import { File, Shield, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, forwardRef } from 'react';

const SideNav = forwardRef(({ onClose }, ref) => {
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: File,
            path: '/viewfiles'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: Shield,
            path: '/upgrade'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        setActiveIndex(index);
        if (onClose) {
            onClose(); // Close the sidebar when a menu item is clicked
        }
    };

    return (
        <div ref={ref} className='shadow-sm border-r h-full'>
            <div className='p-5 border-b'>
                <a href="/">
                    <Image src='/logo.png' width={150} height={100} style={{ height: '50px', width: '150px' }} />
                </a>
            </div>
            <div className='flex flex-col float-left'>
                {menuList.map((item, index) => (
                    <Link href={item.path} key={item.id}>
                        <div className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full
                             text-gray-500 ${activeIndex === index ? 'bg-blue-50  text-primary' : null}`} onClick={() => handleClick(index)}>
                            <item.icon />
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
});

export default SideNav;
