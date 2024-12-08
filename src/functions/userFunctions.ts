import {GlobalContextType} from "../GlobalContext.tsx";
import {Episode} from "../types/Episode.ts";
import {roles} from "../types/UserTypes.ts";
import {ipBase} from "../consts.ts";

export async function fetchUser(path:string,method:"POST"|"DELETE"|"PATCH"|"GET" = "POST",body?:any){
    let indentifier = getDeviceIndentifier()
    return await fetch(path,{
        method,
        headers:{
            'Content-Type':"application/json",
            'timeZone':indentifier.timeZone,
            'webGlRenderer':indentifier.WegGl?.renderer,
            'webGlVendor':indentifier.WegGl?.vendor,
        },
        body:JSON.stringify(body)
    })
}
export function getDeviceIndentifier() {
    const fingerprint = {
        userAgent:navigator.userAgent,
        timeZone:getTimeZone(),
        WegGl:getWebGLFingerprint()
    }
    return fingerprint
}
//Funções para pegar as coisas do digest
//mais facil pra debugar
function getWebGLFingerprint() {
    try {
        let canvas = document.createElement('canvas');
        let gl = canvas.getContext('webgl') as WebGLRenderingContext || canvas.getContext('experimental-webgl') as WebGLRenderingContext;

        if (!gl) return null;

        let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            return { vendor, renderer };
        }

        return null
    } catch (e) {
        return null;
    }
}
function getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
export const handlePostSec = async (context:GlobalContextType,ep:Episode,sec: number) => {
    if (context.isLogged) {
        let body = {
            episode_id: ep?.id,
            anime_id: ep?.anime_id,
            dropped_on: sec,
            season_id: ep?.season_id,
        }
        await fetchUser(`${ipBase}/ep/user/p/`, 'POST', body)
    }
}
interface getPrivilegesInterface{
    role:roles[],
    super:boolean
}
export async function getPrivileges():Promise<getPrivilegesInterface>{
    let res= await fetchUser(`${ipBase}/user/g/privileges`,"GET")
    let response:{success:boolean,role:roles[],super:boolean} = await res.json()
    return {role:response.role,super:response.super};
}
