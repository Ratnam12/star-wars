import { COLORS } from '@/constants/Colors';
import { PeopleApiResponse, Person } from '@/types/interface';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const PEOPLE_API_URL = 'https://swapi.py4e.com/api/people';

const SkeletonItem = () => (
  <View style={styles.itemContainer}>
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      style={styles.skeletonIcon}
      shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]}
    />
    <View style={{ flex: 1 }}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.skeletonTextLine}
        shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]}
      />
    </View>
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      style={styles.skeletonChevron}
      shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]}
    />
  </View>
);

const Page = () => {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(PEOPLE_API_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const fetchPeople = useCallback(async (url: string) => {
    if (loading || !url) return;
    setLoading(true);
    if (url === PEOPLE_API_URL && people.length === 0) {
        // Ensure skeleton shows for a bit if API is too fast
        // await new Promise(resolve => setTimeout(resolve, 1500)); 
    }

    try {
      const response = await fetch(url);
      const data: PeopleApiResponse = await response.json();
      setPeople((prevPeople) => (url === PEOPLE_API_URL ? data.results : [...prevPeople, ...data.results]));
      setNextPage(data.next);
    } catch (error) {
      console.error("Failed to fetch people:", error);
    } finally {
      setLoading(false);
      if (initialLoading) setInitialLoading(false);
    }
  }, [loading, initialLoading, people.length]);

  useEffect(() => {
    if (people.length === 0) {
        setInitialLoading(true);
    }
    fetchPeople(PEOPLE_API_URL);
  }, []);

  const loadMorePeople = () => {
    if (nextPage && !loading) {
      fetchPeople(nextPage);
    }
  };

  const navigateToPersonDetail = (person: Person) => {
    const urlParts = person.url.split('/');
    const id = urlParts[urlParts.length - 2];
    router.push(`/people/${id}` as any);
  };

  const renderItem = ({ item }: { item: Person }) => (
    <Pressable
      style={({ pressed }) => [styles.itemContainer, pressed && styles.itemPressed]}
      onPress={() => navigateToPersonDetail(item)}
    >
      <View style={styles.itemContent}>
        <Ionicons name="person-circle-outline" size={40} color={COLORS.text} style={styles.itemIcon} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color={COLORS.inactive} />
    </Pressable>
  );

  const renderFooter = () => {
    if (!loading || initialLoading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color={COLORS.text} />;
  };

  if (initialLoading && people.length === 0) {
    return (
      <View style={styles.container}>
        <FlatList
          data={Array(7).fill(0)}
          renderItem={() => <SkeletonItem />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    );
  }
  
  if (!initialLoading && people.length === 0) {
      return (
          <View style={styles.centered}>
              <Ionicons name="sad-outline" size={48} color={COLORS.inactive} style={{marginBottom:10}} />
              <Text style={styles.infoText}>No people found.</Text>
              <Text style={styles.infoHint}>Perhaps the force is not strong with the network.</Text>
          </View>
      )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        onEndReached={loadMorePeople}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Background,
  },
  listContentContainer: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Background,
    padding: 20,
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
  },
  itemIcon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 17,
    color: COLORS.text,
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.text,
    fontSize: 16,
  },
  infoText:{
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoHint: {
      marginTop: 8,
      fontSize: 14,
      color: COLORS.inactive,
      textAlign: 'center',
  },
  skeletonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  skeletonTextLine: {
    height: 20,
    width: '80%',
    borderRadius: 4,
  },
  skeletonChevron: {
    width: 24,
    height: 24,
    borderRadius: 4,
  }
});

export default Page; 