"use client"

type FilaProps = {
    id: number
    nome: string
    situacao: 'ABERTA' | 'FECHADA'
    senhas: []
    codigo: string
}

type MedicalRecordProps = {
    id: number
    codigo: string,
    nomePet: string
    nomeTutor: string,
    nomeFila: string,
    tipoSenha: 'REGULAR' | 'PRIORIDADE',
    situacao: 'PENDENTE_ATENDIMENTO' | 'ATENDIDA' | 'ENCAMINHADA',
    ordem: number,
    dataCriacao: string,
    fila: FilaProps
}

import { Button } from "@/components/ui/button"

import { MedicalRecordService } from "@/service/medicalRecordService"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProntuarioTable from "./_table"


function ProntuarioPage() {
    const columns = [
        { name: 'Prefixo senha' },
        { name: 'Nome do PET' },
        { name: 'Tutor' },
        { name: 'Tipo' },
        { name: 'Situação' },
        { name: 'Fila' },
        { name: 'Data Criação' },
    ];

    const router = useRouter();

    const medicalRecordService = new MedicalRecordService();

    const handleNovoProntuario = () => {
        router.push('/senha/novo');
    }

    const [prontuarios, setProntuarios] = useState<MedicalRecordProps[]>([]);

    useEffect(() => {
        medicalRecordService.findAll().then(retorno => {
            setProntuarios(retorno.data as any);
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