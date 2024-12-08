import React, {FC} from "react";
import {PressableView} from "../../PressableView.tsx";
import {animeEpisodeComponentStyle} from "../../../styles/AnimeStyle.ts";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {white} from "../../../styles/baseValues.ts";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import TextFont from "../../Text/TextFont.tsx";
import {faDownload, faPlay} from "@fortawesome/free-solid-svg-icons";

interface Props {
    typeButton:"seen"|"watch"|"download",
        onPress: ()=>void,
}
const EpisodesButton: FC<Props> = ({typeButton,onPress}) =>{
    switch(typeButton){
        case "seen":
            return(
                <PressableView style={animeEpisodeComponentStyle.button} onPress={onPress}>
                    <FontAwesomeIcon color={white} icon={faEye}/>
                    <TextFont> Visto</TextFont>
                </PressableView>
            )
        case "watch":
            return(
                <PressableView style={animeEpisodeComponentStyle.button} onPress={onPress}>
                    <FontAwesomeIcon color={white} icon={faPlay}/>
                    <TextFont> Assistir</TextFont>
                </PressableView>
            )
        case "download":
            return(
                <PressableView style={animeEpisodeComponentStyle.button} onPress={onPress}>
                    <FontAwesomeIcon color={white} icon={faDownload}/>
                    <TextFont> Download</TextFont>
                </PressableView>
            )
    }

}
export default EpisodesButton;
