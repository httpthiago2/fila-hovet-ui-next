import { axiosInstance } from "./axiosConfig";

export class RoomService {
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