'use client'

import { Button } from "@/components/ui/button";
import { FilaService } from "@/service/filaService";
import { MedicalRecordService } from "@/service/medicalRecordService";
import { useEffect, useState } from "react";
import MedicalRecordTable from "../../visualizar/[id]/_recordTable";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import SenhaComponent from "../../monitorar/senha";


type FilaProps = {
    id: number
    nome: string
    situacao: 'ABERTA' | 'FECHADA'
    senhas: []
    codigo: string
}

type SenhaProps = {
    id: number
    codigo: string,
    nomePet: string
    nomeTutor: string,
    nomeFila: string,
    tipoSenha: 'REGULAR' | 'PRIORIDADE',
    situacao: 'PENDENTE_ATENDIMENTO' | 'ATENDIDA' | 'ENCAMINHADA',
    ordem: number,
    dataCriacao: string,
}

type VisualizarFilaProps = {
    nome: string,
    sala: string,
    senhaAtual: SenhaProps,
    senhasAnteriores: SenhaProps[],
    proximasSenhas: SenhaProps[]
}


export default function ManipularFilaPage({
    params
}: {
    params: { id: string }
}) {
    const [fila, setFila] = useState<VisualizarFilaProps>();
    const medicalRecordColumns = [
        { name: 'ID' },
        { name: 'Tutor' },
        { name: 'Nome do PET' },
        { name: 'Tipo Senha' },
        { name: 'Situação' },
        { name: 'Data Registro' },
    ];


    const senhaService = new MedicalRecordService();
    const filaService = new FilaService();
    

    const chamarProximo = () => {
        filaService.chamarProximo(params.id);

    }

    useEffect(() => {
            filaService.visualizarFila(params.id).then(retorno => {
                console.log(retorno);
                setFila(retorno.data as any);
            }).catch(erro => {
                console.log(erro);
            });
    
        }, []);
    
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
    
        stompClient.connect({}, (frame: any) => {
            console.log('Connected: ' + frame);
    
            stompClient.subscribe(`/topic/fila/${params.id}`, (message) => {
                setFila(JSON.parse(message.body));
            });
        });


    return (
        <div>
            <h1>Manipular fila {fila?.nome}</h1>
            
            <h2>Senha atual: </h2>
            <SenhaComponent  dados={fila?.senhaAtual} />

            <h2>Próximas senhas: </h2>
            <MedicalRecordTable columns={medicalRecordColumns} data={fila?.proximasSenhas || []} />

            <Button onClick={chamarProximo} className="w-[200px] mt-6 bg-green-500 text-white  hover:bg-green-600 hover:text-white" variant="outline">Chamar próximo</Button>
        </div>
    );
}