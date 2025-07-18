import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Medal, Users, Calendar, Clock, Star, Award, Target } from 'lucide-react-native';

const competitions = [
  {
    id: 1,
    title: 'Global Math Championship',
    organizer: 'MIT Mathematics Department',
    participants: 15420,
    prize: '$10,000',
    deadline: '2024-08-15',
    difficulty: 'Advanced',
    category: 'Mathematics',
    status: 'active',
    description: 'Solve complex mathematical problems and compete with the best minds globally',
    duration: '3 hours',
    isJoined: false,
  },
  {
    id: 2,
    title: 'Physics Problem Solving',
    organizer: 'Stanford University',
    participants: 8900,
    prize: '$5,000',
    deadline: '2024-07-30',
    difficulty: 'Intermediate',
    category: 'Physics',
    status: 'active',
    description: 'Test your physics knowledge with real-world problem scenarios',
    duration: '2 hours',
    isJoined: true,
  },
  {
    id: 3,
    title: 'History Quiz Challenge',
    organizer: 'Oxford History Society',
    participants: 6700,
    prize: '$2,500',
    deadline: '2024-08-01',
    difficulty: 'Beginner',
    category: 'History',
    status: 'active',
    description: 'Journey through time with questions spanning ancient to modern history',
    duration: '1.5 hours',
    isJoined: false,
  },
  {
    id: 4,
    title: 'Coding Bootcamp Final',
    organizer: 'Google Developers',
    participants: 12800,
    prize: '$15,000',
    deadline: '2024-08-20',
    difficulty: 'Expert',
    category: 'Technology',
    status: 'upcoming',
    description: 'Build innovative solutions using cutting-edge technologies',
    duration: '4 hours',
    isJoined: true,
  },
];

const rankings = [
  { rank: 1, name: 'Alex Chen', points: 15420, avatar: '🏆', country: 'USA' },
  { rank: 2, name: 'Maria Rodriguez', points: 14890, avatar: '🥈', country: 'Spain' },
  { rank: 3, name: 'Yuki Tanaka', points: 14200, avatar: '🥉', country: 'Japan' },
  { rank: 4, name: 'Emma Thompson', points: 13950, avatar: '👤', country: 'UK' },
  { rank: 5, name: 'David Kim', points: 13700, avatar: '👤', country: 'Korea' },
];

const tabs = ['Active', 'My Competitions', 'Rankings'];

