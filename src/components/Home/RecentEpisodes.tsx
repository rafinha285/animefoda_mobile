import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {ipBase} from "../../consts.ts";
import TextFont from "../Text/TextFont.tsx";
import {Episode, IncomingEpisode} from "../../types/Episode.ts";
import RecentEpisodesImg from "./episodes/RecentEpisodeImg";
import {recentEpisodesStyle} from "../../styles/homeStyle.ts";

const RecentEpisodes:React.FC = () => {
    const [eps,setEps] = useState<IncomingEpisode[]>([]);
    const fetchData = async () =>{
        await fetch(`${ipBase}/ep/g/lan?count=8`).then(res=>{
            return res.json();
        }).then(data=> {
            // console.log(data);
            setEps(data);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <View style={recentEpisodesStyle.container}>
            <View>
                <TextFont style={recentEpisodesStyle.title}>Episodios</TextFont>
            </View>
            <View style={recentEpisodesStyle.innerContainer}>
                {eps.map((v,i)=>(
                    <RecentEpisodesImg episode={v} key={i}/>
                ))}
            </View>
        </View>
    );
};
export default RecentEpisodes;
