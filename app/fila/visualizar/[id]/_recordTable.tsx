import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Column = {
    name: string
}

type MedicalRecordProps = {
    id: number;
    nomePet: string;
    nomeTutor: string;
    tipoSenha: string;
    situacao: 'PENDENTE_ATENDIMENTO' | 'ATENDIDA' | 'ENCAMINHADA'
    dataCriacao: string;
    codigo: string;
};

const MedicalRecordTable = ({ columns, data }: { columns: Column[]; data: MedicalRecordProps[] }) => {

    return (


        <Table className="mt-6 pr-5">
            <TableHeader>
                <TableRow>
                    {columns.map(({ name }, index) => (
                        <TableCell key={index}>{name}</TableCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((prontuario) => (
                    <TableRow key={prontuario.codigo}>
                        <TableCell>{prontuario.codigo}</TableCell>
                        <TableCell>{prontuario.nomeTutor}</TableCell>
                        <TableCell>{prontuario.nomePet}</TableCell>
                        <TableCell>{prontuario.tipoSenha}</TableCell>
                        <TableCell>{prontuario.situacao}</TableCell>
                        <TableCell>{prontuario.dataCriacao}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
} 

export default MedicalRecordTable;
