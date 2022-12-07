import { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Detalhes(ident){
    const identifica = ident.route.params
    const [filmes, setFilme] = useState([])
    const navigation = useNavigation()

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

    function handleFavoritos(){
       
        
        navigation.navigate('Favoritos')
    }
    

    return(
        <View>
            <Text>Detalhes</Text>
            <Image style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${filmes.backdrop_path}` }} />
            <Text>{filmes.title}</Text>
            <Text>{filmes.overview}</Text>
            <TouchableOpacity style={styles.button} onPress={handleFavoritos}>
                <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: '#4776F0',
        fontWeight: 'bold',
        margin: 10,
        height: 40,
        width: '95%',
        justifyContent: 'center',
        borderRadius: 8
    },
    textButton: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        padding: 10
    }
})