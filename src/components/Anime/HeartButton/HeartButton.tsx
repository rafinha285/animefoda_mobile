import {PressableView} from "../../PressableView.tsx";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {borderWidth, heartSize, heartStyles} from "./heartButtonStyle.ts";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {white} from "../../../styles/baseValues.ts";

const HeartButton: React.FC = ()=>{
    const [isSelected, setIsSelected] = useState(false);

    const handleLike = () => {
        setIsSelected(!isSelected);
    };
    return(
        <PressableView style={[heartStyles.div,isSelected && heartStyles.selected]} onPress={handleLike}>
            <FontAwesomeIcon icon={faHeart} color={white} size={heartSize - borderWidth} />
        </PressableView>
    );
};
export default HeartButton;
