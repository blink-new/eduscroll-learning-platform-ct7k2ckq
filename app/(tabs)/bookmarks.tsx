import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Play, Clock, BookOpen } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 2 columns with padding

const savedVideos = [
  {
    id: '1',
    title: 'The Science of Black Holes',
    creator: 'Dr. Sarah Chen',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop',
    duration: '2:45',
    category: 'Physics',
    savedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Calculus Made Simple',
    creator: 'Math Wizard',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop',
    duration: '4:20',
    category: 'Mathematics',
    savedAt: '1 week ago',
  },
  {
    id: '3',
    title: 'DNA Replication Explained',
    creator: 'Bio Teacher',
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop',
    duration: '3:45',
    category: 'Biology',
    savedAt: '3 days ago',
  },
  {
    id: '4',
    title: 'Ancient Rome: Rise of an Empire',
    creator: 'Prof. Marcus History',
    thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=600&fit=crop',
    duration: '3:12',
    category: 'History',
    savedAt: '5 days ago',
  },
  {
    id: '5',
    title: 'Quantum Mechanics Basics',
    creator: 'Dr. Sarah Chen',
    thumbnail: 'https://images.unsplash.com/photo-1635070041409-e63e783d0e85?w=400&h=600&fit=crop',
    duration: '5:30',
    category: 'Physics',
    savedAt: '1 day ago',
  },
  {
    id: '6',
    title: 'Shakespeare\'s Hidden Messages',
    creator: 'Literature Prof',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    duration: '6:15',
    category: 'Literature',
    savedAt: '4 days ago',
  },
];

const categories = ['All', 'Physics', 'Mathematics', 'Biology', 'History', 'Literature'];

export default function Bookmarks() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All' 
    ? savedVideos 
    : savedVideos.filter(video => video.category === selectedCategory);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-white text-2xl font-bold mb-2">Saved Videos</Text>
          <Text className="text-gray-400 text-sm">{savedVideos.length} videos saved</Text>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 mb-4"
          contentContainerStyle={{ paddingRight: 16 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-3 px-4 py-2 rounded-full ${
                selectedCategory === category 
                  ? 'bg-primary' 
                  : 'bg-gray-800'
              }`}
            >
              <Text className={`font-medium ${
                selectedCategory === category 
                  ? 'text-white' 
                  : 'text-gray-300'
              }`}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Videos Grid */}
        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between">
            {filteredVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                className="mb-6"
                style={{ width: itemWidth }}
              >
                {/* Thumbnail */}
                <View className="relative rounded-xl overflow-hidden mb-3">
                  <Image
                    source={{ uri: video.thumbnail }}
                    style={{ width: itemWidth, height: itemWidth * 1.4 }}
                    className="bg-gray-800"
                  />
                  
                  {/* Play Button Overlay */}
                  <View className="absolute inset-0 bg-black/30 justify-center items-center">
                    <View className="bg-black/50 rounded-full p-3">
                      <Play color="white" size={24} fill="white" />
                    </View>
                  </View>

                  {/* Duration */}
                  <View className="absolute bottom-2 right-2 bg-black/70 rounded px-2 py-1">
                    <Text className="text-white text-xs font-medium">{video.duration}</Text>
                  </View>

                  {/* Category Tag */}
                  <View className="absolute top-2 left-2 bg-primary rounded px-2 py-1">
                    <Text className="text-white text-xs font-medium">{video.category}</Text>
                  </View>
                </View>

                {/* Video Info */}
                <Text className="text-white font-semibold text-sm mb-1" numberOfLines={2}>
                  {video.title}
                </Text>
                <Text className="text-gray-400 text-xs mb-1">{video.creator}</Text>
                <View className="flex-row items-center">
                  <Clock color="#6B7280" size={12} />
                  <Text className="text-gray-400 text-xs ml-1">{video.savedAt}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <View className="flex-1 justify-center items-center py-20">
              <BookOpen color="#6B7280" size={48} />
              <Text className="text-gray-400 text-lg font-medium mt-4 mb-2">
                No saved videos
              </Text>
              <Text className="text-gray-500 text-center">
                Videos you save will appear here for easy access
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}