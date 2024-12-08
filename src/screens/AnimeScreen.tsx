import React, {FC, useEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {AnimeTabScreenProps} from "../types/Navigation";
import {Episode, EpisodeUser} from "../types/Episode.ts";
import {Anime} from "../types/Anime.ts";
import {cdnUrl, ipBase} from "../consts.ts";
import {ScrollView, View} from "react-native";
import {homeStyle} from "../styles/homeStyle.ts";
import Header from "../components/Header.tsx";
import FastImage from "react-native-fast-image";
import {animeStyle} from "../styles/AnimeStyle.ts";
import TextFont from "../components/Text/TextFont.tsx";
import {PressableView} from "../components/PressableView.tsx";
import {fetchEp, getEpTime} from "../functions/episodeFunctions.ts";
import {Picker} from "@react-native-picker/picker";
import Loading from "../components/Loading/Loading.tsx";
import HeartButton from "../components/Anime/HeartButton/HeartButton.tsx";
import ProducersList from "../components/Anime/ProducersList/ProducersList.tsx";
import {getMonthName} from "../functions/stringFunctions.ts";
import AddAnimeListButton from "../components/Anime/AddAnimeListButton/AddAnimeListButton.tsx";
import Episodes from "../components/Anime/EpisodesButton/Episodes.tsx";
import {Season} from "../types/Season.ts";
import {Producer} from "../types/Producer.ts";

const AnimeScreen:FC = () => {
    const route = useRoute<AnimeTabScreenProps<"animePage">["route"]>();
    const navigation = useNavigation();
    const aniId = route.params.animeId;
        const [anime,setAnime] = useState<Anime>();
    interface EpisodeState{
        [seasonId:string]: Episode[]
    }
    const [episodes,setEpisodes] = useState<EpisodeState>();
    interface EpisodeListState{
        [seasonId:string]: EpisodeUser[]
    }
    const [episodesMap, setEpisodesMap] = useState<Map<string,Episode[]>>(new Map());
    const [episodesWatched,setEpisodesWatched] = useState<EpisodeListState>({})
    const [selectedSeason, setSelectedSeason] = useState<string>();
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [producers,setProducers] = useState<Producer[]>([])
    const [creators,setCreators] = useState<Producer[]>([])
    const [studios,setStudios] = useState<Producer[]>([])


    const aniImgUrl = `${cdnUrl}/ani/img?Id=${aniId}`
    const [isEpisodeLoading,setIsEpisodeLoading] = useState<boolean>(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca o anime
                const animeRes: Anime = await fetch(`${ipBase}/ani/g/${aniId}`).then(res => res.json());
                setAnime(animeRes);

                // Busca produtores, criadores e estúdios
                const prodsData = await fetch(`${ipBase}/ani/g/prods/${animeRes.id}`).then(res => res.json());
                setCreators(prodsData.creators);
                setProducers(prodsData.producers);
                setStudios(prodsData.studios);

                // Busca temporadas e episódios
                const seasonsData: Season[] = await fetch(`${ipBase}/ani/g/seasons/${animeRes.id}`).then(res => res.json());
                console.log(seasonsData);
                setSeasons(seasonsData);

                const episodesPromises = seasonsData.map(async (season) => {
                    const fetchedEps = await fetchEp(animeRes, season);
                    episodesMap.set(season.id, fetchedEps);
                    console.log(`Season ${season.id} (${season.name}) Episodes fetched.`);
                });
                await Promise.all(episodesPromises);
                setSelectedSeason(seasonsData[0].id)
                // console.log(episodesMap);
                // const episodesMap: EpisodeState = {};

                // Itera sobre as temporadas para buscar os episódios
                // for (let i = 0; i < seasons.length; i++) {
                //     // console.log(seasons);
                //     let season = seasonsData.find(season => season.index === i+1);
                //     if(season){
                //         console.log(season,seasonsData,i+1)
                //         // Carrega os episódios de cada temporada
                //         const fetchedEps = await fetchEp(animeRes, season);
                //         // console.log(fetchedEps);
                //         // Atualiza o estado com os episódios da temporada
                //         episodesMap[season.id] = fetchedEps;
                //     }
                // }
                // console.log(episodesMap);
                // Atualiza o estado de episódios com todos os episódios de todas as temporadas
                // setEpisodes(prev => ({ ...prev, ...episodesMap }));

                // setEpisodes(episodesData);
            } catch (error) {
                console.error("Erro ao buscar dados do anime:", error);
            }
        };
        fetchData();
    }, [aniId]);
    const [descBool, setDescBool] = useState(false);
    const descHandle = () =>{
        setDescBool(!descBool);
        // console.log(descBool);
    }
    const watchHandle = (ep:Episode) =>{
        // console.log()
        navigation.navigate("Watch" as never,{episode:ep} as never)
    }
    return (
        <ScrollView style={[homeStyle.body]}>
            <Header/>
            {anime?(
                <View style={animeStyle.topView}>
                    <FastImage
                        style={[animeStyle.img,animeStyle.imgShadow]}
                        source={{
                            uri:aniImgUrl,
                            priority:FastImage.priority.high,
                        }}
                    />
                    <View style={animeStyle.topText}>
                        <View style={animeStyle.titleDiv}>
                            <TextFont style={animeStyle.title}>{anime.name}</TextFont>
                            {anime.name2 ? <TextFont style={animeStyle.name2}>{anime.name2}</TextFont> : <></>}
                        </View>
                        <HeartButton/>
                    </View>
                    <PressableView onPress={descHandle} style={[animeStyle.descDiv,descBool ? {height:undefined} : {height:105}]}>
                        <TextFont style={animeStyle.descText}>{anime.description}</TextFont>
                    </PressableView>
                    <View style={animeStyle.details}>
                        {/*Generos*/}
                        <ProducersList type={"gen"} gens={anime.genre} label="Generos"/>
                        <ProducersList type={"prod"} label={"Produtores"} gens={producers}/>
                        <ProducersList type={"stud"} label={"Estudio"} gens={studios}/>
                        <ProducersList gens={creators} label={"Criadores"} type={"crea"}/>
                        <TextFont style={animeStyle.detailsText}>Duração media: {getEpTime(anime.averageeptime!)}</TextFont>
                        <TextFont style={animeStyle.detailsText}>Idioma: {anime.language}</TextFont>
                        <View style={{flexDirection:"row"}}>
                            <TextFont style={animeStyle.detailsText}>Data de Lançamento: </TextFont>
                            <TextFont style={animeStyle.detailsText}>{new Date(anime.releasedate).getDate().toString()} </TextFont>
                            <TextFont style={animeStyle.detailsText}>de </TextFont>
                            <TextFont style={animeStyle.detailsText}>{getMonthName(new Date(anime.releasedate),false)} </TextFont>
                            <TextFont style={animeStyle.detailsText}>de </TextFont>
                            <TextFont style={animeStyle.detailsText}>{new Date(anime.releasedate).getFullYear().toString()}</TextFont>
                        </View>
                        {/*</TextFont>*/}
                        <TextFont style={animeStyle.detailsText}>Qualidade: {anime.quality}</TextFont>
                        <AddAnimeListButton/>
                    </View>
                    <View>
                        <View style={animeStyle.seasonSelectDiv}>
                            <View style={animeStyle.seasonSelect}>
                                <Picker style={{width:"100%"}} selectedValue={selectedSeason} onValueChange={(e)=> {
                                    // console.log(e)
                                    setSelectedSeason(e);
                                }}>
                                    {seasons?.sort((a,b)=>a.index-b.index).map((v,i)=>(
                                        <Picker.Item label={v.name} value={v.id} key={i}></Picker.Item>
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={animeStyle.seasonSelectDiv}>
                            {
                                //!isEpisodeLoading &&
                                episodesMap && selectedSeason? (
                                    episodesMap.get(selectedSeason)
                                        ?.sort((a, b) => a.epindex - b.epindex)
                                        .map((v, i) => {
                                            return <Episodes episode={v} key={i} watchHandle={watchHandle} />;
                                        })
                                ) : <></>
                            }
                        </View>
                    </View>
                </View>)
            : (<Loading/>)}
            {/*<RecentEpisodes/>*/}
        </ScrollView>

    );
};

export default AnimeScreen;
