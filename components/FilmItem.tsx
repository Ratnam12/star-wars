
import { COLORS } from "@/constants/Colors";
import { Film } from "@/types/interface";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const FilmItem: React.FC<{item:Film}> = ({item})=>{
    const id=item.url.split('/').filter(Boolean).pop();
    return(
        <Link href={`/films/${id}`} asChild>
        <TouchableOpacity>
        <View style={styles.FilmItem}> 
            <Text style={styles.filmTitle}>{item.title}</Text>
            <Text style={styles.filmDeatils}>Episode {item.episode_id}</Text>
            <Text style={styles.filmDeatils}>Director: {item.release_date}</Text>
        </View>
        </TouchableOpacity>
        </Link>
        )
}

export default FilmItem;

const styles=StyleSheet.create({
    FilmItem:{
        backgroundColor:COLORS.Background,
        padding:16,
       marginVertical:16,
       marginHorizontal:16,
       borderRadius:8,

    },
    filmTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:COLORS.text,
        marginBottom:8
    },
    filmDeatils:{
        fontSize:14,
        color:"#fff",
    }
})
