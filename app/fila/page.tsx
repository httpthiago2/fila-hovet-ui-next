"use client"

type FilaProps = {
    id: number
    name: string
    queueStatus: 'OPEN' | 'CLOSED'
    doctor: User
    room: Room
    medicalRecords: []
    queueCode: string
}

type User = {
    id: number,
    name: string,
}

type Room = {
    id: number
    name: string
}

import { Button } from "@/components/ui/button"

import { QueueService } from "@/service/queueService"
import { useEffect, useState } from "react"
import QueueTable from "./_table"
import { useRouter } from "next/navigation"


function FilaPage() {
    const columns = [
        { name: 'ID' },
        { name: 'Código' },
        { name: 'Nome' },
        { name: 'Status' },
        { name: 'Médico' },
        { name: 'Sala' },
        { name: 'Operações'}
    ];

    const router = useRouter();

    const queueService = new QueueService();

    const handleNovaFila = () => {
        router.push('/fila/novo');
    }

    const [filas, setFilas] = useState<FilaProps[]>([]);

    useEffect(() => {
        queueService.findAll().then(retorno => {
            setFilas(retorno.data.data as any);
        }).catch(erro => {
            console.log(erro);
        });
    }, []);

    return (
        <div className="">
            <h1 className="text-3xl font-bold">Gerenciar Filas</h1>
            <Button onClick={handleNovaFila} className="w-[200px] mt-6 bg-green-500 text-white  hover:bg-green-600 hover:text-white" variant="outline">Nova fila</Button>

            <QueueTable columns={columns} data={filas}/>

        </div>
    );
}

export default FilaPage;