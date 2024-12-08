import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import GlobalProvider from "./src/GlobalContext.tsx";
import Home from "./src/screens/Home.tsx";
import AnimeScreen from "./src/screens/AnimeScreen.tsx";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    return (
        <GlobalProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={'Home'}
                        component={Home}
                        options={{
                            headerShown: false,
                            orientation: 'portrait',
                        }}
                    />
                    <Stack.Screen
                        name={'Anime'}
                        component={AnimeScreen}
                        options={{
                            headerShown: false,
                            orientation: 'portrait',
                        }}
                    />
                    {/*<Stack.Screen*/}
                    {/*    name={'Watch'}*/}
                    {/*    component={}*/}
                    {/*    />*/}
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalProvider>
        // <View style={homeStyle.body}></View>
    );
}

export default App;
