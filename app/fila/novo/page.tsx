"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalRecordService } from "@/service/medicalRecordService";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RoomService } from "@/service/roomService";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { UserService } from "@/service/userService";
import { QueueService } from "@/service/queueService";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";



type FilaProps = {
    id: number
    name: string
    queueStatus: 'OPEN' | 'CLOSED'
    doctorName: string
    room: Room
    queueCode: string
}

type Room = {
    id: number
    nome: string
}

type User = {
    id: number,
    nome: string,
}


const CreateQueue = () => {
    const queueService = new QueueService();
    const roomService = new RoomService();
    const userService = new UserService();
    const router = useRouter();
    const { toast } = useToast();

    const formSchema = z.object({
        nome: z.string(),
        situacao: z.enum(['ABERTA', 'FECHADA']),
        sala: z.object({
            id: z.number(),
            nome: z.string()
        }),
        usuario: z.object({
            id: z.number(),
            nome: z.string()
        }),
        codigo: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            situacao: "ABERTA",
            codigo: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        queueService.create(values)
        .then(resposta => {
            const filaCriada = resposta.data
            toast({
                title: 'Sucesso',
                description: filaCriada.message
            })

            router.push('/fila');
            
        }).catch(erro => {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro ao criar fila'
            })
        })
        console.log(values);
    }



    

    const [rooms, setRooms] = useState<Room[]>([]);
    const [doctors, setDoctors] = useState<User[]>([]);


    useEffect(() => {
        roomService.findAll().then(response => {
            console.log(response.data);
            setRooms(response.data);
        }).catch(err => {
            console.log(err);
        })

        userService.findByTipoPerfil("MEDICO").then(response => {
            setDoctors(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleFieldRoomValue = (value: string) => {
        const parsedObject = JSON.parse(value);
        form.setValue("sala", parsedObject)
    }

    const handleFieldDoctorValue = (value: string) => {
        const parsedObject = JSON.parse(value);
        form.setValue("usuario", parsedObject)
    }

    return (
        <div className="overflow-auto p-2">
            <h1 className="text-3xl">Nova fila</h1>
            <div className="mt-4 flex flex-col gap-5">
                <h2 className="mb-2 font-bold">Dados principais</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="situacao"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Defina o status da fila" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ABERTA">ABERTA</SelectItem>
                                            <SelectItem value="FECHADA">FECHADA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sala"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sala</FormLabel>
                                    <Select onValueChange={handleFieldRoomValue}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a sala..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {rooms.map(room => (

                                                <SelectItem key={room.id} value={JSON.stringify(room)}>{room.nome}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="usuario"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Médico</FormLabel>
                                    <Select onValueChange={handleFieldDoctorValue}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o médico" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {doctors.map(doctor => (

                                                <SelectItem key={doctor.id} value={JSON.stringify(doctor)}>{doctor.nome}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="codigo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prefixo da senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-sysfila-light-green hover:bg-sysfila-green self-end">Salvar</Button>
                    </form>
                </Form>

            </div>
        </div>
    );
}


export default CreateQueue;