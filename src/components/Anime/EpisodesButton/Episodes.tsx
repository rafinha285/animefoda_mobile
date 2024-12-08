import {FC} from "react";
import {Episode} from "../../../types/Episode.ts";
import {useGlobalContext} from "../../../GlobalContext.tsx";
import {View} from "react-native";
import {animeEpisodeComponentStyle} from "../../../styles/AnimeStyle.ts";
import {gray} from "../../../styles/baseValues.ts";
import TextFont from "../../Text/TextFont.tsx";
import {trim} from "../../../functions/stringFunctions.ts";
import EpisodesButton from "./EpisodesButton.tsx";

interface AnimeEpisodeProps {
    episode:Episode
    watchHandle:(ep:Episode)=>void;
}
const Episodes:FC<AnimeEpisodeProps> = ({episode, watchHandle}) => {
    const { isLogged } = useGlobalContext();
    // console.log(episode);
    const seenHandle = () =>{
        console.log("seen")
    }
    const downloadHandle = () =>{
        console.log("download")
    }
    return(
        <View style={animeEpisodeComponentStyle.container}>
            <View style={[animeEpisodeComponentStyle.textDiv,{borderBottomWidth:1,borderBottomColor:gray}]}>
                <TextFont style={animeEpisodeComponentStyle.text}>{trim(episode.name,45)}</TextFont>
            </View>
            <View style={[animeEpisodeComponentStyle.textDiv,{flexDirection:"row",justifyContent:"space-evenly"}]}>
                {isLogged ? <EpisodesButton typeButton={"seen"} onPress={seenHandle}/> : <></>}
                <EpisodesButton typeButton={"watch"} onPress={()=>watchHandle(episode)}/>
                <EpisodesButton typeButton={"download"} onPress={downloadHandle}/>
            </View>
        </View>
    )
}
export default Episodes;
