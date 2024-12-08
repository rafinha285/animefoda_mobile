import {Producer} from "./Producer.ts";
import {Season} from "./Season.ts";
import {quality} from "./Quality.ts";
import {Audio} from "./Audio.ts";
import {state} from "./State.ts";

export interface Anime{
    id:string;
    name:string;
    name2:string;
    description:string;
    quality:quality;
    language:Audio;
    state:state;
    releasedate:Date;
    studios:Producer[];
    producers:Producer[];
    creators:Producer[];
    genre:string[];
    seasons?:Season[];
    rating?:number;
    characters?:string[];
    // path?:string;
    averageeptime?:number;
    date_added?:Date;
    visible:boolean;
    weekday:string
}
