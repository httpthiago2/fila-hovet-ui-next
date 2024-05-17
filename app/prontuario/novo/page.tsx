"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RoomService } from "@/service/roomService";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { QueueService } from "@/service/queueService";
import { UserService } from "@/service/userService";
import { useRouter } from "next/navigation";
import { MedicalRecordService } from "@/service/medicalRecordService";



type FilaProps = {
    id: number
    name: string
    queueStatus: 'OPEN' | 'CLOSED'
    medicalRecords: []
    queueCode: string
}

type MedicalRecordProps = {
    id: number
    petName: string
    tutor: string
    weight: number
    registerDate: string
    complaint: string
    species: 'FELINE' | 'CANINE'
    gender: 'MALE' | 'FEMALE',
    attendanceOrder: number,
    queue: FilaProps
}


const CreateProntuario = () => {
    const queueService = new QueueService();
    const medicalRecordService = new MedicalRecordService();

    const router = useRouter();
    const { toast } = useToast();

    const formSchema = z.object({
        petName: z.string(),
        tutor: z.string(),
        weight: z.string(),
        registerDate: z.string(),
        complaint: z.string(),
        species: z.enum(['FELINE', 'CANINE']),
        gender: z.enum(['MALE', 'FEMALE']),
        queue: z.object({
            id: z.number()
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            registerDate: new Date().toISOString()
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        medicalRecordService.create(values)
        .then(resposta => {
            const prontuarioCriado = resposta.data
            toast({
                title: 'Sucesso',
                description: prontuarioCriado.message
            })

            router.push('/prontuario');
            
        }).catch(erro => {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro ao criar prontuário'
            })
        })
        console.log(values);
    }



    

    const [queue, setQueues] = useState<FilaProps[]>([]);


    useEffect(() => {
        queueService.findByStatus('OPEN').then(response => {
            setQueues(response.data.data);
        }).catch(err => {
            console.log(err);
        })

    }, [])

    const handleFieldQueueValue = (value: string) => {
        const parsedObject = JSON.parse(value);
        form.setValue("queue", parsedObject)
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
                            name="petName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do PET</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tutor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tutor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Peso</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="complaint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Queixa</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="species"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Espécie</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Defina o status da fila" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="FELINE">FELINO</SelectItem>
                                            <SelectItem value="CANINE">CANINO</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Escolha o sexo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MALE">Masculino</SelectItem>
                                            <SelectItem value="FEMALE">Feminino</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="queue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fila</FormLabel>
                                    <Select onValueChange={handleFieldQueueValue}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a sala..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {queue.map(queue => (

                                                <SelectItem key={queue.id} value={JSON.stringify(queue)}>{queue.name}</SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
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


export default CreateProntuario;