import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, BookOpen, FileText, Video, Download, Star, Clock, Filter } from 'lucide-react-native';

const libraryItems = [
  {
    id: 1,
    title: 'Quantum Physics Fundamentals',
    author: 'Dr. Sarah Chen',
    type: 'book',
    category: 'Physics',
    rating: 4.8,
    downloads: 15200,
    isPremium: false,
    duration: '6 hours read',
    thumbnail: '📚',
    description: 'Complete guide to quantum mechanics and its applications',
  },
  {
    id: 2,
    title: 'Advanced Calculus Course',
    author: 'Prof. Michael Rodriguez',
    type: 'video',
    category: 'Mathematics',
    rating: 4.9,
    downloads: 8900,
    isPremium: true,
    duration: '12 hours',
    thumbnail: '🎥',
    description: 'Master calculus with step-by-step video tutorials',
  },
  {
    id: 3,
    title: 'World War II Analysis',
    author: 'Dr. Emma Thompson',
    type: 'article',
    category: 'History',
    rating: 4.7,
    downloads: 6700,
    isPremium: false,
    duration: '45 min read',
    thumbnail: '📄',
    description: 'Comprehensive analysis of WWII events and consequences',
  },
  {
    id: 4,
    title: 'React Native Masterclass',
    author: 'Alex Johnson',
    type: 'course',
    category: 'Technology',
    rating: 4.9,
    downloads: 12800,
    isPremium: true,
    duration: '20 hours',
    thumbnail: '💻',
    description: 'Build mobile apps with React Native from scratch',
  },
  {
    id: 5,
    title: 'Spanish Grammar Guide',
    author: 'Maria Garcia',
    type: 'book',
    category: 'Languages',
    rating: 4.6,
    downloads: 9500,
    isPremium: false,
    duration: '4 hours read',
    thumbnail: '🌍',
    description: 'Complete Spanish grammar reference with examples',
  },
];

const categories = ['All', 'Books', 'Videos', 'Articles', 'Courses'];
const subjects = ['All', 'Physics', 'Mathematics', 'History', 'Technology', 'Languages'];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           (selectedCategory === 'Books' && item.type === 'book') ||
                           (selectedCategory === 'Videos' && item.type === 'video') ||
                           (selectedCategory === 'Articles' && item.type === 'article') ||
                           (selectedCategory === 'Courses' && item.type === 'course');
    const matchesSubject = selectedSubject === 'All' || item.category === selectedSubject;
    return matchesSearch && matchesCategory && matchesSubject;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookOpen color="#6366F1" size={16} />;
      case 'video': return <Video color="#F59E0B" size={16} />;
      case 'article': return <FileText color="#10B981" size={16} />;
      case 'course': return <Star color="#8B5CF6" size={16} />;
      default: return <BookOpen color="#6366F1" size={16} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>E-Library</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter color="#6B7280" size={20} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#6B7280" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, videos, articles..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Content Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  selectedCategory === category && styles.filterChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.filterText,
                  selectedCategory === category && styles.filterTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Subject</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.filterChip,
                  selectedSubject === subject && styles.filterChipActive
                ]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text style={[
                  styles.filterText,
                  selectedSubject === subject && styles.filterTextActive
                ]}>
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Library Items */}
      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <View style={styles.itemThumbnail}>
                <Text style={styles.thumbnailEmoji}>{item.thumbnail}</Text>
              </View>
              <View style={styles.itemInfo}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Star color="#F59E0B" size={12} />
                    </View>
                  )}
                </View>
                <Text style={styles.itemAuthor}>by {item.author}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                
                <View style={styles.itemMeta}>
                  <View style={styles.metaItem}>
                    {getTypeIcon(item.type)}
                    <Text style={styles.metaText}>{item.type}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock color="#6B7280" size={14} />
                    <Text style={styles.metaText}>{item.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Star color="#F59E0B" size={14} />
                    <Text style={styles.metaText}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.itemFooter}>
              <View style={styles.itemStats}>
                <Download color="#6B7280" size={14} />
                <Text style={styles.statsText}>{item.downloads.toLocaleString()} downloads</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Download color="#6366F1" size={16} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                  <Text style={styles.primaryActionText}>
                    {item.isPremium ? 'Buy' : 'Read'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* My Library Section */}
      <View style={styles.myLibrarySection}>
        <TouchableOpacity style={styles.myLibraryButton}>
          <BookOpen color="#6366F1" size={20} />
          <Text style={styles.myLibraryText}>My Library</Text>
        </TouchableOpacity>
      </View>
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
  filterButton: {
    padding: 8,
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
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  filterRow: {
    marginBottom: 8,
  },
  filterChip: {
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: '#6366F1',
  },
  filterText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  itemsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
  },
  itemThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailEmoji: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    padding: 4,
    marginLeft: 8,
  },
  itemAuthor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  itemStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  primaryAction: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  myLibrarySection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
  },
  myLibraryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    borderRadius: 12,
  },
  myLibraryText: {
    color: '#6366F1',
    fontWeight: '600',
    marginLeft: 8,
  },
});