import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {cdnUrl, ipBase} from "../../../consts.ts";
import {PressableView} from "../../PressableView.tsx";
import {View} from "react-native";
import TextFont from "../../Text/TextFont.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {white} from "../../../styles/baseValues.ts";
import {getEpTime} from "../../../functions/episodeFunctions.ts";
import QualityLabel from "../../QualityLabel.tsx";
import {recentEpisodeComponentStyle} from "../../../styles/homeStyle.ts";
import {IncomingEpisode} from "../../../types/Episode.ts";
import {Image} from "react-native";
import FastImage from "react-native-fast-image";

interface Props {
    episode:IncomingEpisode
}
const RecentEpisodesImg:React.FC<Props> = ({episode}) => {
    const navigation = useNavigation();
    const [seasonName, setSeasonName] = useState<string>("");
    useEffect(() => {

        const fetchData = async() =>{
            // console.log(`${ipApi}/g/ani/name/${episode.animeid}`)
            // await fetch(`${ipApi}/g/ani/name/${episode.animeid}`).then(res=>res.json()).then(data=>
            // {
            // 	// console.log(data.name);
            // 	setAnimeName(data.name);
            // });
            await fetch(`${ipBase}/g/sea/name/${episode.animeid}/${episode.seasonid}`).then(res=>res.json()).then(data=> {
                // console.log(data);
                setSeasonName(data.name);
            });
        }
        fetchData()
        // console.log(`${cdnUrl}/epPoster/${episode.animeid}/${episode.seasonid}/${episode.id}`);
    }, []);
    const handlePress = () =>{
        console.log((episode as never), episode,seasonName);
        navigation.navigate("Watch" as never, {
            episode,
            animename:episode.animename,
            seasonname:episode.seasonname
        } as never);
    }
    return(
        <PressableView onPress={handlePress} style={recentEpisodeComponentStyle.container}>
            <FastImage
                source={{uri:`${cdnUrl}/ep/${episode.animeid}/${episode.seasonid}/${episode.id}/${episode.id}.jpg`}}
                style={recentEpisodeComponentStyle.img}
            ></FastImage>
            <View style={[recentEpisodeComponentStyle.top,recentEpisodeComponentStyle.topBottom]}>
                <TextFont>{episode.animename}</TextFont>
                <TextFont style={{fontSize:12}}>{seasonName}</TextFont>
                <TextFont style={{fontSize:11}}>{episode.name}</TextFont>
            </View>
            <View style={[recentEpisodeComponentStyle.top,recentEpisodeComponentStyle.toptop]}>
                <QualityLabel quality={episode.resolution[0].toString()}/>
                <View style={{flexDirection: "row",alignItems:'center'}}>
                    <TextFont>{getEpTime(episode.duration!)} </TextFont>
                    <FontAwesomeIcon icon={faClock} color={white}/>
                </View>
            </View>
        </PressableView>
    )
}
export default RecentEpisodesImg;
