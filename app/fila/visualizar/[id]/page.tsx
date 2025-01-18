"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalRecordService } from "@/service/medicalRecordService";
import { QueueService } from "@/service/queueService";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import MedicalRecordTable from "./_recordTable";


type FilaProps = {
    id: number,
    nome: string
    codigo: string
    situacao: 'ABERTA' | 'FECHADA'
    usuario: User
    sala: Room
    senhas: []
}

type User = {
    id: number,
    nome: string,
}

type Room = {
    id: number
    nome: string
}

type MedicalRecordProps = {
    id: number;
    nomePet: string;
    nomeTutor: string;
    tipoSenha: string;
    situacao: 'PENDENTE_ATENDIMENTO' | 'ATENDIDA' | 'ENCAMINHADA'
    dataCriacao: string;
    codigo: string;
};


const QueueVisualize = ({
    params
}: {
    params: { id: string }
}) => {

    const queueService = new QueueService();
    const medicalRecordService = new MedicalRecordService();

    const [fila, setFila] = useState<FilaProps | null>(null);

    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date())

    const medicalRecordColumns = [
        { name: 'ID' },
        { name: 'Tutor' },
        { name: 'Nome do PET' },
        { name: 'Tipo Senha' },
        { name: 'Situação' },
        { name: 'Data Registro' },
    ];

    const [medicalRecords, setMedicalRecords] = useState<MedicalRecordProps[]>([]);

    const handleChangeDate = async (novaData: Date | undefined) => {
        setDataSelecionada(novaData);
        if (novaData) {
            const stringDate = novaData.toISOString().split("T")[0];
            console.log('chamando', stringDate);
            try {
                const response = await medicalRecordService.findByDate(stringDate, params.id);
                setMedicalRecords(response.data);
            } catch (error) {
                console.error('Erro ao buscar registros médicos:', error);
            }
        }
    };

    useEffect(() => {
        queueService.findById(params.id).then(retorno => {
            console.log(retorno.data)
            setFila(retorno.data);
        }).catch(erro => {
            console.log(erro.data);
        })

        const dataAtual = new Date().toISOString().split("T")[0];
        console.log("data atual: ", dataAtual);

        medicalRecordService.findByDate(dataAtual, params.id)
            .then(retorno => {
                setMedicalRecords(retorno.data);
            }).catch(error => {
                console.log(error.data);
            })
    }, [])


    return (
        <div className="overflow-auto">
            <h1 className="text-3xl">Detalhes da fila #{params.id}</h1>
            <div className="mt-4 flex flex-col gap-5">
                <h2 className="mb-2 font-bold">Dados principais</h2>


                <div className="mb-2">
                    <Label>Nome</Label>
                    <Input className="mt-2" disabled={true} value={fila?.nome || ''} />
                </div>

                <div className="mb-2">
                    <Label>Status</Label>
                    <Input className="mt-2" disabled={true} value={fila?.situacao || ''} />
                </div>

                <div className="mb-2">
                    <Label>Médico</Label>
                    <Input className="mt-2" disabled={true} value={fila?.usuario.nome || ''} />
                </div>

                <div className="mb-2">
                    <Label>Sala</Label>
                    <Input className="mt-2" disabled={true} value={fila?.sala.nome || ''} />
                </div>

                <div className="mb-2">
                    <Label>Prefixo da senha</Label>
                    <Input className="mt-2" disabled={true} value={fila?.codigo || ''} />
                </div>
            </div>

            <div id="queue-table" className="mt-4">
                <h2 className="mb-2 font-bold">Senhas</h2>

                <div className="flex flex-row gap-3 mt-5">
                    <Calendar
                        mode="single"
                        selected={dataSelecionada}
                        onSelect={handleChangeDate}
                        className="rounded-md border"
                    />

                    <MedicalRecordTable columns={medicalRecordColumns} data={medicalRecords || []} />
                </div>

            </div>


        </div>
    );
}


export default QueueVisualize;