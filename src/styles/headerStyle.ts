import { StyleSheet } from 'react-native';
import {header_purple, white} from "./baseValues.ts";

export const HeaderStyles = StyleSheet.create({
    title:{
        fontSize:20,
        marginVertical:'auto',
        marginHorizontal:0,
    },
    header:{
        height: 60,
        width: '100%',
        paddingHorizontal: 30,
        backgroundColor: header_purple,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Centraliza verticalmente dentro do contêiner pai
    },
    nav:{
        display:'flex',
        // alignContent:"center",
        // alignItems:"center",
        justifyContent:'space-between',
    },
    userDiv:{
        padding:5,
    },
    userIcon:{
        color:white,
    },
});
