"use client"

type User = {
    id: number,
    nome: string,
    usuario: string,
    perfil: 'MEDICO' | 'SECRETARIO' | 'DIRETOR'
}

import { Button } from "@/components/ui/button"

import { UserService } from "@/service/userService"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import SalaTable from "./_table"


function UsuarioPage() {
    const columns = [
        { name: 'ID' },
        { name: 'Nome' },
        { name: 'Usuário' },
        { name: 'Perfil' },
        { name: 'Operações' }
    ];

    const router = useRouter();

    const userService = new UserService();

    const handleNovaSala = () => {
        router.push('/usuario/novo');
    }

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        userService.findAll().then(retorno => {
            setUsers(retorno.data as any);
        }).catch(erro => {
            console.log(erro);
        });
    }, []);

    return (
        <div className="">
            <h1 className="text-3xl font-bold">Gerenciar Médicos</h1>
            <Button onClick={handleNovaSala} className="w-[200px] mt-6 bg-green-500 text-white  hover:bg-green-600 hover:text-white" variant="outline">Novo Médico</Button>

            <SalaTable columns={columns} data={users} />

        </div>
    );
}

export default UsuarioPage;