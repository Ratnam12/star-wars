import { COLORS } from "@/constants/Colors";
import { FAVORITE_KEY } from "@/constants/keys";
import { Film } from "@/types/interface";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Page=()=>{
    const {id}=useLocalSearchParams();
    const [film,setFilm]=useState<Film|null>(null);
    const [loading,setLoading]=useState(true);
    const [isFavorite,setIsFavorite]=useState(false);
    
    useEffect(()=>{
        const fetchFilm=async()=>{
            try{
                const response= await fetch(`https://swapi.py4e.com/api/films/${id}/`);
                const data= await response.json();
                setFilm(data);
                checkFavoriteStatus(data);
            }catch(error){
                console.error('Error fetching films:',error);
            }finally{
                setLoading(false);
            }
        }
        fetchFilm();
    },[id])

    const checkFavoriteStatus=async(film:Film)=>{
        try{
            const favorites=await AsyncStorage.getItem(FAVORITE_KEY);
            if(favorites){
                const favoriteFilms=JSON.parse(favorites);
                setIsFavorite(favoriteFilms.some((f:Film)=>f.episode_id===film.episode_id));
            } else {
                setIsFavorite(false);
            }
        }
        catch(error){
            console.error('Error checking favorite status:',error);
        }
    }

    // Update favorite status whenever this screen gains focus
    useFocusEffect(
        useCallback(() => {
            if (film) {
                checkFavoriteStatus(film);
            }
        }, [film])
    );

    const toggleFavorite=async()=>{
        try{
            const favorites=await AsyncStorage.getItem(FAVORITE_KEY);
            let favoriteFilms=favorites? JSON.parse(favorites):[];

            if(isFavorite){
                favoriteFilms=favoriteFilms.filter((f:Film)=>f.episode_id!==film?.episode_id);
            }
            else{
                favoriteFilms.push(film);
            }
            await AsyncStorage.setItem(FAVORITE_KEY,JSON.stringify(favoriteFilms));
            setIsFavorite(!isFavorite);
        }
        catch(error){
            console.error('Error toggling favorite:',error);
        }
        
    }


    if(loading){
        return(
            <View>
                <Text style={{color:'#fff'}}>Loading...</Text>
            </View>
        )
    }
    if(!film){
        return(
            <View>
                <Text style={{color:'#fff'}}>No film found</Text>
            </View>
        )
    }
    return(
        <ScrollView style={styles.container}>
            <Stack.Screen options={{
                headerRight:()=>(
                    <TouchableOpacity onPress={toggleFavorite}>
                    <Ionicons name={isFavorite?'star':'star-outline'} size={24} color={isFavorite?'#FFE81F':'#fff'}/>
                    </TouchableOpacity>
                )
            }}/>
            <Text style={styles.title}>{film.title}</Text>
            <Text style={styles.detail}>Episode: {film.episode_id}</Text>
            <Text style={styles.detail}>Director: {film.director}</Text>
            <Text style={styles.detail}>Producer: {film.producer}</Text>
            <Text style={styles.detail}>Release Date: {film.release_date}</Text>
            <Text style={styles.crawl}>Opening Crawl: {film.opening_crawl}</Text>
        </ScrollView>
    )
}
export default Page;

const styles=StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:COLORS.containerBackground,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:COLORS.text,
        marginBottom:16,
    },
    detail:{
        fontSize:16,
        color:COLORS.text,
        marginBottom:8,
    },
    crawl:{
        fontSize:16,
        color:COLORS.text,
        marginTop:16,
        fontStyle:'italic',
        alignContent:'center',
    }
        
    
})