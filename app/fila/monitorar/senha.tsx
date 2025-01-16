type SenhaProps = {
    id: number
    codigo: string,
    nomePet: string
    nomeTutor: string,
    nomeFila: string,
    tipoSenha: 'REGULAR' | 'PRIORIDADE',
    situacao: 'PENDENTE_ATENDIMENTO' | 'ATENDIDA' | 'ENCAMINHADA',
    ordem: number,
    dataCriacao: string,
}

type VisualizarFilaProps = {
    nome: string,
    sala: string,
    senhaAtual: SenhaProps,
    senhasAnteriores: SenhaProps[],
    proximasSenhas: SenhaProps[]
}



export default function SenhaComponent({ dados }: { dados: SenhaProps | undefined}) {

    return (
        <div className="w-full flex flex-row bg-gray-300 p-5 justify-between mb-4">
            <div className="flex flex-col bg">
                <span className="font-bold text-2xl">{dados?.codigo}</span>
                <span className="text-2xl">Tutor: {dados?.nomeTutor}</span>
                <span className="text-2xl">Pet: {dados?.nomePet}</span>
            </div>
            <div className={`w-2/5 flex justify-center items-center ${dados?.tipoSenha === 'REGULAR' ? 'bg-green-600' : 'bg-red-600'}`}>
                <span className="text-white">{dados?.tipoSenha}</span>
            </div>
        </div>
    );
}