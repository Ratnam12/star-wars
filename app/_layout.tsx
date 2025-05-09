import { COLORS } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: COLORS.Background,
      },
      headerTintColor: COLORS.text,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      tabBarStyle: {
        backgroundColor: COLORS.Background,
        borderTopColor: COLORS.text,
        borderTopWidth: 1,
      },
      tabBarActiveTintColor: COLORS.text,
      tabBarInactiveTintColor: COLORS.inactive,
    }}>
      <Tabs.Screen
        name="films"
        options={{
          title: 'All Films',
          tabBarLabel: 'Films',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Ionicons name="film-outline" size={size} color={color} />)
        }}
      />

      <Tabs.Screen
        name="favourites"
        options={{
          title: 'All favourites',
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color, size }) => (<Ionicons name="heart" size={size} color={color} />)
        }}
      />

      <Tabs.Screen
        name="people"
        options={{
          title: 'All people',
          tabBarLabel: 'People',
          tabBarIcon: ({ color, size }) => (<Ionicons name="people" size={size} color={color} />)
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
