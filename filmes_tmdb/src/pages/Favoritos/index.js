import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Favoritos() {

    const navigation = useNavigation()

    const [filme, setFilme] = useState([])

    useEffect(() => {
        async function loadFilmes() {
            const minhaLista = await AsyncStorage.getItem('@favorito')
            setFilme(JSON.parse(minhaLista || []))
        }
        loadFilmes()
    }, [])

    function deleteItemFavorito(id) {
        let filtroFilmes = filme.filter((item) => {
            return (item.id != id)
        })
        setFilme(filtroFilmes)
        AsyncStorage.setItem('@favorito', JSON.stringify(filtroFilmes))

    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Favoritos</Text>
            {filme.map(filmes => (
                <View key={filmes.id} style={styles.favorito}>
                    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', `${filmes.id}`)}>
                        <Text style={styles.tituloFilme}>{filmes.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteItemFavorito(`${filmes.id}`)} >
                        <Feather name='trash-2' color='#FF3F4B' size={25} />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.textButton}>Voltar Início</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    favorito: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#985C45',
        height: 40,
        padding: 5,
        borderRadius: 7
    },
    title: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold'
    },
    tituloFilme: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold'
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
        justifyContent: 'center',
        fontSize: 18
    }
})