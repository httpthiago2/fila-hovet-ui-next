import { useEffect, useState } from 'react';

type QueueItem = {
  nome: string;
  sala: string;
  senhaAtual: SenhaItem;
  senhasAnteriores: SenhaItem[];
};


type SenhaItem = {
  senha: string;
  ordem: number;
  pet: string;
  tutor: string;
}

const useWebSocketQueue = (url: string) => {
  const [queue, setQueue] = useState<QueueItem | null>(null); // Estado para armazenar a fila
  const [isConnected, setIsConnected] = useState<boolean>(false); // Estado para verificar a conexão
  const [error, setError] = useState<string | null>(null); // Estado para armazenar erros

  useEffect(() => {
    // Função para abrir a conexão WebSocket
    const socket = new WebSocket(url);

    // Evento de quando a conexão WebSocket é aberta
    socket.onopen = () => {
      console.log('Conectado ao WebSocket');
      setIsConnected(true);
    };

    // Evento de quando uma mensagem é recebida
    socket.onmessage = (event) => {
      try {
        const updatedQueue: QueueItem = JSON.parse(event.data); // Dados da fila recebidos
        setQueue(updatedQueue); // Atualiza o estado da fila
      } catch (err) {
        setError('Erro ao processar a mensagem do WebSocket');
      }
    };

    // Evento de quando ocorre um erro na conexão
    socket.onerror = (err) => {
      setError('Erro de conexão com o WebSocket');
      console.error('Erro WebSocket: ', err);
    };

    // Evento de quando a conexão é fechada
    socket.onclose = () => {
      console.log('Conexão WebSocket fechada');
      setIsConnected(false);
    };

    // Limpeza do WebSocket quando o componente for desmontado
    return () => {
      socket.close();
    };
  }, [url]); // Dependência do URL, se o URL mudar, o efeito será reexecutado

  return { queue, isConnected, error };
};

export default useWebSocketQueue;

