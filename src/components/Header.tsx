import React from "react";
import {useNavigation, useNavigationState} from "@react-navigation/native";
import {useGlobalContext} from "../GlobalContext.tsx";
import {ipBase} from "../consts.ts";
import {View} from "react-native";
import {HeaderStyles} from "../styles/headerStyle.ts";
import {PressableView} from "./PressableView.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faUser} from "@fortawesome/free-solid-svg-icons";
import TextFont from "./Text/TextFont.tsx";

const Header:React.FC = () =>{
    const navigation = useNavigation();
    const routes = useNavigationState(state => state.routeNames);
    const currentRoute = routes[0];
    const isAuthScreen = currentRoute === 'Login' || currentRoute === 'Register';
    const {isLogged,setToken, getToken} = useGlobalContext();
    const handleNavigateToHome = () => {
        navigation.navigate("Home" as never); // Navega para a tela "Home"
    };
    const handleGoBack = () =>{
        // console.log(isLogged,navigation);
        if(navigation.canGoBack()){
            navigation.goBack();
        }
    }
    const handleRegisterLogin = async() =>{
        console.log(isLogged);
        if(!isLogged){
            return navigation.navigate("Login" as never);
        }
        const token = await getToken();
        const headers: HeadersInit_ = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        await fetch(`${ipBase}/verify`,{
            headers:headers
        }).then((res)=>res.json()).then((data:{success:boolean})=>{
            // console.log(data);
            if(data.success){
                return navigation.navigate("User" as never);
            }else{
                setToken(null);
                return navigation.navigate("Login" as never);
            }
        })
    }
    return(
        // <LinearGradient colors={['#1d1160', 'rgba(0,0,0,0)']} style={styles.gradient}>

        <View style={HeaderStyles.header}>
            {navigation.canGoBack()? (<PressableView style={{padding:5}} onPress={handleGoBack}>
                <FontAwesomeIcon icon={faChevronLeft} color="white" />
            </PressableView>):(<></>)}
            <PressableView onPress={handleNavigateToHome}>
                <TextFont style={HeaderStyles.title}>Animefoda</TextFont>
            </PressableView>
            {
                !isAuthScreen?(
                    <PressableView onPress={handleRegisterLogin} style={HeaderStyles.userDiv}>
                        {/* <TextFont>AA</TextFont> */}
                        <FontAwesomeIcon icon={faUser} style={HeaderStyles.userIcon}/>
                    </PressableView>
                ):<></>
            }

        </View>
        // </LinearGradient>
    )
}
export default Header;
