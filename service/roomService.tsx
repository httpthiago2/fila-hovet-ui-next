import { axiosInstance } from "./axiosConfig";

export class RoomService {
    findAll() {
        return axiosInstance.get('/sala');
    }

    findById(id: string) {
        return axiosInstance.get(`/sala/${id}`);
    }

    create(dados: any) {
        return axiosInstance.post(`/sala`, dados);
    }

    update(id: string, dados: any) {
        return axiosInstance.put(`/sala/${id}`, dados);
    }

    delete(id: number) {
        return axiosInstance.delete(`/sala/${id}`);
    }
}