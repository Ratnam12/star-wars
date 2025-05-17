import { COLORS } from '@/constants/Colors';
import { Person } from '@/types/interface';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

// Skeleton Detail Row Component
const SkeletonDetailRow = () => (
  <View style={styles.detailItemContainer}> 
    <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.skeletonDetailIcon} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
    <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonDetailLabel, {width: '40%'}]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
    <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.skeletonDetailValue, {width: '50%'}]} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
  </View>
);

// Skeleton Person Detail Page Component
const SkeletonPersonDetailPage = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
    <View style={styles.headerSection}>
      <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.skeletonAvatar} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
      <ShimmerPlaceholder LinearGradient={LinearGradient} style={styles.skeletonName} shimmerColors={[COLORS.inactive, COLORS.containerBackground, COLORS.inactive]} />
    </View>
    <View style={styles.detailsCard}>
      {Array(7).fill(0).map((_, index) => <SkeletonDetailRow key={`skeleton-detail-${index}`} />)}
    </View>
  </ScrollView>
);

const PersonDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // This will now represent initial loading for skeleton
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false); // Stop loading if no ID
      setError("No ID provided for person details.");
      return;
    }

    const fetchPersonDetails = async () => {
      setLoading(true); // Start loading for skeleton
      setError(null);
      try {
        // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        const response = await fetch(`https://swapi.py4e.com/api/people/${id}/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch person details: ${response.status}`);
        }
        const data: Person = await response.json();
        setPerson(data);
      } catch (e: any) {
        console.error("Failed to fetch person details:", e);
        setError(e.message || "An unknown error occurred while fetching details.");
      } finally {
        setLoading(false); // Stop loading, content or error will show
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (loading) { // Show skeleton while loading is true
    return <SkeletonPersonDetailPage />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.inactive} />
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.errorHint}>Please check the ID or try again later.</Text>
      </View>
    );
  }

  if (!person) { // Should ideally not be reached if loading and error are handled, but as a fallback
    return (
      <View style={styles.centered}>
         <Ionicons name="sad-outline" size={48} color={COLORS.inactive} />
        <Text style={styles.infoText}>Person not found.</Text>
      </View>
    );
  }

  const DetailRow = ({ label, value, iconName }: { label: string; value: string | number; iconName?: keyof typeof Ionicons.glyphMap }) => (
    <View style={styles.detailItemContainer}>
      {iconName && <Ionicons name={iconName} size={22} color={COLORS.text} style={styles.detailIcon} />}
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      <View style={styles.headerSection}>
        <Ionicons name="person-circle-outline" size={80} color={COLORS.text} />
        <Text style={styles.name}>{person.name}</Text>
      </View>

      <View style={styles.detailsCard}>
        <DetailRow label="Height" value={`${person.height} cm`} iconName="body-outline" />
        <DetailRow label="Mass" value={`${person.mass} kg`} iconName="barbell-outline" />
        <DetailRow label="Hair Color" value={person.hair_color} iconName="color-palette-outline" />
        <DetailRow label="Skin Color" value={person.skin_color} iconName="color-palette-outline" />
        <DetailRow label="Eye Color" value={person.eye_color} iconName="eye-outline" />
        <DetailRow label="Birth Year" value={person.birth_year} iconName="calendar-outline" />
        <DetailRow label="Gender" value={person.gender} iconName="transgender-outline"/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Background,
  },
  scrollContentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Background,
    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: COLORS.containerBackground,
    borderRadius: 10,
    padding: 20,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  detailItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inactive,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'right',
    flexShrink: 1,
  },
  infoText: {
    marginTop:10,
    fontSize: 17,
    color: COLORS.inactive,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 17,
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
  errorHint: {
    fontSize: 14,
    color: COLORS.inactive,
    textAlign: 'center',
  },
  skeletonAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  skeletonName: {
    width: '60%',
    height: 26,
    borderRadius: 4,
    marginTop:10,
  },
  skeletonDetailIcon: {
    width: 22, 
    height: 22, 
    borderRadius: 4, 
    marginRight: 12,
  },
  skeletonDetailLabel: {
    height: 16, 
    borderRadius: 4,
    flex: 1,
  },
  skeletonDetailValue: {
    height: 16, 
    borderRadius: 4,
  },
});

export default PersonDetailPage; 