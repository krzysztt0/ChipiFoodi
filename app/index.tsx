import React, { useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { selectRecipesByGoal } from './store/recipes';
import { toggleUserGoal, useUserGoals, type DietGoal } from './store/userGoals';

const CATEGORIES = [
  { id: '1', name: 'Śniadania', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Obiady', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Kolacje', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Przekąski', image: 'https://via.placeholder.com/150' },
];

const GOALS: {
  id: DietGoal;
  label: string;
  emoji: string;
  chipClasses: {
    base: string;
    active: string;
  };
}[] = [
  {
    id: 'balanced',
    label: 'Zdrowe',
    emoji: '🥦',
    chipClasses: {
      base: 'bg-green-100 border border-green-300',
      active: 'bg-green-500 border-green-600',
    },
  },
  {
    id: 'budget',
    label: 'Tanie',
    emoji: '💰',
    chipClasses: {
      base: 'bg-yellow-100 border border-yellow-300',
      active: 'bg-yellow-400 border-yellow-500',
    },
  },
  {
    id: 'quick',
    label: 'Szybkie',
    emoji: '⏱️',
    chipClasses: {
      base: 'bg-blue-100 border border-blue-300',
      active: 'bg-blue-400 border-blue-500',
    },
  },
];

const goalLabels: Record<DietGoal, string> = {
  balanced: 'Zdrowe',
  budget: 'Tanie',
  quick: 'Szybkie',
};

const goalBadgeStyles: Record<DietGoal, string> = {
  balanced: 'bg-green-100 border border-green-300 text-green-800',
  budget: 'bg-yellow-100 border border-yellow-300 text-yellow-800',
  quick: 'bg-blue-100 border border-blue-300 text-blue-800',
};

const SearchIcon = () => <Text>🔍</Text>;

const HomeScreen = () => {
  const selectedGoal = useUserGoals();

  const recipes = useMemo(
    () => selectRecipesByGoal(selectedGoal),
    [selectedGoal],
  );

  const renderHeader = () => (
    <View className="px-4 pt-2.5">
      <Text className="text-3xl font-bold text-gray-900">
        Znajdź zdrowy posiłek
      </Text>

      <View className="mt-4 flex-row items-center rounded-xl bg-gray-100 px-3">
        <SearchIcon />
        <TextInput
          placeholder="Szukaj przepisów..."
          className="ml-2 flex-1 py-3 text-base"
        />
      </View>

      <View className="mt-4 flex-row">
        {GOALS.map(({ id, label, emoji, chipClasses }) => {
          const isActive = selectedGoal === id;
          return (
            <TouchableOpacity
              key={id}
              className={`mr-2 rounded-full px-4 py-2 ${
                chipClasses[isActive ? 'active' : 'base']
              }`}
              onPress={() => toggleUserGoal(id)}
            >
              <Text
                className={`font-semibold ${
                  isActive ? 'text-white' : 'text-gray-800'
                }`}
              >
                {emoji} {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text className="mt-6 mb-3 text-xl font-bold">Kategorie</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="-ml-4 pl-4"
        renderItem={({ item }) => (
          <TouchableOpacity className="mr-3 h-24 w-24 overflow-hidden rounded-lg">
            <ImageBackground
              source={{ uri: item.image }}
              resizeMode="cover"
              className="flex-1"
            >
              <View className="flex-1 justify-end bg-black/30 p-2">
                <Text className="text-sm font-bold text-white">{item.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

      <Text className="mt-6 mb-3 text-xl font-bold">Polecane dla Ciebie</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-6 px-4"
            onPress={() => {
              /* Nawigacja do ekranu szczegółów */
            }}
          >
            <View className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              <Image source={{ uri: item.image }} className="h-48 w-full" />

              <View className="absolute left-3 top-3 flex-row flex-wrap">
                {item.goals.map((goal) => (
                  <View
                    key={`${item.id}-${goal}`}
                    className={`mr-1.5 mb-1.5 rounded-full px-2 py-1 ${goalBadgeStyles[goal]}`}
                  >
                    <Text className="text-xs font-bold">
                      {goalLabels[goal]}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="p-3">
                <Text className="mb-1 text-lg font-bold text-gray-900">
                  {item.title}
                </Text>
                <View className="mt-1 flex-row items-center justify-between">
                  <Text className="text-sm text-gray-600">
                    Kalorie: <Text className="font-bold">{item.calories}</Text>
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Cena:{' '}
                    <Text className="font-bold text-green-700">{item.price}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
