import {faSquarePlus} from "@fortawesome/free-regular-svg-icons";
import {FC} from "react";
import {PressableView} from "../../PressableView.tsx";
import {addAnimeListButtonStyle} from "../../../styles/AnimeStyle.ts";
import TextFont from "../../Text/TextFont.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {white} from "../../../styles/baseValues.ts";

const addAnimeListButton:FC = () => {
    const handlePress = ()=>{

    }
    return(
        <PressableView style={addAnimeListButtonStyle.container} onPress={handlePress}>
            <TextFont style={{fontSize:20}}>Adicionar a lista </TextFont>
            <FontAwesomeIcon icon={faSquarePlus} color={white} size={20}/>
        </PressableView>
    )
}
export default addAnimeListButton;
