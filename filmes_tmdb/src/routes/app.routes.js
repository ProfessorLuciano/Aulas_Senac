import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Dashboard from '../pages/Dashboard'
import Detalhes from '../pages/Detalhes'
import Favoritos from '../pages/Favoritos'

const Stack = createNativeStackNavigator()

export default function Routes(){ 
    
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name='Dashboard'
            component={Dashboard}
            />

            <Stack.Screen 
            name='Detalhes'
            component={Detalhes}
            />
            <Stack.Screen 
            name='Favoritos'
            component={Favoritos}
            />

        </Stack.Navigator>
    )
}