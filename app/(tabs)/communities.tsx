import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, Users, MessageCircle, Calendar, Star } from 'lucide-react-native';

const communities = [
  {
    id: 1,
    name: 'Physics Masters',
    description: 'Advanced physics discussions and problem solving',
    members: 12500,
    category: 'Science',
    isJoined: true,
    avatar: '🔬',
    lastActivity: '2 hours ago',
    posts: 245,
  },
  {
    id: 2,
    name: 'Math Wizards',
    description: 'From algebra to calculus, we solve it all',
    members: 8900,
    category: 'Mathematics',
    isJoined: false,
    avatar: '📐',
    lastActivity: '1 hour ago',
    posts: 189,
  },
  {
    id: 3,
    name: 'History Buffs',
    description: 'Exploring the past to understand the present',
    members: 6700,
    category: 'History',
    isJoined: true,
    avatar: '🏛️',
    lastActivity: '30 minutes ago',
    posts: 156,
  },
  {
    id: 4,
    name: 'Code Academy',
    description: 'Programming tutorials and coding challenges',
    members: 15200,
    category: 'Technology',
    isJoined: false,
    avatar: '💻',
    lastActivity: '15 minutes ago',
    posts: 342,
  },
  {
    id: 5,
    name: 'Language Exchange',
    description: 'Practice languages with native speakers',
    members: 9800,
    category: 'Languages',
    isJoined: true,
    avatar: '🌍',
    lastActivity: '5 minutes ago',
    posts: 278,
  },
];

const categories = ['All', 'Science', 'Mathematics', 'History', 'Technology', 'Languages', 'Arts'];

export default function Communities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Communities</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus color="#FFFFFF" size={20} />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#6B7280" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search communities..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Communities List */}
      <ScrollView style={styles.communitiesList} showsVerticalScrollIndicator={false}>
        {filteredCommunities.map((community) => (
          <TouchableOpacity key={community.id} style={styles.communityCard}>
            <View style={styles.communityHeader}>
              <View style={styles.communityAvatar}>
                <Text style={styles.avatarEmoji}>{community.avatar}</Text>
              </View>
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{community.name}</Text>
                <Text style={styles.communityDescription}>{community.description}</Text>
                <View style={styles.communityStats}>
                  <View style={styles.statItem}>
                    <Users color="#6B7280" size={14} />
                    <Text style={styles.statText}>{community.members.toLocaleString()}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <MessageCircle color="#6B7280" size={14} />
                    <Text style={styles.statText}>{community.posts}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.joinButton,
                  community.isJoined && styles.joinedButton
                ]}
              >
                <Text style={[
                  styles.joinButtonText,
                  community.isJoined && styles.joinedButtonText
                ]}>
                  {community.isJoined ? 'Joined' : 'Join'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.communityFooter}>
              <Text style={styles.categoryTag}>{community.category}</Text>
              <Text style={styles.lastActivity}>Active {community.lastActivity}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus color="#FFFFFF" size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryChipActive: {
    backgroundColor: '#6366F1',
  },
  categoryText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  communitiesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  communityCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  communityAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  communityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  communityDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  communityStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinedButton: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  joinedButtonText: {
    color: '#6366F1',
  },
  communityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  categoryTag: {
    backgroundColor: '#F59E0B',
    color: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 10,
    fontWeight: '600',
  },
  lastActivity: {
    color: '#6B7280',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});