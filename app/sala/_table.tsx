import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { PiTelevisionSimple } from "react-icons/pi";
import { useRouter } from "next/navigation";

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
} from "@/components/ui/alert-dialog"
import { QueueService } from "@/service/queueService";
import { useToast } from "@/components/ui/use-toast";
import { RoomService } from "@/service/roomService";

type Column = {
    name: string
}

type Room = {
    id: number
    nome: string
}

const SalaTable = ({ columns, data }: { columns: Column[]; data: Room[] }) => {

    const { push } = useRouter();

    const { toast } = useToast();

    const roomService = new RoomService();

    const handleVisualizeSala = (id: number) => {
        push(`/sala/visualizar/${id}`)
    };

    const handleEditSala = (id: number) => {
        push(`/sala/editar/${id}`)
    };

    const handleRemoveSala = async (id: number) => {
        roomService.delete(id).then(resposta => {
            toast({
                title: 'Sucesso',
                description: resposta.data.message
            })
            window.location.reload()
        }).catch(erro => {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao remover a sala'
            })
        })
    };

    return (


        <Table className="mt-6">
            <TableHeader>
                <TableRow>
                    {columns.map(({ name }, index) => (
                        <TableCell key={index}>{name}</TableCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(({ id, nome }) => (
                    <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{nome}</TableCell>
                        <TableCell className="flex flex-row gap-3">
                            <MdEdit onClick={() => handleEditSala(id)} title="Editar" className="text-3xl rounded-md p-1 text-blue-600 cursor-pointer duration-300 hover:bg-gray-300 " />
                            <FaEye onClick={() => handleVisualizeSala(id)} title="Visualizar" className="text-3xl rounded-md p-1  cursor-pointer duration-300 hover:bg-gray-300" />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <FaTrashCan title="Apagar" className="text-3xl rounded-md p-1 text-red-600 cursor-pointer duration-300 hover:bg-gray-300" />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Uma vez removido, não é possível recuperar os dados do registro.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleRemoveSala(id)}>Deletar</AlertDialogAction>
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

export default SalaTable;
