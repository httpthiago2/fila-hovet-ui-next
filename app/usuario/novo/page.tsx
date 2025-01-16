"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { UserService } from "@/service/userService";
import { useRouter } from "next/navigation";



const CreateUser = () => {
    const userService = new UserService();
    const router = useRouter();
    const { toast } = useToast();

    const formSchema = z.object({
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
            senha: "",
            perfil: "MEDICO"
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        userService.create(values)
        .then(resposta => {
            const userCriado = resposta.data
            toast({
                title: 'Sucesso',
                description: userCriado.message
            })

            router.push('/usuario');
            
        }).catch(erro => {
            toast({
                title: 'Erro!',
                description: 'Ocorreu um erro ao criar médico'
            })
            console.log(erro);
        })
    }
   
    return (
        <div className="overflow-auto p-2">
            <h1 className="text-3xl">Novo Médico</h1>
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
                                        <Input {...field} />
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
                                        <Input {...field} />
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
                                        <Input type="password" placeholder="" {...field} />
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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


export default CreateUser;