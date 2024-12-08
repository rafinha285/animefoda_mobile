import React from "react";
import {PressableView} from "../../PressableView.tsx";
import {configStyle} from "../../../styles/playerStyle.ts";
import {StyleProp, View, ViewStyle} from "react-native";
import { Slider } from '@react-native-assets/slider'
import {Episode} from "../../../types/Episode.ts";
import {handleSeek} from "./functions/timeProgress/handleSeek.ts";
import {VideoRef} from "react-native-video";
import TextFont from "../../Text/TextFont.tsx";
import {getEpTime} from "../../../functions/episodeFunctions.ts";

interface Props {
    style?: StyleProp<ViewStyle>;
    videoRef: React.RefObject<VideoRef>;
    setPaused: React.Dispatch<React.SetStateAction<boolean>>;
    paused: boolean;
    currentTime: number;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
    ep:Episode;
}
const PlayerControls:React.FC<Props> = (
    {
        style,
        videoRef,
        setPaused,
        paused,
        ep,
        currentTime,
        setCurrentTime,
    }) => {
    const [pressed, setPressed] = React.useState(true);


    const handlePress = () =>{
        // if(pressed){
        //     setPaused(!paused);
        //     if(!paused){
        //         setPressed(false);
        //     }
        // }else{
        //     setPressed(!pressed);
        // }
        setPressed(!pressed);
        setPaused(!pressed);
        // setPressed(pressed?);
        console.log(pressed);
    }
    return (
        <PressableView onPress={handlePress} style={[configStyle.overlayContainer,{opacity:pressed ? 1 : 0},style]}>
            {/*<TextFont>cuuuuuuuuuuuuuuuu</TextFont>*/}
            <View style={configStyle.topContainer}>

            </View>
            <View style={configStyle.centerContainer}>

            </View>
            <View style={configStyle.bottomContainer}>
                <TextFont>{getEpTime(currentTime)}/{getEpTime(ep.duration)}</TextFont>
                <Slider
                    maximumValue={ep.duration}
                    value={currentTime}
                    style={{
                        width:'90%'
                    }}
                    onValueChange={(n)=>pressed? handleSeek(n,videoRef):undefined}
                />
            </View>
        </PressableView>
    )
}
export default PlayerControls
