import { COLORS } from "@/constants/Colors";
import { FAVORITE_KEY } from "@/constants/keys";
import { Film } from "@/types/interface";
import Ionicon from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";

const Page = () => {
    const [favoriteFilms, setFavoriteFilms] = useState<Film[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    
    const fetchFavorites = async () => {
        try {
            const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
            if (favorites) {
                setFavoriteFilms(JSON.parse(favorites));
            } else {
                setFavoriteFilms([]);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setRefreshing(false);
        }
    }
    
    // Initial load
    useEffect(() => {
        fetchFavorites();
    }, [])
    
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

    const removeFavorite = async (film: Film) => {
        try {
            const favorites = await AsyncStorage.getItem(FAVORITE_KEY);
            if (favorites) {
                const updatedFavorites = JSON.parse(favorites).filter((f: Film) => f.episode_id !== film.episode_id);
                await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
                setFavoriteFilms(updatedFavorites);
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    }

    const renderItem = ({ item }: { item: Film }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Ionicon name="film-outline" size={30} color={COLORS.text} style={styles.itemIcon} />
                <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
            </View>
            <Pressable onPress={() => removeFavorite(item)} hitSlop={10} style={styles.trashButton}>
                <Ionicon name="trash-outline" size={24} color={COLORS.inactive} />
            </Pressable>
        </View>
    );
    
    const ListEmptyComponent = () => (
        <View style={styles.centered}>
            <Ionicon name="star-outline" size={48} color={COLORS.inactive} />
            <Text style={styles.infoText}>No favorite films yet.</Text>
            <Text style={styles.infoHint}>Add films to your favorites from the Films tab!</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteFilms}
                keyExtractor={(item) => item.episode_id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={ListEmptyComponent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text} />}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    )
}

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Background,
    },
    listContentContainer: {
        paddingVertical: 8,
        flexGrow: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.Background,
    },
    itemContainer: {
        backgroundColor: COLORS.containerBackground,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    itemPressed: {
        backgroundColor: COLORS.inactive, 
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    itemIcon: {
        marginRight: 15,
    },
    itemText: {
        fontSize: 17,
        color: COLORS.text,
        fontWeight: '500',
        flexShrink: 1,
    },
    trashButton: {
        padding: 5,
    },
    infoText: {
        marginTop: 15,
        fontSize: 18,
        color: COLORS.inactive,
        textAlign: 'center',
    },
    infoHint: {
        marginTop: 8,
        fontSize: 14,
        color: COLORS.inactive,
        textAlign: 'center',
    }
})