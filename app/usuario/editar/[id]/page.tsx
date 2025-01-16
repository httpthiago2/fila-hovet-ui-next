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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


type User = {
    id: number,
    nome: string,
    usuario: string,
    perfil: 'MEDICO' | 'SECRETARIO' | 'DIRETOR'
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
        nome: z.string(),
        usuario: z.string(),
        senha: z.string(),
        perfil: z.enum(['MEDICO', 'SECRETARIO', 'DIRETOR']),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            usuario: "",
            senha: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        userService.update(params.id, values)
        .then(resposta => {
            const usuarioEditado = resposta.data
            toast({
                title: 'Sucesso',
                description: usuarioEditado.message
            })

            router.push('/usuario');
            
        }).catch(erro => {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro ao atualizar o usuário'
            })
        })
    }


    useEffect(() => {

        userService.findById(params.id).then(retorno => {
            const user = retorno.data
            form.reset({
                id: user.id,
                nome: user.nome,
                usuario: user.usuario,
                senha: user.senha,
                perfil: user.perfil
            });
        }).catch(erro => {
            console.log(erro.data);
        })
    }, [])

    return (
        <div className="overflow-auto p-2">
            <h1 className="text-3xl">Editar Usuário</h1>
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
                            name="usuario"
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
                            name="senha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="perfil"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Perfil</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Defina o perfil do usuário" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MEDICO">MEDICO</SelectItem>
                                            <SelectItem value="SECRETARIO">SECRETARIO</SelectItem>
                                            <SelectItem value="DIRETOR">DIRETOR</SelectItem>
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


export default EditUser;