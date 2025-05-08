import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS } from '../constants/colors';
import { Film } from '../types/interface';

const Page=()=>{
    const [films,setFilms]=useState<Film[]>([]);
    const[refreshing,setRefreshing]=useState(false);
    const[loading,setLoading]=useState(false);

    const fetchFilms= async() =>{
        setLoading(true);
        try{
            const response= await fetch('https://swapi.py4e.com/api/films/');
            const data= await response.json();
            console.log("🚀 ~ fetchFilms ~ data:", data);
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
                <View>
                    <Text style={{color:'#fff'}}>{item.title}</Text>
                </View>
            )
        }
   
    return(
        <View style={styles.container}>
         <FlatList
         data={films}
         keyExtractor={(item)=>item.episode_id.toString()}
         renderItem={renderItem} />
            <Text>Films</Text>   
        </View>
    )
}

export default Page;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.Background,
    }
})