"use client"
import Link from "next/link";
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaUser, FaUserDoctor } from "react-icons/fa6";
import { MdPets } from "react-icons/md";
import { PiTelevisionSimple } from "react-icons/pi";
import { BsFillHouseDoorFill } from "react-icons/bs";
import filaHovetLogo from '../public/logo_hovet.jpg';
import Image from "next/image";




function Sidebar() {
    const [open, setOpen] = useState(false);
    const menuItems = [
        { title: 'Gerenciar Salas', icon: <BsFillHouseDoorFill />, route: '/sala' },
        { title: 'Gerenciar Filas', icon: <PiTelevisionSimple />, route: '/fila' },
        { title: 'Gerenciar Usuários', icon: <FaUser />, route: '/usuario' },
        { title: 'Gerenciar Senhas', icon: <MdPets />, route: '/senha' },
    ];

    return (
        <div className="flex flex-row">

            <div className={`bg-sysfila-green h-screen p-5 pt-8 ${open ? 'w-72' : 'w-20'} duration-300 relative`}>
                {open && <Image
                    alt="Logo Hospital Veterinário UFRA"
                    src={filaHovetLogo}
                    width={300}
                    height={200} />}
                    <br />
                <BsArrowLeftShort className={`bg-white text-sysfila-green text-3xl rounded-full absolute -right-3 top-9 border border-sysfila-green cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
                <Link href=''>
                    <div className="inline-flex cursor-pointer">

                        <PiTelevisionSimple className={`text-white text-3xl self-center mr-2 duration-500 ${open && 'rotate-[360deg]'}`} />
                        <div className={`duration-300 ${!open && 'scale-0'}`}>
                            <span className="text-white text-3xl">FILA</span>
                            <span className="text-sysfila-light-green text-3xl">HOVET</span>
                        </div>
                    </div>
                </Link>


                <ul className="mt-9">
                    {
                        menuItems.map((menu, index) => (

                            <Link title={menu.title} key={index} href={menu.route}>
                                <li className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2">
                                    <span className="text-2xl block float-left">
                                        {menu.icon}
                                    </span>
                                    <span className={`text-base duration-200 ${!open && 'hidden'}`}>{menu.title}</span>
                                </li>
                            </Link>

                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;