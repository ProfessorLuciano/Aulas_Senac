import { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
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
            <Image style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${filmes.backdrop_path}` }} />
            <Text>{filmes.title}</Text>
            <Text>{filmes.overview}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop:5,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    image: {
        height: 200,
        width: '75%',
        resizeMode: 'stretch',
        borderRadius: 10
    },
})