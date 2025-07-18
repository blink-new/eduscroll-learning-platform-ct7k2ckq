import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Plus, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal, 
  Search,
  Camera,
  Video,
  FileText,
  Award,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

// Mock social posts data
const socialPosts = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Sarah Chen',
      username: '@sarahchen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      verified: true,
      role: 'Physics Student',
      level: 'Advanced'
    },
    content: {
      type: 'study_note',
      text: 'Just solved this complex quantum mechanics problem! The key insight was understanding wave-particle duality. Here\'s my step-by-step breakdown 🧠✨',
      images: ['https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'],
      subject: 'Quantum Physics',
      difficulty: 'Advanced'
    },
    engagement: {
      likes: 234,
      comments: 45,
      shares: 12,
      bookmarks: 67,
      isLiked: false,
      isBookmarked: true
    },
    timestamp: '2 hours ago',
    trending: true
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Marcus Rodriguez',
      username: '@mathwiz',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      verified: false,
      role: 'Math Tutor',
      level: 'Expert'
    },
    content: {
      type: 'video_explanation',
      text: 'Quick calculus tip: Remember the chain rule with this simple mnemonic! 📐 Who else struggles with derivatives?',
      videoThumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
      subject: 'Calculus',
      difficulty: 'Intermediate',
      duration: '2:34'
    },
    engagement: {
      likes: 189,
      comments: 32,
      shares: 28,
      bookmarks: 45,
      isLiked: true,
      isBookmarked: false
    },
    timestamp: '4 hours ago',
    trending: false
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Emma Thompson',
      username: '@historybuff',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: true,
      role: 'History Teacher',
      level: 'Expert'
    },
    content: {
      type: 'study_group',
      text: 'Starting a study group for Ancient Rome! We\'ll meet virtually every Tuesday. Who\'s interested? 🏛️',
      subject: 'Ancient History',
      difficulty: 'Beginner',
      groupSize: 8,
      maxSize: 15
    },
    engagement: {
      likes: 156,
      comments: 67,
      shares: 15,
      bookmarks: 23,
      isLiked: false,
      isBookmarked: false
    },
    timestamp: '6 hours ago',
    trending: false
  },
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'Alex Kim',
      username: '@codemaster',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: false,
      role: 'CS Student',
      level: 'Intermediate'
    },
    content: {
      type: 'achievement',
      text: 'Just completed my first machine learning project! 🎉 Built a model that predicts student performance. Thanks to everyone who helped!',
      images: ['https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop'],
      subject: 'Computer Science',
      difficulty: 'Advanced',
      achievement: 'ML Project Complete'
    },
    engagement: {
      likes: 312,
      comments: 89,
      shares: 34,
      bookmarks: 78,
      isLiked: true,
      isBookmarked: true
    },
    timestamp: '1 day ago',
    trending: true
  }
];

const trendingTopics = [
  { name: 'Quantum Physics', posts: 1234, growth: '+15%' },
  { name: 'Machine Learning', posts: 2156, growth: '+23%' },
  { name: 'Calculus Tips', posts: 987, growth: '+8%' },
  { name: 'Study Groups', posts: 654, growth: '+12%' }
];

