import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../service/api'


export default function Dashboard() {

    const navigation = useNavigation()

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function loadFilmes() {

            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: 'e3557a63a0916ff565660d0e9b496cba',
                    language: 'pt-BR',
                }
            })

            setFilmes(response.data.results)
            setInterval(() => {
                setLoading(false)
            }, 3000)
        }
        loadFilmes()

    }, [])


    if (loading === true) {
        return (

            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.textCarregamento}>Aguarde Carregando</Text>
                    <ActivityIndicator size={150} color="#00ff00" marginTop={100} />

                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {filmes.map(filme => (
                    <View key={filme.id} style={styles.cardText}>
                        <Text style={styles.textTitle}>{filme.title}</Text>
                        <Image style={styles.image}
                            source={{ uri: `https://image.tmdb.org/t/p/original/${filme.poster_path}` }} />
                        <TouchableOpacity style={styles.buttonDetalhes} onPress={() => navigation.navigate('Detalhes', `${filme.id}`)}>
                            <Text style={styles.textDetalhes}>Ver Detalhes</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    cardText: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 250,
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: '#FFFFFF'
    },
    textTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 8,
        marginTop: 20
    },
    textCarregamento: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        marginTop: 40
    }, 
    buttonDetalhes: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#3069EB',
        width: '75%',
        height: 30,
        justifyContent: 'center'
    },
    textDetalhes: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})