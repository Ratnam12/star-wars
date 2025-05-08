
import { COLORS } from "@/constants/colors";
import { Film } from "@/types/interface";
import { StyleSheet, Text, View } from "react-native";


const FilmItem: React.FC<{item:Film}> = ({item})=>{
    return(
        <View style={styles.FilmItem}> 
            <Text style={styles.filmTitle}>{item.title}</Text>
            <Text style={styles.filmDeatils}>Episode {item.episode_id}</Text>
            <Text style={styles.filmDeatils}>Director: {item.release_date}</Text>
        </View>
    )
}

export default FilmItem;

const styles=StyleSheet.create({
    FilmItem:{
        backgroundColor:COLORS.Background,
        padding:16,
       marginVertical:8,
       marginHorizontal:16,
       borderRadius:8,

    },
    filmTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:COLORS.text,
    },
    filmDeatils:{
        fontSize:14,
        color:"#fff",
    }
})
