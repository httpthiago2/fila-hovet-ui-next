import { axiosInstance } from "./axiosConfig";

export class FilaService {


    chamarProximo() {
        return axiosInstance.post("http://localhost:8080/fila/chamar-proximo/1");
    }

    visualizarFila() {
        return axiosInstance.get('fila/visualizar/1');
    }

    findAll() {
        return axiosInstance.get('/room');
    }

    findById(id: string) {
        return axiosInstance.get(`/room/${id}`);
    }

    create(dados: any) {
        return axiosInstance.post(`/room`, dados);
    }

    update(id: string, dados: any) {
        return axiosInstance.put(`/room/${id}`, dados);
    }

    delete(id: number) {
        return axiosInstance.delete(`/room/${id}`);
    }
}