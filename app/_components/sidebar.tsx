"use client"
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { PiTelevisionSimple } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";



function Sidebar() {
    const [open, setOpen] = useState(false);
    const menuItems = [
        { title: 'Gerenciar Prontuários', icon: <MdPets />, route: '/prontuario' },
        { title: 'Gerenciar Filas', icon: <PiTelevisionSimple />, route: '/fila' },
        { title: 'Gerenciar Médicos', icon: <FaUserDoctor />, route: '/medico' },
    ];

    return (
        <div className="flex flex-row">
            <div className={`bg-sysfila-green h-screen p-5 pt-8 ${open ? 'w-72' : 'w-20'} duration-300 relative`}>
                <BsArrowLeftShort className={`bg-white text-sysfila-green text-3xl rounded-full absolute -right-3 top-9 border border-sysfila-green cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />

                <div className="inline-flex cursor-pointer">
                    <PiTelevisionSimple className={`text-white text-3xl self-center mr-2 duration-500 ${open && 'rotate-[360deg]'}`} />
                    <div className={`duration-300 ${!open && 'scale-0'}`}>
                        <span className="text-white text-3xl">FILA</span>
                        <span className="text-sysfila-light-green text-3xl">HOVET</span>
                    </div>
                </div>

                <ul className="mt-9">
                    {
                        menuItems.map((menu, index) => (
                            <>
                                <Link href={menu.route}>
                                    <li key={index} className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
                                        <span className="text-2xl block float-left">
                                            {menu.icon}
                                        </span>
                                        <span className={`text-base duration-200 ${!open && 'hidden'}`}>{menu.title}</span>
                                    </li>
                                </Link>
                            </>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;