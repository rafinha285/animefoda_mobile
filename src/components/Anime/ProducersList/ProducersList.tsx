import {Producer} from "../../../types/Producer.ts";
import React from "react";
import {ScrollView, View} from "react-native";
import TextFont from "../../Text/TextFont.tsx";
import {animeStyle} from "../../../styles/AnimeStyle.ts";
import ProducersListButton from "./ProducersListButton.tsx";

interface props{
    gens:string[]|Producer[],
    label:string,
    type:"gen"|"prod"|"stud"|"crea"
}
const ProducersList:React.FC<props> = ({gens, label, type}) => {
    // console.log(gens,type)

    return(
        <View style={{flexDirection: 'row',alignItems:'center',marginVertical: 5}}>
            <TextFont>{label}: </TextFont>
            <ScrollView horizontal={true} style={animeStyle.genDiv}>
                {gens.map((value, index) => (
                    <ProducersListButton type={type} key={index} name={typeof value === 'object' ? value.name : value as string}/>
                ))}
            </ScrollView>
        </View>
    )
}
export default ProducersList;
