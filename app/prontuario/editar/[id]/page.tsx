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
    name: string
}

type User = {
    id: number,
    name: string,
}


const EditProntuario = ({
    params
}: {
    params: { id: string }
}) => {
    const queueService = new QueueService();
    const medicalRecordService = new MedicalRecordService();
    
    const router = useRouter();
    const { toast } = useToast();

    const formSchema = z.object({
        id: z.number(),
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
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        medicalRecordService.update(values.id, values)
        .then(resposta => {
            const filaCriada = resposta.data
            toast({
                title: 'Sucesso',
                description: 'O prontuário foi atualizado com sucesso!'
            })

            router.push('/prontuario');
            
        }).catch(erro => {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro ao atualizar prontuário'
            })
        })
        console.log(values);
    }



    

    const [queues, setQueues] = useState<Room[]>([]);
    // const [fila, setFila] = useState<z.infer<typeof formSchema>[]>([]);


    useEffect(() => {

        medicalRecordService.findById(params.id).then(retorno => {
            const prontuario = retorno.data.data
            form.setValue("id", prontuario.id);
            form.setValue("petName", prontuario.petName);
            form.setValue("tutor", prontuario.tutor);
            form.setValue("weight", prontuario.weight.toString());
            form.setValue("complaint", prontuario.complaint);
            form.setValue("registerDate", prontuario.registerDate)
            form.setValue("species", prontuario.species);
            form.setValue("gender", prontuario.gender);
            form.setValue("queue", prontuario.queue);
        }).catch(erro => {
            console.log(erro.data);
        })

       
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
                                            {queues.map(queue => (

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


export default EditProntuario;