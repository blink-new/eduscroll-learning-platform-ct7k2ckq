import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { 
  Users, 
  Award, 
  BookOpen, 
  TrendingUp, 
  MessageCircle, 
  UserPlus,
  Settings,
  Share,
  Calendar,
  Target
} from 'lucide-react-native';

interface SocialProfileProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    role: string;
    level: string;
    bio: string;
    location: string;
    joinedDate: string;
    stats: {
      followers: number;
      following: number;
      posts: number;
      likes: number;
    };
    subjects: string[];
    achievements: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      date: string;
    }>;
    recentPosts: Array<{
      id: string;
      content: string;
      likes: number;
      comments: number;
      timestamp: string;
    }>;
  };
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

export function SocialProfile({ 
  user, 
  isOwnProfile = false, 
  isFollowing = false, 
  onFollow, 
  onMessage 
}: SocialProfileProps) {
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: 'Posts', count: user.stats.posts },
    { id: 'achievements', label: 'Achievements', count: user.achievements.length },
    { id: 'subjects', label: 'Subjects', count: user.subjects.length }
  ];

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.posts}</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.followers.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.following.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user.stats.likes.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Likes</Text>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtons}>
      {isOwnProfile ? (
        <>
          <TouchableOpacity style={styles.editButton}>
            <Settings color="#FFFFFF" size={16} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Share color="#6366F1" size={16} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity 
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={onFollow}
          >
            <UserPlus color={isFollowing ? "#6366F1" : "#FFFFFF"} size={16} />
            <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton} onPress={onMessage}>
            <MessageCircle color="#FFFFFF" size={16} />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Share color="#6366F1" size={16} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const renderSubjects = () => (
    <View style={styles.subjectsContainer}>
      <Text style={styles.sectionTitle}>Subjects of Interest</Text>
      <View style={styles.subjectsGrid}>
        {user.subjects.map((subject, index) => (
          <View key={index} style={styles.subjectChip}>
            <Text style={styles.subjectText}>{subject}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      <Text style={styles.sectionTitle}>Recent Achievements</Text>
      {user.achievements.map((achievement) => (
        <View key={achievement.id} style={styles.achievementCard}>
          <View style={styles.achievementIcon}>
            <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
          </View>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
            <Text style={styles.achievementDate}>{achievement.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRecentPosts = () => (
    <View style={styles.postsContainer}>
      <Text style={styles.sectionTitle}>Recent Posts</Text>
      {user.recentPosts.map((post) => (
        <TouchableOpacity key={post.id} style={styles.postCard}>
          <Text style={styles.postContent} numberOfLines={3}>
            {post.content}
          </Text>
          <View style={styles.postStats}>
            <View style={styles.postStat}>
              <TrendingUp color="#6B7280" size={14} />
              <Text style={styles.postStatText}>{post.likes}</Text>
            </View>
            <View style={styles.postStat}>
              <MessageCircle color="#6B7280" size={14} />
              <Text style={styles.postStatText}>{post.comments}</Text>
            </View>
            <Text style={styles.postTimestamp}>{post.timestamp}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return renderRecentPosts();
      case 'achievements':
        return renderAchievements();
      case 'subjects':
        return renderSubjects();
      default:
        return renderRecentPosts();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{user.name}</Text>
              {user.verified && (
                <View style={styles.verifiedBadge}>
                  <Award color="#F59E0B" size={16} />
                </View>
              )}
            </View>
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.role}>{user.role} • {user.level}</Text>
          </View>
        </View>

        <Text style={styles.bio}>{user.bio}</Text>
        
        <View style={styles.metaInfo}>
          <Text style={styles.metaText}>📍 {user.location}</Text>
          <Text style={styles.metaText}>📅 Joined {user.joinedDate}</Text>
        </View>

        {renderStats()}
        {renderActionButtons()}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
            <Text style={[styles.tabCount, activeTab === tab.id && styles.activeTabCount]}>
              {tab.count}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  username: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bio: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 12,
  },
  metaInfo: {
    marginBottom: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  followButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 12,
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  followingButtonText: {
    color: '#6366F1',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  shareButton: {
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#6366F1',
  },
  tabText: {
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 2,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabCount: {
    color: '#6B7280',
    fontSize: 12,
  },
  activeTabCount: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  subjectsContainer: {
    marginBottom: 20,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
  },
  subjectChip: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  subjectText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  postsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: '#1F1F1F',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  postContent: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  postStatText: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  postTimestamp: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 'auto',
  },
});