"use client"

type FilaProps = {
    id: number
    name: string
    queueStatus: 'OPEN' | 'CLOSED'
    medicalRecords: []
    queueCode: string
}

type MedicalRecordProps = {
    id: number
    petName: string
    tutor: string
    weight: number
    registerDate: string
    complaint: string
    species: 'FELINE' | 'CANINE'
    gender: 'MALE' | 'FEMALE',
    attendanceOrder: number,
    queue: FilaProps
}

import { Button } from "@/components/ui/button"

import { MedicalRecordService } from "@/service/medicalRecordService"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProntuarioTable from "./_table"


function ProntuarioPage() {
    const columns = [
        { name: 'Código' },
        { name: 'Nome do PET' },
        { name: 'Tutor' },
        { name: 'Peso' },
        { name: 'Data Registro' },
        { name: 'Queixa' },
        { name: 'Espécie' },
        { name: 'Sexo'},
        { name: 'Fila'},
        { name: 'Operações'}
    ];

    const router = useRouter();

    const medicalRecordService = new MedicalRecordService();

    const handleNovoProntuario = () => {
        router.push('/senha/novo');
    }

    const [prontuarios, setProntuarios] = useState<MedicalRecordProps[]>([]);

    useEffect(() => {
        medicalRecordService.findAll().then(retorno => {
            setProntuarios(retorno.data.data as any);
        }).catch(erro => {
            console.log(erro);
        });
    }, []);

    return (
        <div className="overflow-auto">
            <h1 className="text-3xl font-bold">Gerenciar Senhas</h1>
            <Button onClick={handleNovoProntuario} className="w-[200px] mt-6 bg-green-500 text-white  hover:bg-green-600 hover:text-white" variant="outline">Nova Senha</Button>

            <ProntuarioTable columns={columns} data={prontuarios}/>

        </div>
    );
}

export default ProntuarioPage;