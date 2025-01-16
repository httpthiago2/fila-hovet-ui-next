import { axiosInstance } from "./axiosConfig";

export class MedicalRecordService {
    findByDate(date: string, filaId: string) {
        console.log(date, filaId);
        return axiosInstance.get(`/senha/find-by-data?data=${date}&filaId=${filaId}`)
    }

    findAll() {
        return axiosInstance.get("/senha");
    }

    findById(id: string) {
        return axiosInstance.get(`/senha/${id}`)
    }

    create(dados: any) {
        return axiosInstance.post(`/senha`, dados);
    }

    update(id: string, dados: any) {
        return axiosInstance.put(`/senha/${id}`, dados);
    }

    delete(id: number) {
        return axiosInstance.delete(`/senha/${id}`);
    }
}