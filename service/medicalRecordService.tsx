import { axiosInstance } from "./axiosConfig";

export class MedicalRecordService {
    findByDate(date: string, filaId: string) {
        return axiosInstance.get(`/medical-record/find-by-data?data=${date}&filaId=${filaId}`)
    }

    findAll() {
        return axiosInstance.get("/medical-record");
    }

    findById(id: string) {
        return axiosInstance.get(`/medical-record/${id}`)
    }

    create(dados: any) {
        return axiosInstance.post(`/medical-record`, dados);
    }

    update(id: number, dados: any) {
        return axiosInstance.put(`/medical-record/${id}`, dados);
    }

    delete(id: number) {
        return axiosInstance.delete(`/medical-record/${id}`);
    }
}