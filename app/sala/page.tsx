"use client"



type Room = {
    id: number
    name: string
}

import { Button } from "@/components/ui/button"

import { QueueService } from "@/service/queueService"
import { useEffect, useState } from "react"
import QueueTable from "./_table"
import { useRouter } from "next/navigation"
import { RoomService } from "@/service/roomService"
import SalaTable from "./_table"


function RoomPage() {
    const columns = [
        { name: 'ID' },
        { name: 'Nome' },
        { name: 'Operações' }
    ];

    const router = useRouter();

    const roomService = new RoomService();

    const handleNovaSala = () => {
        router.push('/sala/novo');
    }

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        roomService.findAll().then(retorno => {
            setRooms(retorno.data.data as any);
        }).catch(erro => {
            console.log(erro);
        });
    }, []);

    return (
        <div className="">
            <h1 className="text-3xl font-bold">Gerenciar Salas</h1>
            <Button onClick={handleNovaSala} className="w-[200px] mt-6 bg-green-500 text-white  hover:bg-green-600 hover:text-white" variant="outline">Nova Sala</Button>

            <SalaTable columns={columns} data={rooms}/>

        </div>
    );
}

export default RoomPage;