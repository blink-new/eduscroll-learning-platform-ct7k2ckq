import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Image,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  X, 
  Camera, 
  Video, 
  FileText, 
  Users, 
  Award, 
  Image as ImageIcon,
  ChevronDown,
  Plus
} from 'lucide-react-native';
import { router } from 'expo-router';

const subjects = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'History', 'Literature', 'Languages', 'Art', 'Music', 'Psychology',
  'Economics', 'Philosophy', 'Engineering', 'Medicine'
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const postTypes = [
  {
    id: 'study_note',
    title: 'Study Notes',
    description: 'Share your study notes and explanations',
    icon: FileText,
    color: '#6366F1'
  },
  {
    id: 'video_explanation',
    title: 'Video Explanation',
    description: 'Create educational video content',
    icon: Video,
    color: '#EF4444'
  },
  {
    id: 'study_group',
    title: 'Study Group',
    description: 'Organize a study group session',
    icon: Users,
    color: '#10B981'
  },
  {
    id: 'achievement',
    title: 'Achievement',
    description: 'Share your learning milestones',
    icon: Award,
    color: '#F59E0B'
  },
  {
    id: 'question',
    title: 'Ask Question',
    description: 'Get help from the community',
    icon: Plus,
    color: '#8B5CF6'
  }
];

export default function CreatePost() {
  const [selectedType, setSelectedType] = useState('study_note');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [images, setImages] = useState<string[]>([]);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const [showDifficultyPicker, setShowDifficultyPicker] = useState(false);
  
  // Study group specific fields
  const [groupTitle, setGroupTitle] = useState('');
  const [maxMembers, setMaxMembers] = useState('10');
  const [meetingTime, setMeetingTime] = useState('');
  
  // Achievement specific fields
  const [achievementTitle, setAchievementTitle] = useState('');
  
  // Question specific fields
  const [questionTitle, setQuestionTitle] = useState('');

  const handlePost = () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please add some content to your post');
      return;
    }
    
    if (!subject) {
      Alert.alert('Error', 'Please select a subject');
      return;
    }

    // Here you would typically send the post data to your backend
    Alert.alert(
      'Success!', 
      'Your post has been shared with the community!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const addImage = () => {
    // In a real app, this would open image picker
    const mockImage = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop';
    setImages(prev => [...prev, mockImage]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const renderTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Post Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {postTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.typeCardActive,
                { borderColor: type.color }
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={[styles.typeIcon, { backgroundColor: type.color }]}>
                <IconComponent color="#FFFFFF" size={20} />
              </View>
              <Text style={[
                styles.typeTitle,
                selectedType === type.id && styles.typeTextActive
              ]}>
                {type.title}
              </Text>
              <Text style={styles.typeDescription}>{type.description}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderContentInput = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {selectedType === 'question' ? 'Your Question' : 'Content'}
      </Text>
      {selectedType === 'study_group' && (
        <TextInput
          style={styles.titleInput}
          placeholder="Study group title..."
          placeholderTextColor="#6B7280"
          value={groupTitle}
          onChangeText={setGroupTitle}
        />
      )}
      {selectedType === 'achievement' && (
        <TextInput
          style={styles.titleInput}
          placeholder="Achievement title..."
          placeholderTextColor="#6B7280"
          value={achievementTitle}
          onChangeText={setAchievementTitle}
        />
      )}
      {selectedType === 'question' && (
        <TextInput
          style={styles.titleInput}
          placeholder="Question title..."
          placeholderTextColor="#6B7280"
          value={questionTitle}
          onChangeText={setQuestionTitle}
        />
      )}
      <TextInput
        style={styles.contentInput}
        placeholder={
          selectedType === 'study_group' 
            ? "Describe what you'll study, when you'll meet, and what participants should prepare..."
            : selectedType === 'achievement'
            ? "Share your learning journey and what you accomplished..."
            : selectedType === 'question'
            ? "Describe your question in detail. What have you tried? Where are you stuck?"
            : "Share your knowledge, insights, or explanations..."
        }
        placeholderTextColor="#6B7280"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
    </View>
  );

  const renderSubjectAndDifficulty = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Subject & Difficulty</Text>
      <View style={styles.pickerRow}>
        <TouchableOpacity 
          style={styles.picker}
          onPress={() => setShowSubjectPicker(!showSubjectPicker)}
        >
          <Text style={styles.pickerText}>
            {subject || 'Select Subject'}
          </Text>
          <ChevronDown color="#6B7280" size={20} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.picker}
          onPress={() => setShowDifficultyPicker(!showDifficultyPicker)}
        >
          <Text style={styles.pickerText}>{difficulty}</Text>
          <ChevronDown color="#6B7280" size={20} />
        </TouchableOpacity>
      </View>
      
      {showSubjectPicker && (
        <View style={styles.pickerOptions}>
          {subjects.map((subj) => (
            <TouchableOpacity
              key={subj}
              style={styles.pickerOption}
              onPress={() => {
                setSubject(subj);
                setShowSubjectPicker(false);
              }}
            >
              <Text style={styles.pickerOptionText}>{subj}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {showDifficultyPicker && (
        <View style={styles.pickerOptions}>
          {difficulties.map((diff) => (
            <TouchableOpacity
              key={diff}
              style={styles.pickerOption}
              onPress={() => {
                setDifficulty(diff);
                setShowDifficultyPicker(false);
              }}
            >
              <Text style={styles.pickerOptionText}>{diff}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderStudyGroupFields = () => {
    if (selectedType !== 'study_group') return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Study Group Details</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={styles.inputLabel}>Max Members</Text>
            <TextInput
              style={styles.smallInput}
              placeholder="10"
              placeholderTextColor="#6B7280"
              value={maxMembers}
              onChangeText={setMaxMembers}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.inputLabel}>Meeting Time</Text>
            <TextInput
              style={styles.smallInput}
              placeholder="e.g., Tuesdays 7PM"
              placeholderTextColor="#6B7280"
              value={meetingTime}
              onChangeText={setMeetingTime}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderMediaSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Media</Text>
      <View style={styles.mediaButtons}>
        <TouchableOpacity style={styles.mediaButton} onPress={addImage}>
          <ImageIcon color="#6366F1" size={20} />
          <Text style={styles.mediaButtonText}>Add Image</Text>
        </TouchableOpacity>
        
        {selectedType === 'video_explanation' && (
          <TouchableOpacity style={styles.mediaButton}>
            <Video color="#EF4444" size={20} />
            <Text style={styles.mediaButtonText}>Record Video</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreview}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <X color="#FFFFFF" size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <X color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTypeSelector()}
        {renderContentInput()}
        {renderSubjectAndDifficulty()}
        {renderStudyGroupFields()}
        {renderMediaSection()}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  postButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  typeCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardActive: {
    borderColor: '#6366F1',
    backgroundColor: '#1A1A2E',
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  typeTextActive: {
    color: '#6366F1',
  },
  typeDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  titleInput: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  contentInput: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  picker: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  pickerOptions: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
  },
  pickerOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  inputLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  smallInput: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D2D',
  },
  mediaButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  imagePreview: {
    marginTop: 12,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 4,
  },
  bottomPadding: {
    height: 40,
  },
});