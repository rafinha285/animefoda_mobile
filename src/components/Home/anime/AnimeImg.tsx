import {Anime} from "../../../types/Anime.ts";
import {cdnUrl} from "../../../consts.ts";
import {Image, View} from "react-native";
import {PressableView} from "../../PressableView.tsx";
import {useNavigation} from "@react-navigation/native";
import {animeComponentStyle} from "./animeComponentStyle.ts";
import FastImage from "react-native-fast-image";

interface props{
    animee:Anime
}

const AnimePoster:React.FC<props>=({animee})=>{
    const imageUrl = `${cdnUrl}/ani/img?Id=${animee.id}`
    const navigation = useNavigation();
    const onPress = () => {

        navigation.navigate('Anime' as never, { animeId:animee.id } as never);
    };
    return(
        <PressableView onPress={onPress}>
            <View style={animeComponentStyle.main}>
                <FastImage
                    style={animeComponentStyle.img}
                    source={{
                        uri:imageUrl,
                    }}
                ></FastImage>
            </View>
        </PressableView>
    )
}
export default AnimePoster
