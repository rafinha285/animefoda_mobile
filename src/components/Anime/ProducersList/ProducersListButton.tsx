import React from "react";
import {PressableView} from "../../PressableView.tsx";
import TextFont from "../../Text/TextFont.tsx";
import {genStyles} from "../../../styles/AnimeStyle.ts";

interface Props {
    name: string;
    type:"gen"|"prod"|"stud"|"crea"
}
const ProducersListButton : React.FC<Props> = ({name,type}) =>{
    const push = () =>{
        console.log(name,type)
    }
    return(
        <PressableView onPress={push} style={genStyles.container}>
            <TextFont>{name}</TextFont>
        </PressableView>
    )
}
export default ProducersListButton;
