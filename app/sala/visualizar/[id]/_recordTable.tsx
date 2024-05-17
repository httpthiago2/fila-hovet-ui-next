import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Column = {
    name: string
}

type MedicalRecordProps = {
    id: number;
    petName: string;
    tutor: string;
    weight: number;
    registerDate: string;
    complaint: string;
    species: string;
    gender: 'MALE' | 'FEMALE'
    attendanceOrder: 1;
    medicalRecordStatus: 'ATTENDED' | 'PENDING'
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
                    <TableRow key={prontuario.id}>
                        <TableCell>{prontuario.id}</TableCell>
                        <TableCell>{prontuario.petName}</TableCell>
                        <TableCell>{prontuario.tutor}</TableCell>
                        <TableCell>{prontuario.weight}</TableCell>
                        <TableCell>{prontuario.registerDate}</TableCell>
                        <TableCell>{prontuario.complaint}</TableCell>
                        <TableCell>{prontuario.species}</TableCell>
                        <TableCell>{prontuario.gender}</TableCell>
                        <TableCell>{prontuario.attendanceOrder}</TableCell>
                        <TableCell>{prontuario.medicalRecordStatus}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
} 

export default MedicalRecordTable;
