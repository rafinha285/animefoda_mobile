import React, {useEffect} from "react";
import {ScrollView, Text} from "react-native";
// import {Header} from "react-native/Libraries/NewAppScreen";
import AnimeScroll from "../components/Home/AnimesScroll.tsx";
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
            <AnimeScroll manga={false}></AnimeScroll>
            {/*<AnimeScroll manga={true}></AnimeScroll>*/}
            <RecentEpisodes/>
        </ScrollView>
    )
}
export default Home
