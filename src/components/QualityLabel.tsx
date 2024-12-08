import { View } from "react-native";
import { recentEpisodeComponentStyle } from "./Home/episodes/recentEpisodeComponentStyle.ts";
import { danger, gray } from "../styles/baseValues.ts";
import TextFont from "./Text/TextFont.tsx";

interface Props{
    quality:"1080P"|"720P"|"480P"| string
}
const QualityLabel:React.FC<Props> = ({ quality }) => {
    return <View style={
        [
            recentEpisodeComponentStyle.qualityLabel,
            quality !== "1920x1080"?
                {backgroundColor:gray}
                :{backgroundColor: danger}
        ]}>
        <TextFont>{quality.split("x")[1]}P</TextFont>
    </View>
}
export default QualityLabel;
