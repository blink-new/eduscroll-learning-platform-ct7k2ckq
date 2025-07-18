import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { VideoPlayer } from '@/components/VideoPlayer';
import { VideoOverlay } from '@/components/VideoOverlay';

const { height: screenHeight } = Dimensions.get('window');

// Mock educational video data
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
    duration: '2:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Explore the fascinating world of black holes and how they bend space-time itself. Learn about event horizons, singularities, and what happens when matter gets too close.',
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
    duration: '3:12',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Discover how a small Italian city-state became the most powerful empire in the ancient world. From the Roman Republic to the Caesars.',
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
    duration: '4:20',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Understanding derivatives and integrals has never been easier! Learn the fundamentals of calculus with visual examples and real-world applications.',
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
    duration: '3:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Step by step breakdown of how DNA replicates itself. Learn about helicases, polymerases, and the leading and lagging strands.',
  },
];

export default function VideoFeed() {
  const [videos, setVideos] = useState(mockVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    position: 'relative',
  },
});