export default function Competitions() {
  const [selectedTab, setSelectedTab] = useState('Active');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      case 'Expert': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'upcoming': return '#F59E0B';
      case 'ended': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const renderActiveCompetitions = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {competitions.map((competition) => (
        <TouchableOpacity key={competition.id} style={styles.competitionCard}>
          <View style={styles.competitionHeader}>
            <View style={styles.competitionInfo}>
              <Text style={styles.competitionTitle}>{competition.title}</Text>
              <Text style={styles.competitionOrganizer}>by {competition.organizer}</Text>
              <Text style={styles.competitionDescription}>{competition.description}</Text>
            </View>
            <View style={styles.competitionBadges}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(competition.status) }]}>
                <Text style={styles.statusText}>{competition.status.toUpperCase()}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(competition.difficulty) }]}>
                <Text style={styles.difficultyText}>{competition.difficulty}</Text>
              </View>
            </View>
          </View>

          <View style={styles.competitionStats}>
            <View style={styles.statItem}>
              <Users color="#6B7280" size={16} />
              <Text style={styles.statText}>{competition.participants.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Trophy color="#F59E0B" size={16} />
              <Text style={styles.statText}>{competition.prize}</Text>
            </View>
            <View style={styles.statItem}>
              <Clock color="#6B7280" size={16} />
              <Text style={styles.statText}>{competition.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Calendar color="#6B7280" size={16} />
              <Text style={styles.statText}>{new Date(competition.deadline).toLocaleDateString()}</Text>
            </View>
          </View>

          <View style={styles.competitionFooter}>
            <Text style={styles.categoryTag}>{competition.category}</Text>
            <TouchableOpacity
              style={[
                styles.joinButton,
                competition.isJoined && styles.joinedButton
              ]}
            >
              <Text style={[
                styles.joinButtonText,
                competition.isJoined && styles.joinedButtonText
              ]}>
                {competition.isJoined ? 'Joined' : 'Join Competition'}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMyCompetitions = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.myCompetitionsHeader}>
        <Text style={styles.sectionTitle}>Your Active Competitions</Text>
      </View>
      {competitions.filter(c => c.isJoined).map((competition) => (
        <TouchableOpacity key={competition.id} style={styles.myCompetitionCard}>
          <View style={styles.myCompetitionHeader}>
            <Text style={styles.myCompetitionTitle}>{competition.title}</Text>
            <View style={styles.myCompetitionStatus}>
              <Target color="#6366F1" size={16} />
              <Text style={styles.myCompetitionStatusText}>In Progress</Text>
            </View>
          </View>
          <Text style={styles.myCompetitionOrganizer}>{competition.organizer}</Text>
          <View style={styles.myCompetitionProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% Complete</Text>
          </View>
          <View style={styles.myCompetitionFooter}>
            <Text style={styles.deadlineText}>
              Deadline: {new Date(competition.deadline).toLocaleDateString()}
            </Text>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderRankings = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.rankingsHeader}>
        <Text style={styles.sectionTitle}>Global Rankings</Text>
        <Text style={styles.rankingsSubtitle}>Top performers this month</Text>
      </View>
      
      {rankings.map((user) => (
        <View key={user.rank} style={styles.rankingItem}>
          <View style={styles.rankingLeft}>
            <View style={[
              styles.rankingNumber,
              user.rank <= 3 && styles.topRankingNumber
            ]}>
              <Text style={[
                styles.rankingNumberText,
                user.rank <= 3 && styles.topRankingNumberText
              ]}>
                {user.rank}
              </Text>
            </View>
            <View style={styles.rankingAvatar}>
              <Text style={styles.rankingAvatarText}>{user.avatar}</Text>
            </View>
            <View style={styles.rankingInfo}>
              <Text style={styles.rankingName}>{user.name}</Text>
              <Text style={styles.rankingCountry}>{user.country}</Text>
            </View>
          </View>
          <View style={styles.rankingRight}>
            <Text style={styles.rankingPoints}>{user.points.toLocaleString()}</Text>
            <Text style={styles.rankingPointsLabel}>points</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>View Full Rankings</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Competitions</Text>
        <TouchableOpacity style={styles.achievementsButton}>
          <Award color="#F59E0B" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
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
      </View>

      {/* Content */}
      {selectedTab === 'Active' && renderActiveCompetitions()}
      {selectedTab === 'My Competitions' && renderMyCompetitions()}
      {selectedTab === 'Rankings' && renderRankings()}
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
  achievementsButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6366F1',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6366F1',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  competitionCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  competitionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  competitionOrganizer: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  competitionDescription: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  competitionBadges: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  competitionStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  statText: {
    color: '#6B7280',
    fontSize: 12,
    marginLeft: 4,
  },
  competitionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  myCompetitionsHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  myCompetitionCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  myCompetitionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  myCompetitionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  myCompetitionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myCompetitionStatusText: {
    color: '#6366F1',
    fontSize: 12,
    marginLeft: 4,
  },
  myCompetitionOrganizer: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  myCompetitionProgress: {
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2D2D2D',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  myCompetitionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineText: {
    fontSize: 12,
    color: '#6B7280',
  },
  continueButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  rankingsHeader: {
    marginBottom: 20,
  },
  rankingsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  rankingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankingNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topRankingNumber: {
    backgroundColor: '#F59E0B',
  },
  rankingNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  topRankingNumberText: {
    color: '#000000',
  },
  rankingAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankingAvatarText: {
    fontSize: 20,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rankingCountry: {
    fontSize: 12,
    color: '#6B7280',
  },
  rankingRight: {
    alignItems: 'flex-end',
  },
  rankingPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  rankingPointsLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewMoreButton: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewMoreText: {
    color: '#6366F1',
    fontWeight: '600',
  },
});