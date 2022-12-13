import { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
                    api_key: '',
                    language: 'pt-BR'
                }
            })
            setFilme(response.data)
        }
        loadFilme()
    }, [identifica])

    async function handleFavoritos(){
        const favoritos = await AsyncStorage.getItem('@favorito')
        let filmesSalvos = JSON.parse(favoritos) || []
        const storeFilme = filmesSalvos.some(((filmeSalvo) => filmeSalvo.id === filmes.id))
       
        if(storeFilme){
            alert('Filme já Salvo')
           return
        }
        filmesSalvos.push(filmes)
        await AsyncStorage.setItem('@favorito', JSON.stringify(filmesSalvos))
        alert('Filme Salvo')
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.textButton}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`https://m.youtube.com/results?search_query=${filmes.title} Trailer`)}>
                    <Text style={styles.textButton}>Trailer</Text>
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