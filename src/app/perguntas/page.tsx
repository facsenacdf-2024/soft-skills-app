'use client'
import Button from "@/components/button"

export default function perguntas() {

    let VT = 10 //Valor total pontos

    return (

        <>
            <h2>Testando perguntas</h2>
            <Button // a cada "sim" pontuação perde 1
                title="Sim"
                func={() => {
                    VT--
                    console.log(VT);
                }}
            />
           <Button // a cada "não" pontuação permanece a mesma
                title="Não"
                func={() => {
                    VT = VT
                    console.log(VT);
                }}
            />
        </>
    )
}