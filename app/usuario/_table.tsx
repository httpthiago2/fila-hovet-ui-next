import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

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
import { RoomService } from "@/service/roomService";
import { UserService } from "@/service/userService";

type Column = {
    name: string
}

type User = {
    id: number,
    nome: string,
    usuario: string,
    perfil: 'MEDICO' | 'SECRETARIO' | 'DIRETOR'
}


const UserTable = ({ columns, data }: { columns: Column[]; data: User[] }) => {

    const { push } = useRouter();

    const { toast } = useToast();

    const userService = new UserService();

    const handleVisualizeUser= (id: number) => {
        push(`/usuario/visualizar/${id}`)
    };

    const handleEditUser = (id: number) => {
        push(`/usuario/editar/${id}`)
    };

    const handleRemoveUser = async (id: number) => {
        userService.delete(id).then(resposta => {
            toast({
                title: 'Sucesso',
                description: resposta.data.message
            })
            window.location.reload()
        }).catch(erro => {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao remover o médico'
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
                {data.map(({ id, nome, usuario, perfil }) => (
                    <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{nome}</TableCell>
                        <TableCell>{usuario}</TableCell>
                        <TableCell>{perfil}</TableCell>
                        <TableCell className="flex flex-row gap-3">
                            <MdEdit onClick={() => handleEditUser(id)} title="Editar" className="text-3xl rounded-md p-1 text-blue-600 cursor-pointer duration-300 hover:bg-gray-300 " />
                            <FaEye onClick={() => handleVisualizeUser(id)} title="Visualizar" className="text-3xl rounded-md p-1  cursor-pointer duration-300 hover:bg-gray-300" />
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
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleRemoveUser(id)}>Deletar</AlertDialogAction>
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

export default UserTable;
