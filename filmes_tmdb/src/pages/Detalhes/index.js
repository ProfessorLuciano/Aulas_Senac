import { useState, useEffect } from 'react'
import {
    View,
    Text
} from 'react-native'
import api from '../../services/api'

export default function Detalhes(ident){
    const identifica = ident.route.params
    const [filmes, setFilme] = useState([])

    useEffect(() => {
        async function loadFilme(){
            const response = await api.get(`/movie/${identifica}`, {
                params: {
                    api_key: 'e3557a63a0916ff565660d0e9b496cba',
                    language: 'pt-BR'
                }
            })
            setFilme(response.data)
        }
        loadFilme()
    }, [identifica])
    

    return(
        <View>
            <Text>Detalhes</Text>
            <Text>{filmes.title}</Text>
            <Text>{filmes.overview}</Text>
        </View>
    )
}