export default function Social() {
  const [posts, setPosts] = useState(socialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Following', 'Trending', 'Study Groups', 'Achievements'];

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            engagement: {
              ...post.engagement,
              isLiked: !post.engagement.isLiked,
              likes: post.engagement.isLiked 
                ? post.engagement.likes - 1 
                : post.engagement.likes + 1
            }
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            engagement: {
              ...post.engagement,
              isBookmarked: !post.engagement.isBookmarked,
              bookmarks: post.engagement.isBookmarked 
                ? post.engagement.bookmarks - 1 
                : post.engagement.bookmarks + 1
            }
          }
        : post
    ));
  };

  const renderPost = (post: any) => {
    return (
      <View key={post.id} style={styles.postCard}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
            <View style={styles.userDetails}>
              <View style={styles.userNameRow}>
                <Text style={styles.userName}>{post.user.name}</Text>
                {post.user.verified && (
                  <View style={styles.verifiedBadge}>
                    <Award color="#F59E0B" size={12} />
                  </View>
                )}
                {post.trending && (
                  <View style={styles.trendingBadge}>
                    <TrendingUp color="#EF4444" size={12} />
                  </View>
                )}
              </View>
              <Text style={styles.userRole}>{post.user.role} • {post.user.level}</Text>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postText}>{post.content.text}</Text>
          
          {/* Subject and Difficulty Tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.subjectTag}>
              <Text style={styles.subjectTagText}>{post.content.subject}</Text>
            </View>
            <View style={[styles.difficultyTag, {
              backgroundColor: post.content.difficulty === 'Beginner' ? '#10B981' : 
                              post.content.difficulty === 'Intermediate' ? '#F59E0B' : '#EF4444'
            }]}>
              <Text style={styles.difficultyTagText}>{post.content.difficulty}</Text>
            </View>
          </View>

          {/* Content Type Specific Elements */}
          {post.content.type === 'video_explanation' && post.content.videoThumbnail && (
            <View style={styles.videoContainer}>
              <Image source={{ uri: post.content.videoThumbnail }} style={styles.videoThumbnail} />
              <View style={styles.playOverlay}>
                <Video color="#FFFFFF" size={32} />
              </View>
              <View style={styles.videoDuration}>
                <Text style={styles.videoDurationText}>{post.content.duration}</Text>
              </View>
            </View>
          )}

          {post.content.images && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesContainer}>
              {post.content.images.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.postImage} />
              ))}
            </ScrollView>
          )}

          {post.content.type === 'study_group' && (
            <View style={styles.studyGroupInfo}>
              <View style={styles.studyGroupStats}>
                <Users color="#6366F1" size={16} />
                <Text style={styles.studyGroupText}>
                  {post.content.groupSize}/{post.content.maxSize} members
                </Text>
              </View>
              <TouchableOpacity style={styles.joinGroupButton}>
                <Text style={styles.joinGroupButtonText}>Join Group</Text>
              </TouchableOpacity>
            </View>
          )}

          {post.content.type === 'achievement' && post.content.achievement && (
            <View style={styles.achievementBadge}>
              <Award color="#F59E0B" size={16} />
              <Text style={styles.achievementText}>{post.content.achievement}</Text>
            </View>
          )}
        </View>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(post.id)}
          >
            <Heart 
              color={post.engagement.isLiked ? "#EF4444" : "#6B7280"} 
              size={20}
              fill={post.engagement.isLiked ? "#EF4444" : "none"}
            />
            <Text style={[styles.actionText, post.engagement.isLiked && styles.actionTextActive]}>
              {post.engagement.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle color="#6B7280" size={20} />
            <Text style={styles.actionText}>{post.engagement.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Share color="#6B7280" size={20} />
            <Text style={styles.actionText}>{post.engagement.shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleBookmark(post.id)}
          >
            <Bookmark 
              color={post.engagement.isBookmarked ? "#F59E0B" : "#6B7280"} 
              size={20}
              fill={post.engagement.isBookmarked ? "#F59E0B" : "none"}
            />
            <Text style={[styles.actionText, post.engagement.isBookmarked && styles.actionTextActive]}>
              {post.engagement.bookmarks}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>EduSocial</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Search color="#FFFFFF" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.createPostButton}>
            <Plus color="#FFFFFF" size={18} />
            <Text style={styles.createPostText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#6B7280" size={18} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search educational content..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Trending Topics */}
      <View style={styles.trendingSection}>
        <Text style={styles.sectionTitle}>Trending Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trendingTopics.map((topic, index) => (
            <TouchableOpacity key={index} style={styles.trendingCard}>
              <Text style={styles.trendingTopic}>{topic.name}</Text>
              <Text style={styles.trendingStats}>{topic.posts} posts</Text>
              <Text style={styles.trendingGrowth}>{topic.growth}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.filterChipActive
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.filterTextActive
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Posts Feed */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {posts.map(renderPost)}
      </ScrollView>

      {/* Floating Create Button */}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createPostText: {
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
  trendingSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  trendingCard: {
    backgroundColor: '#1F1F1F',
    padding: 12,
    borderRadius: 12,
    marginLeft: 20,
    minWidth: 120,
  },
  trendingTopic: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  trendingStats: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 2,
  },
  trendingGrowth: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
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
  feed: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#1F1F1F',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 6,
  },
  verifiedBadge: {
    marginRight: 6,
  },
  trendingBadge: {
    marginRight: 6,
  },
  userRole: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  subjectTag: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  subjectTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyTagText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  videoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 8,
  },
  videoDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDurationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  imagesContainer: {
    marginBottom: 12,
  },
  postImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 8,
  },
  studyGroupInfo: {
    backgroundColor: '#2D2D2D',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studyGroupStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studyGroupText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  joinGroupButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  joinGroupButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  achievementText: {
    color: '#F59E0B',
    marginLeft: 8,
    fontWeight: '600',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    color: '#6B7280',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  actionTextActive: {
    color: '#6366F1',
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