import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from './pages/OrphanagesMap';
import OnboardingScreen from './pages/OnboardingScreen';
import OrphanageDetails from './pages/OrphanageDetails';

import TouchCreation from './pages/CreateOrphanage/TouchCreation';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SuccessCreation from './pages/CreateOrphanage/SuccessCreation';

import AsyncStorage from '@react-native-community/async-storage';

import Header from './components/Header';

export default function Routes() {
    const [firstLaunch, setFirstLaunch] = useState<Number>(1);

    useEffect(() => {
        AsyncStorage.getItem('firstLaunch').then(value => {
            if(value === null) {
                AsyncStorage.setItem('firstLaunch', 'false')
                setFirstLaunch(2);
            } else {
                setFirstLaunch(3);
            }
        })

    }, [])


    if(firstLaunch === 1) {
        return null;
    } else if(firstLaunch === 2) {
        return(
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown:false, cardStyle: { backgroundColor:'#f2f3f5' } }}>
                    <Screen name="OnboardingScreen" component={OnboardingScreen} />
                    <Screen name="OrphanagesMap" component={OrphanagesMap} />
                    <Screen 
                        name="OrphanageDetails" 
                        component={OrphanageDetails} 
                        options={{
                            headerShown:true,
                            header: () => <Header showCancel={false} title="Orfanato" />
                        }}
                    />
    
                    <Screen name="TouchCreation" component={TouchCreation} />
                    <Screen 
                        name="SelectMapPosition" 
                        component={SelectMapPosition} 
                        options={{
                            headerShown:true,
                            header: () => <Header title="Selecione no mapa" />
                        }}
                    />
    
                    <Screen 
                        name="OrphanageData" 
                        component={OrphanageData} 
                        options={{
                            headerShown:true,
                            header: () => <Header title="Informe os dados" />
                        }}
                    />
                    <Screen name="SuccessCreation" component={SuccessCreation} />
                </Navigator>
            </NavigationContainer>
        );
    } else if(firstLaunch === 3) {
        return(
            <NavigationContainer>
                <Navigator screenOptions={{ headerShown:false, cardStyle: { backgroundColor:'#f2f3f5' } }}>
                    <Screen name="OrphanagesMap" component={OrphanagesMap} />
                    <Screen 
                        name="OrphanageDetails" 
                        component={OrphanageDetails} 
                        options={{
                            headerShown:true,
                            header: () => <Header showCancel={false} title="Orfanato" />
                        }}
                    />
    
                    <Screen name="TouchCreation" component={TouchCreation} />    
                    <Screen 
                        name="SelectMapPosition" 
                        component={SelectMapPosition} 
                        options={{
                            headerShown:true,
                            header: () => <Header title="Selecione no mapa" />
                        }}
                    />
    
                    <Screen 
                        name="OrphanageData" 
                        component={OrphanageData} 
                        options={{
                            headerShown:true,
                            header: () => <Header title="Informe os dados" />
                        }}
                    />
                    <Screen name="SuccessCreation" component={SuccessCreation} />
                </Navigator>
            </NavigationContainer>
        );
    }    
}