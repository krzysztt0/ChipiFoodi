import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground, // Użyjemy dla tła kategorii
} from 'react-native';
// Będziesz potrzebował biblioteki ikon, np. react-native-vector-icons
// import Icon from 'react-native-vector-icons/Ionicons';

// Przykładowe dane, żeby listy miały co wyświetlić
const CATEGORIES = [
  { id: '1', name: 'Śniadania', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Obiady', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Kolacje', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Przekąski', image: 'https://via.placeholder.com/150' },
];

const RECIPES = [
  {
    id: 'r1',
    title: 'Szybka zupa z soczewicy',
    price: '$2.50',
    calories: '450',
    isHealthy: true,
    isCheap: true,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 'r2',
    title: 'Tost z awokado i jajkiem',
    price: '$1.50',
    calories: '350',
    isHealthy: true,
    isCheap: true,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 'r3',
    title: 'Patelnia z kurczakiem i ryżem',
    price: '$3.00',
    calories: '550',
    isHealthy: true,
    isCheap: false,
    image: 'https://via.placeholder.com/300',
  },
];

// Musisz zaimportować swoją ikonę, tutaj jest jako placeholder
const SearchIcon = () => <Text>🔍</Text>; 

const HomeScreen = () => {
  // --- Komponent nagłówka dla FlatList ---
  // Zawiera wszystko OPRÓCZ listy "Polecane przepisy"
  const renderHeader = () => (
    <View className="px-4 pt-2.5">
      {/* 1. Nagłówek i Wyszukiwarka */}
      <Text className="text-3xl font-bold text-gray-900">
        Znajdź zdrowy posiłek
      </Text>

      <View className="flex-row items-center bg-gray-100 rounded-xl px-3 mt-4">
        {/* <Icon name="search-outline" size={20} color="#888" /> */}
        <SearchIcon />
        <TextInput
          placeholder="Szukaj przepisów..."
          className="flex-1 py-3 ml-2 text-base"
        />
      </View>

      {/* 2. Szybkie Filtry (Kluczowa funkcja!) */}
      <View className="flex-row mt-4">
        <TouchableOpacity className="bg-green-100 py-2 px-4 rounded-full mr-2 border border-green-300">
          <Text className="font-semibold text-green-800">🥦 Zdrowe</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-yellow-100 py-2 px-4 rounded-full mr-2 border border-yellow-300">
          <Text className="font-semibold text-yellow-800">💰 Tanie</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-100 py-2 px-4 rounded-full border border-blue-300">
          <Text className="font-semibold text-blue-800">⏱️ Szybkie</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Kategorie (Lista pozioma) */}
      <Text className="text-xl font-bold mt-6 mb-3">Kategorie</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // Używamy ujemnego marginesu i paddingu, aby lista zaczynała się od krawędzi
        className="-ml-4 pl-4" 
        renderItem={({ item }) => (
          // To jest "CategoryCard"
          <TouchableOpacity className="w-24 h-24 rounded-lg mr-3 overflow-hidden">
            <ImageBackground
              source={{ uri: item.image }}
              resizeMode="cover"
              className="flex-1"
            >
              {/* Nakładka dla czytelności tekstu */}
              <View className="flex-1 justify-end p-2 bg-black/30">
                <Text className="text-white font-bold text-sm">
                  {item.name}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

      <Text className="text-xl font-bold mt-6 mb-3">Polecane dla Ciebie</Text>
    </View>
  );

  // --- Główny komponent ---
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 4. Lista Polecanych Przepisów (Główna lista pionowa) */}
      <FlatList
        data={RECIPES}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader} // Tutaj wstrzykujemy całą górną sekcję
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          // To jest "RecipeCard"
          <TouchableOpacity
            className="mb-6 px-4" // Dodajemy padding poziomy tutaj, bo lista go nie ma
            onPress={() => {
              /* Nawigacja do ekranu szczegółów */
            }}
          >
            <View className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100">
              <Image source={{ uri: item.image }} className="w-full h-48" />

              {/* Tagi "Zdrowe" / "Tanie" na obrazku */}
              <View className="absolute top-3 left-3 flex-row">
                {item.isHealthy && (
                  <View className="bg-green-100 px-2 py-1 rounded-full mr-1.5 border border-green-300">
                    <Text className="text-green-800 text-xs font-bold">
                      Zdrowe
                    </Text>
                  </View>
                )}
                {item.isCheap && (
                  <View className="bg-yellow-100 px-2 py-1 rounded-full border border-yellow-300">
                    <Text className="text-yellow-800 text-xs font-bold">
                      Tanie
                    </Text>
                  </View>
                )}
              </View>

              {/* Zawartość karty (tekst) */}
              <View className="p-3">
                <Text className="text-lg font-bold text-gray-900 mb-1">
                  {item.title}
                </Text>
                {/* Statystyki przepisu */}
                <View className="flex-row justify-between items-center mt-1">
                  <Text className="text-sm text-gray-600">
                    Kalorie: <Text className="font-bold">{item.calories}</Text>
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Cena: <Text className="font-bold text-green-700">{item.price}</Text>
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