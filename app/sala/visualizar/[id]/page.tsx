"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QueueService } from "@/service/queueService";
import { RoomService } from "@/service/roomService";
import { useEffect, useState } from "react";


type Room = {
    id: number
    name: string
}



const SalaVisualize = ({
    params
}: {
    params: { id: string }
}) => {

    const roomService = new RoomService();

    const [sala, setSala] = useState<Room | null>(null);

    
    useEffect(() => {
        roomService.findById(params.id).then(retorno => {
            setSala(retorno.data.data);
        }).catch(erro => {
            console.log(erro.data);
        })
    }, [])


    return (
        <div className="overflow-auto">
            <h1 className="text-3xl">Detalhes da Sala #{params.id}</h1>
            <div className="mt-4 flex flex-col gap-5">
                <h2 className="mb-2 font-bold">Dados principais</h2>


                <div className="mb-2">
                    <Label>Nome</Label>
                    <Input className="mt-2" disabled={true} value={sala?.name} />
                </div>

            </div>
        </div>
    );
}


export default SalaVisualize;