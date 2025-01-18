'use client';

import { FilaService } from "@/service/filaService";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import Image from "next/image";
import filaHovetLogo from '../../../../public/logo_hovet.jpg';
import SenhaComponent from "../senha";

type FilaMonitoramentoParams = {
    id: string;
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




function FilaMonitoramentoPage({
    params
}: {
    params: { id: string }
}) {
    const [fila, setFila] = useState<VisualizarFilaProps | null>(null);
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
        return `${dataAtual.getDate()} de ${mesesPorExtenso[dataAtual.getMonth()]}`
    }


    useEffect(() => {

        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
    
        stompClient.connect({}, (frame: any) => {
            console.log('Connected: ' + frame);
    
            stompClient.subscribe(`/topic/fila/${params.id}`, (message) => {
                setFila(JSON.parse(message.body));
            });
        });

        filaService.visualizarFila(params.id).then(retorno => {
            console.log(retorno);
            setFila(retorno.data as any);
        }).catch(erro => {
            console.log(erro);
        });

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            }
        };

    }, [params.id]);

    

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
                    height={200} />

                <span className="text-4xl">{fila?.nome} - {fila?.sala}</span>
                <div className="flex flex-col">
                    <span className="text-4xl">
                        {`${dataAtual.getHours() < 10 ? '0' + dataAtual.getHours() : dataAtual.getHours()}:${dataAtual.getMinutes() < 10 ? '0' + dataAtual.getMinutes() : dataAtual.getMinutes()
                            }:${dataAtual.getSeconds() < 10 ? '0' + dataAtual.getSeconds() : dataAtual.getSeconds()}`}</span>
                    <span className="text-4xl">{getDataFormatada()}</span>
                </div>
            </div>

            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-5">SENHA ATUAL</h2>
                {
                    fila?.senhaAtual ? <SenhaComponent dados={fila.senhaAtual}/> : <p className="text-2xl">Não há senha em atendimento no momento. Aguarde o médico chamar o próximo</p>
                }
            </div>

            <div className="mb-5">
                <h2 className="text-2xl font-bold mb-5">ÚLTIMAS SENHAS</h2>
                {fila?.senhasAnteriores.map(senha => (
                    <SenhaComponent dados={senha} />
                ))}
            </div>
        </div>
    );
}

export default FilaMonitoramentoPage;