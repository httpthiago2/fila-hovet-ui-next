"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useRouter } from "next/navigation";
import { UserService } from "@/service/userService";


type User = {
    id: number,
    name: string,
    userName: string,
    profileTypeEnum: 'DOCTOR' | 'SECRETARY' | 'DIRECTOR'
}


const EditUser = ({
    params
}: {
    params: { id: string }
}) => {
    const userService = new UserService();
    const router = useRouter();
    const { toast } = useToast();

    const formSchema = z.object({
        id: z.number(),
        name: z.string(),
        userName: z.string(),
        password: z.string(),
        profileTypeEnum: z.enum(['DOCTOR', 'SECRETARY', 'DIRECTOR']),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            userName: "",
            password: "",
            profileTypeEnum: "DOCTOR"
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        userService.update(values)
        .then(resposta => {
            const usuarioEditado = resposta.data
            toast({
                title: 'Sucesso',
                description: usuarioEditado.message
            })

            router.push('/medico');
            
        }).catch(erro => {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro ao atualizar o usuário'
            })
        })
    }


    useEffect(() => {

        userService.findById(params.id).then(retorno => {
            const user = retorno.data.data
            form.setValue("id", user.id);
            form.setValue("name", user.name);
            form.setValue("userName", user.userName);
            form.setValue("password", user.password);
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
                        <FormField
                            control={form.control}
                            name="userName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
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


export default EditUser;