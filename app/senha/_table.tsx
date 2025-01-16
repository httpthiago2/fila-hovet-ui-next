import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { PiTelevisionSimple } from "react-icons/pi";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { MedicalRecordService } from "@/service/medicalRecordService";

type Column = {
    name: string
}

type FilaProps = {
    id: number
    nome: string
    situacao: 'ABERTA' | 'FECHADA'
    senhas: []
    codigo: string
}

type MedicalRecordProps = {
    id: number
    codigo: string,
    nomePet: string
    nomeTutor: string,
    nomeFila: string,
    tipoSenha: 'REGULAR' | 'PRIORIDADE',
    situacao: 'PENDENTE_ATENDIMENTO' | 'ATENDIDA' | 'ENCAMINHADA',
    ordem: number,
    dataCriacao: string,
    fila: FilaProps
}

const ProntuarioTable = ({ columns, data }: { columns: Column[]; data: MedicalRecordProps[] }) => {

    const { push } = useRouter();

    const { toast } = useToast();

    const medicalRecordService = new MedicalRecordService();

    const handleVisualizeProntuario = (id: number) => {
        push(`/senha/visualizar/${id}`)
    };

    const handleEditProntuario= (id: number) => {
        push(`/senha/editar/${id}`)
    };

    const handleRemoveProntuario = async (id: number) => {
        medicalRecordService.delete(id).then(resposta => {
            toast({
                title: 'Sucesso',
                description: resposta.data.message
            })
            window.location.reload()
        }).catch(erro => {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao remover prontuário'
            })
        })
    };

    return (


        <Table className="mt-6 p-6">
            <TableHeader>
                <TableRow>
                    {columns.map(({ name }, index) => (
                        <TableCell key={index}>{name}</TableCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(({ id, nomePet, nomeTutor, dataCriacao, tipoSenha, nomeFila, situacao, codigo }) => (
                    <TableRow key={id}>
                        <TableCell>{codigo}</TableCell>
                        <TableCell>{nomePet}</TableCell>
                        <TableCell>{nomeTutor}</TableCell>
                        <TableCell>{tipoSenha}</TableCell>
                        <TableCell>{situacao}</TableCell>
                        <TableCell>{nomeFila}</TableCell>
                        <TableCell>{dataCriacao}</TableCell>
                        <TableCell className="flex flex-row gap-3">
                            <MdEdit onClick={() => handleEditProntuario(id)} title="Editar" className="text-3xl rounded-md p-1 text-blue-600 cursor-pointer duration-300 hover:bg-gray-300 " />
                            <FaEye onClick={() => handleVisualizeProntuario(id)} title="Visualizar" className="text-3xl rounded-md p-1  cursor-pointer duration-300 hover:bg-gray-300" />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <FaTrashCan title="Apagar" className="text-3xl rounded-md p-1 text-red-600 cursor-pointer duration-300 hover:bg-gray-300" />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Ao apagar uma fila, todos os seus prontuários são desassociados.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleRemoveProntuario(id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ProntuarioTable;
