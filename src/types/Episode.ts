import {languages} from "./Languages.ts";

export interface Episode{
    id:string
    epindex:number;
    name:string;
    anime_id:string;
    releasedate:Date;
    views?:number;
    duration:number;
    openingstart:number;
    openingend:number;
    ending:number;
    audiotracks:languages[];
    subtitlestracks?:string[];
    season_id:string
    resolution:string[]
    date_added:Date;
}
export interface IncomingEpisode{
    animeid:string;
    animename:string;
    date_added:Date;
    duration:number;
    id:string;
    name:string;
    resolution:string[],
    seasonid:string;
    seasonname:string;
}
export interface EpisodeUser{
    episode_id:string;
    dropped_on:number;
    season_id:string
    anime_id:string;
    user_id:string;
    id:string;
    date:Date;
    duration:number;
    ep_index:number;
    name:string;
    watched:boolean;
}
