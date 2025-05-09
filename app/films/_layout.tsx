import { COLORS } from "@/constants/Colors";
import { Stack } from "expo-router";
const Layout=()=>{
    return(
     <Stack
     screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.Background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        contentStyle:{
            backgroundColor:COLORS.Background,
        }
      }}>
        <Stack.Screen name="index" options={{title:'All Films'}}/>
        <Stack.Screen name="[id]" options={{title:'Film Details'}}/>
      </Stack>
    )
}
export default Layout;