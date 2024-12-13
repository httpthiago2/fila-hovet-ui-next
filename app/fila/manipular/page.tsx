'use client'

import { Button } from "@/components/ui/button";
import { FilaService } from "@/service/filaService";

export default function ManipularFilaPage() {

    const chamarProximo = () => {
        const filaService: FilaService = new FilaService();
        filaService.chamarProximo();
    }


    return (
        <div>
            <h1>Manipular fila</h1>
            <Button onClick={chamarProximo} className="w-[200px] mt-6 bg-green-500 text-white  hover:bg-green-600 hover:text-white" variant="outline">Chamar próximo</Button>
        </div>
    );
}