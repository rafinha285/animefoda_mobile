import React, {useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {homeStyle} from "../styles/homeStyle.ts";
import Video, {VideoRef} from "react-native-video";
import {useRoute} from "@react-navigation/native";
import {WatchTabScreenProps} from "../types/Navigation";
import PlayerControls from "../components/Player/Controls/PlayerControls.tsx";
import {cdnUrl} from "../consts.ts";
import {handleProgress} from "../components/Player/Controls/functions/timeProgress/handleTimeProgress.ts";
import absoluteFill = StyleSheet.absoluteFill;
import {quality} from "../types/Quality.ts";
import {white} from "../styles/baseValues.ts";

const Watch:React.FC = () => {
    const route = useRoute<WatchTabScreenProps<'watchPage'>['route']>();
    const episode = route.params.episode;
    const [selectedQuality,setSelectedQuality] = useState<quality>(1080);
    const [loading, setLoading] = useState(true);

    const [paused, setPaused] = useState<boolean>(true);


    const [currentTime, setCurrentTime] = useState(0);

    const [selectedCaption,setSelectedCaption] = useState<string>('por');
    // const [subtitles, setSubtitles] = useState<VTTCaptionType[]>([]);
    const [currentSubtitles, setCurrentSubtitles] = useState<string[]>(['']);
    const [isOnIntro, setIsOnIntro] = useState<boolean>(false);
    const [isOnOutro, setIsOnOutro] = useState<boolean>(false);

    const videoRef = useRef<VideoRef>(null);

    const handleLoadStart = () => {
        setLoading(true);
    };
    const handleLoad = () => {
        setLoading(false);
    };
    const handleBuffer = (isBuffering: boolean) => {
        setLoading(isBuffering);
    };

    return (
        <View style={[homeStyle.body,{flexGrow:1}]}>
            {/*<Player ep={episode} />*/}
                <View style={playerStyles.container}>
                <>
                    <PlayerControls
                        setPaused={setPaused}
                        videoRef={videoRef}
                        paused={paused}
                        ep={episode}
                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}
                    />
                    <Video
                        ref={videoRef}
                        source={{uri:`${cdnUrl}/stream/${episode.anime_id}/${episode.season_id}/${episode.id}/${selectedQuality}`}}
                        // fullscreen={true}
                        style={absoluteFill}
                        resizeMode={'contain'}
                        onLoadStart={handleLoadStart}
                        onLoad={handleLoad}
                        onBuffer={({ isBuffering }) => handleBuffer(isBuffering)}
                        poster={`${cdnUrl}/ep/${episode.anime_id}/${episode.season_id}/${episode.id}/${episode.id}.jpg`}
                        onProgress={(e)=>handleProgress(e, setCurrentSubtitles, setCurrentTime, setIsOnIntro,setIsOnOutro,episode)}
                        paused={paused}
                        onError={(error) => {
                            console.error('Erro ao carregar o vídeo:', error);
                            // alert('Não foi possível carregar o vídeo. Tente novamente mais tarde.');
                        }}
                        onEnd={() => {
                            console.log('Reprodução concluída');
                        }}
                    />
                </>
                </View>
        </View>
    )
}
export default Watch;
const playerStyles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'black',
        elevation:1,
        zIndex: 1,
    },
    // controls: {
    //     position: 'absolute',
    //     bottom: 50,
    //     left: 0,
    //     right: 0,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 20,
    //     zIndex: 10, // Prioridade sobre o vídeo
    //     elevation: 10, // Necessário para Android
    //     backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // },
});

