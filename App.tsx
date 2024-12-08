import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import GlobalProvider from "./src/GlobalContext.tsx";
import Home from "./src/screens/Home.tsx";
import {Text, View} from "react-native";
import {homeStyle} from "./src/styles/homeStyle.ts";

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
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalProvider>
        // <View style={homeStyle.body}></View>
    );
}

export default App;
