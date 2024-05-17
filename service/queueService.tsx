import { axiosInstance } from "./axiosConfig"

export class QueueService {

    findAll() {
        return axiosInstance.get('/queue')
    }

    findById(id: string) {
        return axiosInstance.get(`/queue/${id}`)
    }

    findByStatus(status: string) {
        return axiosInstance.get(`/queue/find-by-status/${status}`)
    }

    create(dados: any) {
        return axiosInstance.post('/queue', dados);
    }

    remove(id: number) {
        return axiosInstance.delete(`/queue/${id}`);
    }
}