'use client';

import { FilaService } from "@/service/filaService";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import {Stomp} from '@stomp/stompjs';


type FilaMonitoramentoParams = {
    id: string;
}




function FilaMonitoramentoPage() {
    const [fila, setFila] = useState<null | any>(null);
    const filaService = new FilaService();


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

    return (
        <div>
            <h1>Visualizando senha </h1>

            <div>
                <h2>Senha atual</h2>
                <span>{fila.senhaAtual.senha}</span>
                <span>{fila.senhaAtual.tutor}</span>
            </div>
            <div>
                <h2>Senhas anteriores</h2>
                {fila.senhasAnteriores.map((senha: any) => (
                    <div>
                        <span>{senha.senha}</span>
                        <span>{senha.tutor}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilaMonitoramentoPage;