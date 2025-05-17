import { COLORS } from '@/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';

const PeopleLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.Background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'People', headerBackTitle: 'Back' }} />
      <Stack.Screen name="[id]" options={{ title: 'Person Details', headerBackTitle: 'Back' }} />
    </Stack>
  );
};

export default PeopleLayout; 