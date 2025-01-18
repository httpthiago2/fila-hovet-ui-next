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


type Room = {
    id: number
    nome: string
}

type User = {
    id: number,
    nome: string,
}


const EditQueue = ({
    params
}: {
    params: { id: string }
}) => {
    const queueService = new QueueService();
    const roomService = new RoomService();
    const userService = new UserService();
    const router = useRouter();
    const { toast } = useToast();

    const formSchema = z.object({
        id: z.number(),
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
            codigo: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        queueService.create(values)
            .then(resposta => {
                const filaCriada = resposta.data
                toast({
                    title: 'Sucesso',
                    description: 'A fila foi criada com sucesso!'
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
    // const [fila, setFila] = useState<z.infer<typeof formSchema>[]>([]);


    useEffect(() => {

        queueService.findById(params.id).then(retorno => {
            const fila = retorno.data
            console.log(fila);
            form.reset({
                id: fila.id,
                nome: fila.nome,
                situacao: fila.situacao,
                usuario: fila.usuario,
                sala: fila.sala,
                codigo: fila.codigo
            });
            console.log("FORM: ", form);
        }).catch(erro => {
            console.log(erro.data);
        })

        roomService.findAll().then(response => {
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
            <h1 className="text-3xl">Editar fila</h1>
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
                                    <Select value={field.value || ""} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Defina o status da fila"/>
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
                                    <Select onValueChange={handleFieldRoomValue} value={JSON.stringify(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma sala" />
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
                                    <Select onValueChange={handleFieldDoctorValue} value={JSON.stringify(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Defina, se necessário, o novo médico que atenderá a fila" />
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


export default EditQueue;