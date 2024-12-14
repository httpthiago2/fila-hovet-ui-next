'use client';

import { FilaService } from "@/service/filaService";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import {Stomp} from '@stomp/stompjs';
import Image from "next/image";
import filaHovetLogo from '../../../../public/logo_hovet.jpg';
import SenhaComponent from "../senha";

type FilaMonitoramentoParams = {
    id: string;
}

export type FilaVisualizacao = {
    nome: string;
    sala: string;
    senhaAtual: SenhaVisualizacao;
    senhasAnteriores: SenhaVisualizacao[] 
}

type SenhaVisualizacao = {
    senha: string;
    ordem: number;
    pet: string;
    tutor: string;
    tipo: 'REGULAR' | 'PRIORIDADE'
}




function FilaMonitoramentoPage() {
    const [fila, setFila] = useState<FilaVisualizacao | null>(null);
    const [dataAtual, setDataAtual] = useState<Date>(new Date());
    const filaService = new FilaService();
    const mesesPorExtenso = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
    ]

    const getDataFormatada = () => {
        return `${dataAtual.getDate()} de ${mesesPorExtenso[dataAtual.getMonth() - 1]}` 
    }


    useEffect(() => {
        filaService.visualizarFila().then(retorno => {
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

        stompClient.subscribe('/topic/fila/1', (message) => {
            setFila(JSON.parse(message.body));
        });
    });

    setInterval(() => {
        setDataAtual(new Date);
    }, 1000);

    return (
        <div>
            <div className="header mb-5 flex flex-row justify-between items-center">
                <Image 
                    alt="Logo Hospital Veterinário UFRA"
                    src={filaHovetLogo}
                    width={300}
                    height={200}/>

                <span className="text-4xl">{fila?.nome} - {fila?.sala}</span>
                <div className="flex flex-col">
                    <span className="text-4xl">{`${dataAtual.getHours()}:${dataAtual.getMinutes()  < 10 ? '0' + dataAtual.getMinutes() : dataAtual.getMinutes()
                    }:${dataAtual.getSeconds() < 10 ? '0' + dataAtual.getSeconds() : dataAtual.getSeconds()}`}</span>
                    <span className="text-4xl">{getDataFormatada()}</span>
                </div>
            </div>

            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-5">SENHA ATUAL</h2>
                <SenhaComponent  dados={fila?.senhaAtual}/>
            </div>

            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-5">ÚLTIMAS SENHAS</h2>
                {fila?.senhasAnteriores.map(senha => (
                    <SenhaComponent dados={senha}/>
                ))}
            </div>
        </div>
    );
}

export default FilaMonitoramentoPage;