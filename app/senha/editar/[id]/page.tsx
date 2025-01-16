"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicalRecordService } from "@/service/medicalRecordService";
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
import { useRouter } from "next/navigation";



type FilaProps = {
    id: number
    nome: string
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
    fila: FilaProps
}

type Room = {
    id: number
    nome: string
}

type User = {
    id: number,
    nome: string,
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
        pet: z.string(),
        tutor: z.string(),
        tipo: z.enum(['REGULAR', 'PRIORIDADE']),
        fila: z.object({
            id: z.number(),
            nome: z.string()
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        medicalRecordService.update(params.id, values)
            .then(resposta => {
                const filaCriada = resposta.data
                toast({
                    title: 'Sucesso',
                    description: 'O prontuário foi atualizado com sucesso!'
                })

                router.push('/senha');

            }).catch(erro => {
                toast({
                    title: 'Erro!',
                    description: 'Ocorreu um erro ao atualizar prontuário'
                })
            })
        console.log(values);
    }





    const [queues, setQueues] = useState<FilaProps[]>([]);
    // const [fila, setFila] = useState<z.infer<typeof formSchema>[]>([]);


    useEffect(() => {
        medicalRecordService.findById(params.id).then(retorno => {
            const prontuario = retorno.data
            console.log(prontuario.fila)
            form.reset({
                pet: prontuario.nomePet,
                tutor: prontuario.nomeTutor,
                tipo: prontuario.tipoSenha,
                fila: prontuario.fila,
            });
        }).catch(erro => {
            console.log(erro.data);
        })


        queueService.findByStatus('ABERTA').then(response => {
            setQueues(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleFieldQueueValue = (value: string) => {
        console.log(value);
        const parsedObject = JSON.parse(value);
        form.setValue("fila", parsedObject)
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
                            name="pet"
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
                            name="tipo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo da senha</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo da senha..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="REGULAR">Regular</SelectItem>
                                            <SelectItem value="PRIORIDADE">Prioridade</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fila"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Fila</FormLabel>
                                    <Select onValueChange={handleFieldQueueValue} value={JSON.stringify(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma sala">
                                                    {field.value?.nome}
                                                </SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {queues.map(room => (

                                                <SelectItem key={room.id} value={JSON.stringify(room)}>{room.nome}</SelectItem>
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