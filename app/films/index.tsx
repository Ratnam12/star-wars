import FilmItem from '@/components/FilmItem';
import { ListEmptyComponent } from '@/components/ListEmptyComponents';
import { COLORS } from '@/constants/Colors';
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Film } from '../../types/interface';

const Page=()=>{
    const [films,setFilms]=useState<Film[]>([]);
    const[refreshing,setRefreshing]=useState(false);
    const[loading,setLoading]=useState(false);

    const fetchFilms= async() =>{
        setLoading(true);
        try{
            const response= await fetch('https://swapi.py4e.com/api/films/');
            const data= await response.json();
            setFilms(data.results);
        }catch(error){
            console.error('Error fetching films:',error);
        }finally{
            setLoading(false);
            setRefreshing(false);
        }
    };
        useEffect(()=>{
           fetchFilms();
        },[]);

        const renderItem=({item}:{item:Film})=>{
            return(
                <View >
                    <Text style={{color:'#fff'}}>{item.title}</Text>
                </View>
            )
        }
        const onRefresh=()=>{
            setRefreshing(true);
            fetchFilms();
        }
   
    return(
        <View style={styles.container}>
         <FlatList
        
         data={films}
         keyExtractor={(item)=>item.episode_id.toString()}
         renderItem={({item})=> <FilmItem item={item} />}
         refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchFilms} tintColor={COLORS.text} />
         }
         ListEmptyComponent={<ListEmptyComponent loading={loading} message="No films found"/>}
         
         
         />
              
        </View>
    )
}

export default Page;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.containerBackground,
    }
})