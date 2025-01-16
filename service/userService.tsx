import { axiosInstance } from "./axiosConfig";

export class UserService {

    findAll() {
        return axiosInstance.get(`/usuario`);
    }

    findByTipoPerfil(tipo: string) {
        return axiosInstance.get(`/usuario/find-by-perfil/${tipo}`);
    }

    findById(id: string) {
        return axiosInstance.get(`/usuario/${id}`)
    }

    create(dados: any) {
        return axiosInstance.post(`/usuario`, dados);
    }

    update(id: string, dados: any) {
        return axiosInstance.put(`/usuario/${id}`, dados);
    }

    delete(id: number) {
        return axiosInstance.delete(`/usuario/${id}`);
    }
}