import { axiosInstance } from "./axiosConfig"

export class QueueService {

    findAll() {
        return axiosInstance.get('/fila')
    }

    findById(id: string) {
        return axiosInstance.get(`/fila/${id}`)
    }

    findByStatus(status: string) {
        return axiosInstance.get(`/fila/find-by-situacao/${status}`)
    }

    create(dados: any) {
        return axiosInstance.post('/fila', dados);
    }

    remove(id: number) {
        return axiosInstance.delete(`/fila/${id}`);
    }
}