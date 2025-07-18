import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Settings, 
  Trophy, 
  BookOpen, 
  Clock, 
  Star, 
  Award, 
  Target, 
  TrendingUp,
  Users,
  Brain,
  Crown,
  Calendar,
  Download
} from 'lucide-react-native';

const userProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@email.com',
  role: 'Student',
  age: 16,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  level: 12,
  xp: 8450,
  xpToNext: 1550,
  streak: 15,
  joinDate: '2024-01-15',
  country: 'USA',
  learningGoal: 'Master Advanced Physics',
  knowledgeLevel: 'Intermediate',
};

const stats = [
  { label: 'Videos Watched', value: '342', icon: BookOpen, color: '#6366F1' },
  { label: 'Hours Learned', value: '127', icon: Clock, color: '#10B981' },
  { label: 'Competitions Won', value: '8', icon: Trophy, color: '#F59E0B' },
  { label: 'Communities', value: '12', icon: Users, color: '#8B5CF6' },
];

const achievements = [
  { id: 1, title: 'First Steps', description: 'Completed your first video', icon: '🎯', earned: true },
  { id: 2, title: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: true },
  { id: 3, title: 'Quiz Master', description: 'Scored 100% on 5 quizzes', icon: '🧠', earned: true },
  { id: 4, title: 'Community Leader', description: 'Created your first community', icon: '👥', earned: false },
  { id: 5, title: 'Competition Champion', description: 'Won your first competition', icon: '🏆', earned: true },
  { id: 6, title: 'Knowledge Seeker', description: 'Watched 100 videos', icon: '📚', earned: true },
];

const recentActivity = [
  { id: 1, type: 'video', title: 'Quantum Physics Basics', time: '2 hours ago', category: 'Physics' },
  { id: 2, type: 'competition', title: 'Math Championship', time: '1 day ago', category: 'Mathematics' },
  { id: 3, type: 'community', title: 'Joined Physics Masters', time: '2 days ago', category: 'Physics' },
  { id: 4, type: 'achievement', title: 'Earned Quiz Master badge', time: '3 days ago', category: 'Achievement' },
];

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const tabs = ['Overview', 'Achievements', 'Activity', 'Settings'];

  const progressPercentage = (userProfile.xp / (userProfile.xp + userProfile.xpToNext)) * 100;

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.userHeader}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <View style={styles.userRole}>
              <User color="#6366F1" size={16} />
              <Text style={styles.roleText}>{userProfile.role}</Text>
              <Text style={styles.ageText}>• Age {userProfile.age}</Text>
            </View>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>

        {/* Level Progress */}
        <View style={styles.levelSection}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelText}>Level {userProfile.level}</Text>
            <Text style={styles.xpText}>{userProfile.xp} / {userProfile.xp + userProfile.xpToNext} XP</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>

        {/* Learning Streak */}
        <View style={styles.streakSection}>
          <View style={styles.streakItem}>
            <View style={styles.streakIcon}>
              <Text style={styles.streakEmoji}>🔥</Text>
            </View>
            <View>
              <Text style={styles.streakNumber}>{userProfile.streak}</Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </View>
          </View>
          <View style={styles.streakItem}>
            <View style={styles.streakIcon}>
              <Brain color="#6366F1" size={20} />
            </View>
            <View>
              <Text style={styles.streakNumber}>{userProfile.knowledgeLevel}</Text>
              <Text style={styles.streakLabel}>Knowledge Level</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
              <stat.icon color={stat.color} size={20} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Learning Goal */}
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Target color="#F59E0B" size={20} />
          <Text style={styles.goalTitle}>Current Learning Goal</Text>
        </View>
        <Text style={styles.goalText}>{userProfile.learningGoal}</Text>
        <View style={styles.goalProgress}>
          <View style={styles.goalProgressBar}>
            <View style={[styles.goalProgressFill, { width: '68%' }]} />
          </View>
          <Text style={styles.goalProgressText}>68% Complete</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderAchievements = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <View 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              !achievement.earned && styles.achievementCardLocked
            ]}
          >
            <View style={styles.achievementIcon}>
              <Text style={[
                styles.achievementEmoji,
                !achievement.earned && styles.achievementEmojiLocked
              ]}>
                {achievement.earned ? achievement.icon : '🔒'}
              </Text>
            </View>
            <Text style={[
              styles.achievementTitle,
              !achievement.earned && styles.achievementTitleLocked
            ]}>
              {achievement.title}
            </Text>
            <Text style={[
              styles.achievementDescription,
              !achievement.earned && styles.achievementDescriptionLocked
            ]}>
              {achievement.description}
            </Text>
            {achievement.earned && (
              <View style={styles.earnedBadge}>
                <Award color="#F59E0B" size={12} />
                <Text style={styles.earnedText}>Earned</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderActivity = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {recentActivity.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={styles.activityIcon}>
            {activity.type === 'video' && <BookOpen color="#6366F1" size={16} />}
            {activity.type === 'competition' && <Trophy color="#F59E0B" size={16} />}
            {activity.type === 'community' && <Users color="#8B5CF6" size={16} />}
            {activity.type === 'achievement' && <Award color="#10B981" size={16} />}
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <View style={styles.activityMeta}>
              <Text style={styles.activityCategory}>{activity.category}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.settingsItem}>
          <User color="#6B7280" size={20} />
          <Text style={styles.settingsText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Crown color="#6B7280" size={20} />
          <Text style={styles.settingsText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Learning</Text>
        <TouchableOpacity style={styles.settingsItem}>
          <Target color="#6B7280" size={20} />
          <Text style={styles.settingsText}>Learning Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Brain color="#6B7280" size={20} />
          <Text style={styles.settingsText}>AI Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Download color="#6B7280" size={20} />
          <Text style={styles.settingsText}>Offline Content</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.settingsItem}>
          <Text style={styles.settingsText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Text style={styles.settingsText}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Text style={styles.settingsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab === tab && styles.activeTab
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      {selectedTab === 'Overview' && renderOverview()}
      {selectedTab === 'Achievements' && renderAchievements()}
      {selectedTab === 'Activity' && renderActivity()}
      {selectedTab === 'Settings' && renderSettings()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 16,
    borderRadius: 20,
    backgroundColor: '#1F1F1F',
  },
  activeTab: {
    backgroundColor: '#6366F1',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userRole: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  roleText: {
    color: '#6366F1',
    fontWeight: '600',
    marginLeft: 4,
  },
  ageText: {
    color: '#6B7280',
    marginLeft: 4,
  },
  userEmail: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  settingsButton: {
    padding: 8,
  },
  levelSection: {
    marginBottom: 20,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  xpText: {
    color: '#6B7280',
    fontSize: 14,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2D2D2D',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  streakSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streakItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  streakEmoji: {
    fontSize: 20,
  },
  streakNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
  },
  goalCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  goalText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 16,
  },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2D2D2D',
    borderRadius: 3,
    marginRight: 12,
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  goalProgressText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementCardLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementEmojiLocked: {
    fontSize: 20,
  },
  achievementTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#6B7280',
  },
  achievementDescription: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
  achievementDescriptionLocked: {
    color: '#4B5563',
  },
  earnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  earnedText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityCategory: {
    color: '#6366F1',
    fontSize: 12,
  },
  activityTime: {
    color: '#6B7280',
    fontSize: 12,
  },
  settingsSection: {
    marginBottom: 32,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingsText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 16,
  },
});