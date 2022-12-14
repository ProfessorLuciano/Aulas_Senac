import { useEffect, useState } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Dashboard() {

    const navigation = useNavigation()

    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: '',
                    language: 'pt-BR'
                }
            })
            setFilmes(response.data.results)
        }
        loadFilmes()
    }, [])
    //console.log(filmes)


    return (
        <View style={styles.container}>
             <TouchableOpacity style={styles.buttonFavoritos} onPress={() => navigation.navigate('Favoritos')}>
                        <Text style={styles.titulos}>Favoritos</Text>
                    </TouchableOpacity>
            <ScrollView
            showsVerticalScrollIndicator={false} 
            overScrollMode={'always'}
            >
                {filmes.map(filme => (
                    <TouchableOpacity key={filme.id} style={styles.button} onPress={() => navigation.navigate('Detalhes', `${filme.id}`)}>
                        <Text style={styles.titulos}>{filme.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#4776F0',
        fontWeight: 'bold',
        marginTop: 10,
        height: 40,
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonFavoritos: {
        backgroundColor: '#FF294E',
        fontWeight: 'bold',
        marginTop: 10,
        height: 40,
        justifyContent: 'center',
        borderRadius: 8
    },
    titulos: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        padding: 10
    }
})


