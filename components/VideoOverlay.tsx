import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Heart, Bookmark, Share, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface VideoOverlayProps {
  video: {
    id: string;
    title: string;
    creator: string;
    avatar: string;
    likes: number;
    isLiked: boolean;
    isSaved: boolean;
    category: string;
    duration: string;
    description: string;
  };
  onLike: () => void;
  onSave: () => void;
}

export function VideoOverlay({ video, onLike, onSave }: VideoOverlayProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      
      {/* Right side action buttons */}
      <View style={styles.actionsContainer} pointerEvents="auto">
        {/* Creator Avatar */}
        <TouchableOpacity style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: video.avatar }}
              style={styles.avatar}
            />
            <View style={styles.followButton}>
              <Text style={styles.followText}>+</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Like Button */}
        <TouchableOpacity
          onPress={onLike}
          style={styles.actionButton}
        >
          <View style={styles.actionIconContainer}>
            <Heart
              color={video.isLiked ? '#EF4444' : 'white'}
              size={28}
              fill={video.isLiked ? '#EF4444' : 'transparent'}
            />
          </View>
          <Text style={styles.actionText}>
            {formatNumber(video.likes)}
          </Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <MessageCircle color="white" size={28} />
          </View>
          <Text style={styles.actionText}>124</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity
          onPress={onSave}
          style={styles.actionButton}
        >
          <View style={styles.actionIconContainer}>
            <Bookmark
              color={video.isSaved ? '#F59E0B' : 'white'}
              size={28}
              fill={video.isSaved ? '#F59E0B' : 'transparent'}
            />
          </View>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Share color="white" size={28} />
          </View>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom content */}
      <View style={styles.contentContainer} pointerEvents="auto">
        {/* Category Tag */}
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{video.category}</Text>
        </View>

        {/* Creator Name */}
        <TouchableOpacity style={styles.creatorContainer}>
          <Text style={styles.creatorText}>@{video.creator}</Text>
        </TouchableOpacity>

        {/* Video Title */}
        <Text style={styles.titleText}>
          {video.title}
        </Text>

        {/* Description */}
        <Text style={styles.descriptionText} numberOfLines={3}>
          {video.description}
        </Text>

        {/* Duration */}
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  actionsContainer: {
    position: 'absolute',
    right: 16,
    bottom: 128,
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'white',
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  actionIconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 50,
    padding: 12,
    marginBottom: 4,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 80,
  },
  categoryTag: {
    backgroundColor: '#6366F1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  creatorContainer: {
    marginBottom: 8,
  },
  creatorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  descriptionText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  durationContainer: {
    marginTop: 12,
  },
  durationText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
});