import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


interface ListEmptyComponentProps{
    loading:boolean;
    message?:string;
}

export const ListEmptyComponent=({loading,message='No items found'}:ListEmptyComponentProps)=>{
   
    return(
        <View style={styles.emptyContainer}>
            {loading ? (
                <ActivityIndicator size="large" color={"COLORS.text"} />
            ):( <Text style={styles.emptyText}>{message}</Text>

            )}
           
        </View>
    )
}

const styles=StyleSheet.create({
    emptyContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height:300,
    },
    emptyText:{
        color:'COLORS.inactive',
        fontSize:18,
    }
});