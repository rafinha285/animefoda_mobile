import {VideoRef} from "react-native-video";
import {RefObject} from "react";

export function handleSeek(value: number, videoRef: React.RefObject<VideoRef>) {
    videoRef.current?.seek(value);
}
