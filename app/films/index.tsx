import FilmItem from '@/components/FilmItem';
import { COLORS } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { Film } from '../../types/interface';

// Skeleton Film Item Component
const SkeletonFilmItem = () => (
  <View style={styles.filmItemContainerSkeleton}> 
    <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonFilmTitle, { width: '70%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
    <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonFilmDetail, { width: '50%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
    <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonFilmDetail, { width: '60%' }]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
  </View>
);

const Page = () => {
    const [films, setFilms] = useState<Film[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const fetchFilms = useCallback(async (isRefresh = false) => {
        if (!isRefresh) {
            setInitialLoading(true);
        }
        try {
            const response = await fetch('https://swapi.py4e.com/api/films/');
            const data = await response.json();
            setFilms(data.results);
        } catch (error) {
            console.error('Error fetching films:', error);
        } finally {
            setInitialLoading(false);
            if (isRefresh) setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchFilms();
    }, [fetchFilms]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchFilms(true);
    }

    if (initialLoading) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={Array(5).fill(0)}
                    renderItem={() => <SkeletonFilmItem />}
                    keyExtractor={(_, index) => `skeleton-film-${index}`}
                    contentContainerStyle={styles.listContentContainer}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={films}
                keyExtractor={(item) => item.episode_id.toString()}
                renderItem={({ item }) => (
                    <FilmItem item={item} />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text} />
                }
                ListEmptyComponent={
                    !initialLoading && films.length === 0 ? (
                        <View style={styles.centeredEmptyContainer}>
                            <Ionicons name="videocam-off-outline" size={48} color={COLORS.inactive} />
                            <Text style={styles.emptyText}>No films found at the moment.</Text>
                            <Text style={styles.emptyHint}>Try pulling down to refresh.</Text>
                        </View>
                    ) : null
                }
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexGrow: 1,
    },
    filmItemContainerSkeleton: {
        backgroundColor: COLORS.containerBackground,
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    },
    skeletonFilmTitle: {
        height: 20,
        borderRadius: 4,
        marginBottom: 10,
    },
    skeletonFilmDetail: {
        height: 16,
        borderRadius: 4,
        marginBottom: 6,
    },
    centeredEmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        marginTop: 15,
        fontSize: 18,
        color: COLORS.text,
        fontWeight: '600',
        textAlign: 'center',
    },
    emptyHint: {
        marginTop: 8,
        fontSize: 14,
        color: COLORS.inactive,
        textAlign: 'center',
    }
});