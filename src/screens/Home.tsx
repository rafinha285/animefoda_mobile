import React, {useEffect} from "react";
import {ScrollView, Text} from "react-native";
// import {Header} from "react-native/Libraries/NewAppScreen";
import Animes from "../components/Home/AnimesScroll.tsx";
import {homeStyle} from "../styles/homeStyle.ts";
import RecentEpisodes from "../components/Home/RecentEpisodes.tsx";
import Header from "../components/Header.tsx";


const Home = ()=>{
    console.log("Homee")
    useEffect(() => {
        // console.log("Home")
        // createClass()
    }, []);
    return(
        <ScrollView style={[homeStyle.body]}>
            {/*<Text> aaa </Text>*/}
            <Header></Header>
            <Animes manga={false}></Animes>
            <Animes manga={true}></Animes>
            <RecentEpisodes/>
        </ScrollView>
    )
}
export default Home
