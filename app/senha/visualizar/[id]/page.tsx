"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalRecordService } from "@/service/medicalRecordService";
import { QueueService } from "@/service/queueService";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import ProntuarioTable from "../../_table";


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

type MedicalRecordProps = {
    id: number;
    petName: string;
    tutor: string;
    weight: number;
    registerDate: string;
    complaint: string;
    species: 'FELINE' | 'CANINE';
    gender: 'MALE' | 'FEMALE'
    attendanceOrder: number;
    medicalRecordStatus: 'ATTENDED' | 'PENDING',
    queue: FilaProps
};


const ProntuarioVisualize = ({
    params
}: {
    params: { id: string }
}) => {

    const medicalRecordService = new MedicalRecordService();

    const [prontuario, setProntuario] = useState<MedicalRecordProps | null>(null);


    useEffect(() => {
        medicalRecordService.findById(params.id).then(retorno => {
            setProntuario(retorno.data.data);
        }).catch(erro => {
            console.log(erro.data);
        })
    }, [])


    return (
        <div className="overflow-auto">
            <h1 className="text-3xl">Detalhes do prontuário #{params.id}</h1>
            <div className="mt-4 flex flex-col gap-5">
                <h2 className="mb-2 font-bold">Dados principais</h2>


                <div className="mb-2">
                    <Label>Nome do PET</Label>
                    <Input className="mt-2" disabled={true} value={prontuario?.petName} />
                </div>

                <div className="mb-2">
                    <Label>Tutor</Label>
                    <Input className="mt-2" disabled={true} value={prontuario?.tutor} />
                </div>

                <div className="mb-2">
                    <Label>Peso</Label>
                    <Input className="mt-2" disabled={true} value={prontuario?.weight + ' Kg'} />
                </div>

                <div className="mb-2">
                    <Label>Queixa</Label>
                    <Input className="mt-2" disabled={true} value={prontuario?.complaint} />
                </div>

                <div className="mb-2">
                    <Label>Espécie</Label>
                    <Input className="mt-2" disabled={true} value={prontuario?.species} />
                </div>

                <div className="mb-2">
                    <Label>Sexo</Label>
                    <Input className="mt-2" disabled={true} value={prontuario?.gender} />
                </div>

                <div className="mb-2">
                    <Label>Fila</Label>
                    <Input className="mt-2" disabled={true} value={prontuario?.queue.name} />
                </div>
            </div>

        </div>
    );
}


export default ProntuarioVisualize;