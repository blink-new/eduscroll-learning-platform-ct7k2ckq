import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Search as SearchIcon, TrendingUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: '1', name: 'Mathematics', color: '#3B82F6', icon: '📐' },
  { id: '2', name: 'Physics', color: '#8B5CF6', icon: '⚛️' },
  { id: '3', name: 'Chemistry', color: '#10B981', icon: '🧪' },
  { id: '4', name: 'Biology', color: '#F59E0B', icon: '🧬' },
  { id: '5', name: 'History', color: '#EF4444', icon: '🏛️' },
  { id: '6', name: 'Literature', color: '#EC4899', icon: '📚' },
  { id: '7', name: 'Computer Science', color: '#6366F1', icon: '💻' },
  { id: '8', name: 'Art', color: '#F97316', icon: '🎨' },
];

const trendingTopics = [
  'Quantum Physics',
  'Ancient Civilizations',
  'Machine Learning',
  'Climate Change',
  'Space Exploration',
  'Genetic Engineering',
];

const popularCreators = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    subject: 'Physics',
    followers: '2.1M',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Prof. Marcus History',
    subject: 'History',
    followers: '1.8M',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Math Wizard',
    subject: 'Mathematics',
    followers: '3.2M',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Discover</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchIcon 
            color="#6B7280" 
            size={20} 
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search topics, creators, subjects..."
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.categoryItem, { backgroundColor: category.color + '20' }]}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Trending Topics */}
          <View style={styles.section}>
            <View style={styles.trendingHeader}>
              <TrendingUp color="#F59E0B" size={20} />
              <Text style={styles.sectionTitle}>Trending</Text>
            </View>
            <View>
              {trendingTopics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.trendingItem}
                >
                  <Text style={styles.trendingText}>{topic}</Text>
                  <Text style={styles.trendingNumber}>#{index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Popular Creators */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Creators</Text>
            <View>
              {popularCreators.map((creator) => (
                <TouchableOpacity
                  key={creator.id}
                  style={styles.creatorItem}
                >
                  <Image
                    source={{ uri: creator.avatar }}
                    style={styles.creatorAvatar}
                  />
                  <View style={styles.creatorInfo}>
                    <Text style={styles.creatorName}>{creator.name}</Text>
                    <Text style={styles.creatorSubject}>{creator.subject}</Text>
                  </View>
                  <View style={styles.creatorStats}>
                    <Text style={styles.creatorFollowers}>{creator.followers}</Text>
                    <Text style={styles.creatorFollowersLabel}>followers</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 24,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#1F2937',
    color: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryItem: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryText: {
    color: 'white',
    fontWeight: '500',
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendingItem: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  trendingText: {
    color: 'white',
    fontWeight: '500',
  },
  trendingNumber: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  creatorItem: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  creatorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    color: 'white',
    fontWeight: '600',
  },
  creatorSubject: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  creatorStats: {
    alignItems: 'flex-end',
  },
  creatorFollowers: {
    color: 'white',
    fontWeight: '500',
  },
  creatorFollowersLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});