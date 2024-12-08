import {OnProgressData} from "react-native-video";
import {Episode} from "../../../../../types/Episode.ts";

export const removeHtmlTags = (text: string) => {
    return text.replace(/<[^>]*>/g, '');
};

export const handleProgress = (
    progress:OnProgressData,
    setCurrentSubtitles:React.Dispatch<React.SetStateAction<string[]>>,
    setCurrentTime:React.Dispatch<React.SetStateAction<number>>,
    // subtitles:any,
    //VTTCaptionType[]
    setIsOnIntro:React.Dispatch<React.SetStateAction<boolean>>,
    setIsOnOutro:React.Dispatch<React.SetStateAction<boolean>>,
    ep:Episode
) =>{
    const time = progress.currentTime;
    // console.log();
    setCurrentTime(time);
    setIsOnIntro(time >= ep.openingstart && time < ep.openingend);
    setIsOnOutro(time >= ep.ending);
    // const activeSubtitles = subtitles.filter(subtitle =>
    //     time >= subtitle.startTime && time <= subtitle.endTime
    // );
    // setCurrentSubtitles(activeSubtitles.map(subtitle => removeHtmlTags(subtitle.text)));
}
