import { axiosInstance } from "./axiosConfig";

export class UserService {
    findByTipoPerfil(tipo: string) {
        return axiosInstance.get(`/user/find-by-tipo/${tipo}`);
    }

    findById(id: string) {
        return axiosInstance.get(`/user/${id}`)
    }

    create(dados: any) {
        return axiosInstance.post(`/user`, dados);
    }

    update(dados: any) {
        return axiosInstance.put(`/user`, dados);
    }

    delete(id: number) {
        return axiosInstance.delete(`/user/${id}`);
    }
}