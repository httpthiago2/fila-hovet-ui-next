"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QueueService } from "@/service/queueService";
import { RoomService } from "@/service/roomService";
import { UserService } from "@/service/userService";
import { useEffect, useState } from "react";


type User = {
    id: number,
    name: string,
    userName: string,
    profileTypeEnum: 'DOCTOR' | 'SECRETARY' | 'DIRECTOR'
}


const UserVisualize = ({
    params
}: {
    params: { id: string }
}) => {

    const userService = new UserService();

    const [user, setUser] = useState<User | null>(null);

    
    useEffect(() => {
        userService.findById(params.id).then(retorno => {
            setUser(retorno.data.data);
        }).catch(erro => {
            console.log(erro.data);
        })
    }, [])


    return (
        <div className="overflow-auto">
            <h1 className="text-3xl">Detalhes do médico #{params.id}</h1>
            <div className="mt-4 flex flex-col gap-5">
                <h2 className="mb-2 font-bold">Dados principais</h2>


                <div className="mb-2">
                    <Label>Nome</Label>
                    <Input className="mt-2" disabled={true} value={user?.name} />

                    <Label>Usuário</Label>
                    <Input className="mt-2" disabled={true} value={user?.userName} />

                    <Label>Perfil</Label>
                    <Input className="mt-2" disabled={true} value={user?.profileTypeEnum} />
                </div>

            </div>
        </div>
    );
}


export default UserVisualize;