import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Bell, Download, Share, Award, BookOpen, Clock, Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stats = [
  { label: 'Videos Watched', value: '1,247', icon: BookOpen },
  { label: 'Hours Learned', value: '89.5', icon: Clock },
  { label: 'Subjects', value: '12', icon: Award },
  { label: 'Liked Videos', value: '456', icon: Heart },
];

const menuItems = [
  { icon: Download, label: 'Downloaded Videos', subtitle: '12 videos available offline' },
  { icon: Bell, label: 'Notifications', subtitle: 'Manage your preferences' },
  { icon: Share, label: 'Invite Friends', subtitle: 'Share EduScroll with others' },
  { icon: Settings, label: 'Settings', subtitle: 'Privacy, account & more' },
];

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-2xl font-bold">Profile</Text>
            <TouchableOpacity>
              <Settings color="white" size={24} />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View className="items-center mb-8">
            <View className="relative mb-4">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
                className="w-24 h-24 rounded-full border-4 border-primary"
              />
              <View className="absolute -bottom-2 -right-2 bg-primary rounded-full w-8 h-8 items-center justify-center">
                <Award color="white" size={16} />
              </View>
            </View>
            
            <Text className="text-white text-xl font-bold mb-1">Alex Johnson</Text>
            <Text className="text-gray-400 text-sm mb-2">Learning Enthusiast</Text>
            <View className="bg-accent/20 rounded-full px-3 py-1">
              <Text className="text-accent text-xs font-medium">🔥 7 day streak</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View className="flex-row flex-wrap justify-between mb-8">
            {stats.map((stat, index) => (
              <View key={index} className="bg-gray-900 rounded-2xl p-4 items-center" style={{ width: '48%', marginBottom: 12 }}>
                <stat.icon color="#6366F1" size={24} />
                <Text className="text-white text-lg font-bold mt-2">{stat.value}</Text>
                <Text className="text-gray-400 text-xs text-center">{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Learning Progress */}
          <View className="bg-gray-900 rounded-2xl p-4 mb-6">
            <Text className="text-white font-semibold mb-3">This Week's Progress</Text>
            <View className="space-y-3">
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-300 text-sm">Physics</Text>
                  <Text className="text-gray-300 text-sm">8/10 videos</Text>
                </View>
                <View className="bg-gray-700 rounded-full h-2">
                  <View className="bg-primary rounded-full h-2" style={{ width: '80%' }} />
                </View>
              </View>
              
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-300 text-sm">Mathematics</Text>
                  <Text className="text-gray-300 text-sm">5/8 videos</Text>
                </View>
                <View className="bg-gray-700 rounded-full h-2">
                  <View className="bg-accent rounded-full h-2" style={{ width: '62.5%' }} />
                </View>
              </View>
              
              <View>
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-300 text-sm">History</Text>
                  <Text className="text-gray-300 text-sm">3/6 videos</Text>
                </View>
                <View className="bg-gray-700 rounded-full h-2">
                  <View className="bg-green-500 rounded-full h-2" style={{ width: '50%' }} />
                </View>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View className="space-y-3">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-gray-900 rounded-2xl p-4 flex-row items-center"
              >
                <View className="bg-gray-800 rounded-full p-3 mr-4">
                  <item.icon color="white" size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium mb-1">{item.label}</Text>
                  <Text className="text-gray-400 text-sm">{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign Out */}
          <TouchableOpacity className="bg-red-500/20 rounded-2xl p-4 mt-6 items-center">
            <Text className="text-red-400 font-medium">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}