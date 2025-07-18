import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brain, Search, MessageCircle, Zap } from 'lucide-react-native';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoOverlay } from '@/components/VideoOverlay';

const { height: screenHeight } = Dimensions.get('window');

// Enhanced mock educational video data with AI personalization
const mockVideos = [
  {
    id: '1',
    title: 'The Science of Black Holes',
    creator: 'Dr. Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    likes: 12500,
    isLiked: false,
    isSaved: false,
    category: 'Physics',
    difficulty: 'Advanced',
    duration: '2:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Explore the fascinating world of black holes and how they bend space-time itself. Learn about event horizons, singularities, and what happens when matter gets too close.',
    aiRecommended: true,
    matchScore: 95,
  },
  {
    id: '2',
    title: 'Ancient Rome: Rise of an Empire',
    creator: 'Prof. Marcus History',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    likes: 8900,
    isLiked: true,
    isSaved: false,
    category: 'History',
    difficulty: 'Intermediate',
    duration: '3:12',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Discover how a small Italian city-state became the most powerful empire in the ancient world. From the Roman Republic to the Caesars.',
    aiRecommended: false,
    matchScore: 78,
  },
  {
    id: '3',
    title: 'Calculus Made Simple',
    creator: 'Math Wizard',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    likes: 15600,
    isLiked: false,
    isSaved: true,
    category: 'Mathematics',
    difficulty: 'Beginner',
    duration: '4:20',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Understanding derivatives and integrals has never been easier! Learn the fundamentals of calculus with visual examples and real-world applications.',
    aiRecommended: true,
    matchScore: 92,
  },
  {
    id: '4',
    title: 'DNA Replication Explained',
    creator: 'Bio Teacher',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    likes: 9800,
    isLiked: false,
    isSaved: false,
    category: 'Biology',
    difficulty: 'Intermediate',
    duration: '3:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Step by step breakdown of how DNA replicates itself. Learn about helicases, polymerases, and the leading and lagging strands.',
    aiRecommended: true,
    matchScore: 88,
  },
  {
    id: '5',
    title: 'Spanish Conversation Basics',
    creator: 'Maria Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    likes: 7200,
    isLiked: false,
    isSaved: false,
    category: 'Languages',
    difficulty: 'Beginner',
    duration: '2:30',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Learn essential Spanish phrases for everyday conversations. Perfect for beginners starting their language learning journey.',
    aiRecommended: false,
    matchScore: 65,
  },
];

export default function VideoFeed() {
  const [videos, setVideos] = useState(mockVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const handleLike = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            isLiked: !video.isLiked,
            likes: video.isLiked ? video.likes - 1 : video.likes + 1
          }
        : video
    ));
  };

  const handleSave = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, isSaved: !video.isSaved }
        : video
    ));
  };

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderVideo = ({ item, index }: { item: any; index: number }) => {
    const isActive = index === currentIndex;
    
    return (
      <View style={[styles.videoContainer, { height: screenHeight }]}>
        <VideoPlayer
          videoUrl={item.videoUrl}
          isActive={isActive}
          poster={item.avatar}
        />
        <VideoOverlay
          video={item}
          onLike={() => handleLike(item.id)}
          onSave={() => handleSave(item.id)}
        />
        
        {/* AI Recommendation Badge */}
        {item.aiRecommended && (
          <View style={styles.aiRecommendationBadge}>
            <Brain color="#F59E0B" size={16} />
            <Text style={styles.aiRecommendationText}>AI Recommended</Text>
            <View style={styles.matchScore}>
              <Text style={styles.matchScoreText}>{item.matchScore}%</Text>
            </View>
          </View>
        )}
        
        {/* Difficulty Badge */}
        <View style={[styles.difficultyBadge, {
          backgroundColor: item.difficulty === 'Beginner' ? '#10B981' : 
                          item.difficulty === 'Intermediate' ? '#F59E0B' : '#EF4444'
        }]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Floating Header */}
      {showHeader && (
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.logo}>Zeuph</Text>
              <View style={styles.aiIndicator}>
                <Zap color="#F59E0B" size={16} />
                <Text style={styles.aiIndicatorText}>AI Powered</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerButton}>
                <Search color="#FFFFFF" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <MessageCircle color="#FFFFFF" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.aiTutorButton}>
                <Brain color="#FFFFFF" size={18} />
                <Text style={styles.aiTutorText}>AI Tutor</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}

      <FlatList
        ref={flatListRef}
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          setShowHeader(offsetY < 50);
        }}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiIndicatorText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  aiTutorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  aiTutorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  videoContainer: {
    position: 'relative',
  },
  aiRecommendationBadge: {
    position: 'absolute',
    top: 100,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  aiRecommendationText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 8,
  },
  matchScore: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  matchScoreText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 140,
    left: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});