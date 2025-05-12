import { COLORS } from "@/constants/Colors";
import { FAVORITE_KEY } from "@/constants/keys";
import { Film } from "@/types/interface";
import Ionicon from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Page=()=>{
    const [favoriteFilms,setFavoriteFilms]=useState<Film[]>([]);
    const [refreshing,setRefreshing]=useState(false);
    
    
    const fetchFavorites=async()=>{
        try{
            const favorites=await AsyncStorage.getItem(FAVORITE_KEY);
            if(favorites){
                setFavoriteFilms(JSON.parse(favorites));
            } else {
                setFavoriteFilms([]);
            }
        }
        catch(error){
            console.error('Error fetching favorites:',error);
        }
        finally{
            setRefreshing(false);
        }
    }
    
    // Initial load
    useEffect(()=>{
        fetchFavorites();   
    },[])
    
    // Refresh on tab focus
    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchFavorites();
    }
    const removeFavorite=async(film:Film)=>{
        try{
            const favorites=await AsyncStorage.getItem(FAVORITE_KEY);
            if(favorites){
                const updatedFavorites=JSON.parse(favorites).filter((f:Film)=>f.episode_id!==film.episode_id);
                await AsyncStorage.setItem(FAVORITE_KEY,JSON.stringify(updatedFavorites));
                setFavoriteFilms(updatedFavorites);
            }
        }
        catch(error){
            console.error('Error removing favorite:',error);
        }
    }
    const renderItem=({item}:{item:Film})=>(
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
            <TouchableOpacity onPress={()=>removeFavorite(item)}>
                <Ionicon name="trash-outline" size={24} color={COLORS.text}/>
            </TouchableOpacity>
        </View>
    )
    
    return(
        <View style={styles.container}>
            <FlatList 
                data={favoriteFilms}
                keyExtractor={(item) => item.episode_id.toString()}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text}/>}
            />
            <Text>Favorite</Text>   
        </View>
    )
}

export default Page; 

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:COLORS.Background,
    },
    itemContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inactive,
        marginBottom: 8,
    },
    itemText:{
        fontSize:16,
        fontWeight:'bold',
        color:COLORS.text,
    }
})