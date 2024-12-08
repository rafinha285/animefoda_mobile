import {CompositeScreenProps, NavigatorScreenParams} from "@react-navigation/native";
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
    Home: undefined;
    Anime:NavigatorScreenParams<AnimeScreenParams>
    AnimeLancamentos:undefined
};
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type AnimeScreenParams = {
    animePage:string
}
export type WatchScreenParams = {
    watchPage:string;
}

export type AnimeTabScreenProps<T extends keyof AnimeScreenParams> =
    CompositeScreenProps<
        BottomTabScreenProps<AnimeScreenParams,T>,
        RootStackScreenProps<keyof RootStackParamList>
    >
export type WatchTabScreenProps<T extends keyof WatchScreenParams> =
    CompositeScreenProps<
        BottomTabScreenProps<WatchScreenParams,T>,
        RootStackScreenProps<keyof RootStackParamList>
    >


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
