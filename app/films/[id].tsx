import { COLORS } from "@/constants/Colors";
import { FAVORITE_KEY } from "@/constants/keys";
import { Film } from "@/types/interface";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

// Skeleton Film Detail Page Component
const SkeletonFilmDetailPage = () => (
    <ScrollView style={styles.container}>
        <View style={styles.skeletonHeaderPlaceholder} />
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonTitle, { width: '70%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonDetailLine, { width: '50%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonDetailLine, { width: '60%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonDetailLine, { width: '55%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonDetailLine, { width: '45%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
        
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonCrawlLabel, { width: '40%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
        <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonCrawlText, { height: 100 }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
    </ScrollView>
);

const Page=()=>{
    const {id}=useLocalSearchParams<{ id: string }>();
    const [film,setFilm]=useState<Film|null>(null);
    const [loading,setLoading]=useState(true);
    const [isFavorite,setIsFavorite]=useState(false);
    
    useEffect(()=>{
        if (!id) {
            setLoading(false);
            console.error("No ID provided for film details.");
            return;
        }
        const fetchFilm=async()=>{
            setLoading(true);
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

    const checkFavoriteStatus=async(filmData:Film)=>{
        try{
            const favorites=await AsyncStorage.getItem(FAVORITE_KEY);
            if(favorites){
                const favoriteFilms=JSON.parse(favorites);
                setIsFavorite(favoriteFilms.some((f:Film)=>f.episode_id===filmData.episode_id));
            } else {
                setIsFavorite(false);
            }
        }
        catch(error){
            console.error('Error checking favorite status:',error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (film) {
                checkFavoriteStatus(film);
            }
        }, [film])
    );

    const toggleFavorite=async()=>{
        if (!film) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        try{
            const favorites=await AsyncStorage.getItem(FAVORITE_KEY);
            let favoriteFilms=favorites? JSON.parse(favorites):[];

            if(isFavorite){
                favoriteFilms=favoriteFilms.filter((f:Film)=>f.episode_id!==film.episode_id);
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
        return <SkeletonFilmDetailPage />;
    }

    if(!film){
        return(
            <View style={styles.centeredMessageContainer}>
                <Ionicons name="alert-circle-outline" size={48} color={COLORS.inactive} />
                <Text style={styles.messageText}>Film not found or an error occurred.</Text>
            </View>
        )
    }

    return(
        <ScrollView style={styles.container}>
            <Stack.Screen options={{
                headerRight:()=>(
                    film ? (
                        <TouchableOpacity onPress={toggleFavorite} hitSlop={10}>
                            <Ionicons name={isFavorite?'star':'star-outline'} size={28} color={isFavorite? COLORS.text :'#fff'}/>
                        </TouchableOpacity>
                    ) : null
                )
            }}/>
            <Text style={styles.title}>{film.title}</Text>
            <Text style={styles.detail}>Episode: {film.episode_id}</Text>
            <Text style={styles.detail}>Director: {film.director}</Text>
            <Text style={styles.detail}>Producer: {film.producer}</Text>
            <Text style={styles.detail}>Release Date: {film.release_date}</Text>
            <Text style={styles.crawlLabel}>Opening Crawl:</Text>
            <Text style={styles.crawlText}>{film.opening_crawl}</Text>
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
    crawlLabel: {
        fontSize:18,
        fontWeight:'bold',
        color:COLORS.text,
        marginTop:16,
        marginBottom:8,
    },
    crawlText:{
        fontSize:16,
        color:COLORS.text,
        fontStyle:'italic',
        lineHeight: 22,
    },
    centeredMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.Background,
    },
    messageText: {
        marginTop: 10,
        fontSize: 17,
        color: COLORS.inactive,
        textAlign: 'center',
    },
    skeletonHeaderPlaceholder: {
        height: 30,
        marginBottom: 16,
    },
    skeletonTitle: {
        height: 24, 
        borderRadius: 4, 
        marginBottom: 16
    },
    skeletonDetailLine: {
        height: 16, 
        borderRadius: 4, 
        marginBottom: 10
    },
    skeletonCrawlLabel: {
        height: 18, 
        borderRadius: 4, 
        marginTop: 20, 
        marginBottom: 10
    },
    skeletonCrawlText: {
        borderRadius: 4, 
    }
});