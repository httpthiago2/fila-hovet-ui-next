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

type Column = {
    name: string
}

type FilaProps = {
    id: number;
    nome: string;
    situacao: 'ABERTA' | 'FECHADA';
    usuario: User;
    sala: { id: number; nome: string };
    senhas: any[];
    codigo: string;
};

type User = {
    id: number,
    nome: string,
}

const QueueTable = ({ columns, data }: { columns: Column[]; data: FilaProps[] }) => {

    const { push, refresh } = useRouter();

    const { toast } = useToast();

    const queueService = new QueueService();

    const handleVisualizeQueue = (id: number) => {
        push(`/fila/visualizar/${id}`)
    };

    const handleEditQueue = (id: number) => {
        push(`/fila/editar/${id}`)
    };

    const handleRemoveQueue = async (id: number) => {
        queueService.remove(id).then(resposta => {
            toast({
                title: 'Sucesso',
                description: resposta.data.message
            })
            window.location.reload()
        }).catch(erro => {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao remover a fila'
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
                {data.map(({ id, codigo, nome, situacao, usuario, sala }) => (
                    <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{codigo}</TableCell>
                        <TableCell>{nome}</TableCell>
                        <TableCell>{situacao}</TableCell>
                        <TableCell>{usuario.nome}</TableCell>
                        <TableCell>{sala.nome}</TableCell>
                        <TableCell className="flex flex-row gap-3">
                            <MdEdit onClick={() => handleEditQueue(id)} title="Editar" className="text-3xl rounded-md p-1 text-blue-600 cursor-pointer duration-300 hover:bg-gray-300 " />
                            <FaEye onClick={() => handleVisualizeQueue(id)} title="Visualizar" className="text-3xl rounded-md p-1  cursor-pointer duration-300 hover:bg-gray-300" />
                            <PiTelevisionSimple title="Monitorar" className="text-3xl rounded-md p-1 text-sysfila-green cursor-pointer duration-300 hover:bg-gray-300" />


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
                                        <AlertDialogAction onClick={() => handleRemoveQueue(id)}>Continue</AlertDialogAction>
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

export default QueueTable;
