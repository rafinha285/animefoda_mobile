import React from "react";
import { View } from "react-native";
import { loadingStyles } from "./loadingStyle.ts";
import TextFont from '../Text/TextFont.tsx'
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner/Spinner.tsx";

const Loading: React.FC = () => {
    return(
        <View style={loadingStyles.conteiner}>
            <TextFont style={{marginBottom:30}}>Loading Anime</TextFont>
            <Spinner icon={faCircleNotch} size={25} color="white" />
        </View>
    )
}
export default Loading;
