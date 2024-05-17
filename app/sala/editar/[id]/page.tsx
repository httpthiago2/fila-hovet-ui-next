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


type Room = {
    id: number
    name: string
}

const EditSala = ({
    params
}: {
    params: { id: string }
}) => {
    const roomService = new RoomService();
    const router = useRouter();
    const { toast } = useToast();

    const formSchema = z.object({
        id: z.number(),
        name: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        roomService.update(params.id, values)
        .then(resposta => {
            const salaEditada = resposta.data
            toast({
                title: 'Sucesso',
                description: salaEditada.message
            })

            router.push('/sala');
            
        }).catch(erro => {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro ao criar fila'
            })
        })
        console.log(values);
    }


    useEffect(() => {

        roomService.findById(params.id).then(retorno => {
            const fila = retorno.data.data
            form.setValue("id", fila.id);
            form.setValue("name", fila.name);
        }).catch(erro => {
            console.log(erro.data);
        })
    }, [])

    return (
        <div className="overflow-auto p-2">
            <h1 className="text-3xl">Editar Sala</h1>
            <div className="mt-4 flex flex-col gap-5">
                <h2 className="mb-2 font-bold">Dados principais</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
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
                        <Button type="submit" className="bg-sysfila-light-green hover:bg-sysfila-green self-end">Salvar</Button>
                    </form>
                </Form>

            </div>
        </div>
    );
}


export default EditSala;