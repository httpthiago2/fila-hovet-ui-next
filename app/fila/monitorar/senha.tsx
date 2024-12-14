type SenhaVisualizacao = {
    senha: string;
    ordem: number;
    pet: string;
    tutor: string;
    tipo: 'REGULAR' | 'PRIORIDADE'
}

type SenhaProps = {
    dados: SenhaVisualizacao | undefined;
}


export default function SenhaComponent({dados} : SenhaProps  ) {

    if (!dados) {
        return <div className="text-red-500">Senha não fornecida.</div>;
    }

    return (
        <div className="w-full flex flex-row bg-gray-300 p-5 justify-between mb-4">
            <div className="flex flex-col bg">
                <span className="font-bold text-2xl">{dados.senha}</span>
                <span className="text-2xl">Tutor: {dados.tutor}</span>
                <span className="text-2xl">Pet: {dados.pet}</span>
            </div>
            <div className={`w-2/5 flex justify-center items-center ${dados.tipo === 'REGULAR' ? 'bg-green-600' : 'bg-red-600'}`}>
                <span className="text-white">{dados.tipo}</span>
            </div>
        </div>
    );
}