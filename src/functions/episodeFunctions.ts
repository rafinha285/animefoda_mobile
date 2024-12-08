import {Episode, EpisodeUser} from "../types/Episode.ts";
import {Anime} from "../types/Anime.ts";
import {Season} from "../types/Season.ts";
import {fetchUser} from "./userFunctions.ts";
import {ipBase} from "../consts.ts";

export function getEpTime(ee:number):string{
    var e = Math.round(ee)
    var h = Math.floor(e/3600).toString()
    let m:string =""
    var s = (e%60).toString()
    var ar:string[] = []

    if (h === "0") {
        s = s.length === 1 ? (s = `0${s}`) : s;
        m = Math.floor((e % 3600) / 60).toString();
        m = m.length === 1 ? `0${m}` : m; // Correção aqui
        ar.push(m, s);
    } else {
        s= s.length === 1 ? (s = `0${s}`) : s;
        m = Math.floor((e % 3600) / 60).toString();
        m = m.length === 1 ? `0${m}` : m; // Correção aqui
        h= h.length === 1 ? (h = `0${h}`) : h;
        ar.push(h, m, s);
    }
    return ar.join(":");
}
export const fetchEp =async(ani:Anime,s:Season)=>{
    const res = await fetch(`${ipBase}/ep/g/season/${ani.id}/${s.id}`)
    const data: Episode[] = await res.json();
    return data
}
export const fetchEpList = async(ani:Anime,s:Season)=>{
    const res = await fetchUser(`${ipBase}/ep/user/g/season/${ani?.id}/${s.id}`,"GET")
    let data:EpisodeUser[]
    if(!res.ok){
        return []
    }
    data = await res.json()
    console.log(data)
    return data;
}
