import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, ChevronLeft, Brain, User, Calendar, Target, BookOpen, Zap } from 'lucide-react-native';

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to Zeuph',
    subtitle: 'The AI-Powered Learning Revolution',
    description: 'Personalized education that adapts to your learning style and knowledge level.',
    component: 'welcome',
  },
  {
    id: 2,
    title: 'Tell Us About Yourself',
    subtitle: 'Help us personalize your experience',
    description: 'This information helps our AI create the perfect learning path for you.',
    component: 'userInfo',
  },
  {
    id: 3,
    title: 'Knowledge Assessment',
    subtitle: 'Quick test to understand your level',
    description: 'Answer a few questions so we can recommend the right content for you.',
    component: 'assessment',
  },
  {
    id: 4,
    title: 'Set Your Learning Goals',
    subtitle: 'What do you want to achieve?',
    description: 'Define your objectives and we\'ll track your progress.',
    component: 'goals',
  },
  {
    id: 5,
    title: 'You\'re All Set!',
    subtitle: 'Ready to start your learning journey',
    description: 'Your personalized feed is ready. Let\'s begin learning!',
    component: 'complete',
  },
];

const userRoles = [
  { id: 'student', label: 'Student', icon: '🎓', description: 'Learning new topics and skills' },
  { id: 'teacher', label: 'Teacher', icon: '👨‍🏫', description: 'Sharing knowledge and creating content' },
  { id: 'scientist', label: 'Scientist', icon: '🔬', description: 'Research and advanced learning' },
];

const subjects = [
  { id: 'math', label: 'Mathematics', icon: '📐' },
  { id: 'physics', label: 'Physics', icon: '⚛️' },
  { id: 'chemistry', label: 'Chemistry', icon: '🧪' },
  { id: 'biology', label: 'Biology', icon: '🧬' },
  { id: 'history', label: 'History', icon: '🏛️' },
  { id: 'languages', label: 'Languages', icon: '🌍' },
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'arts', label: 'Arts', icon: '🎨' },
];

const assessmentQuestions = [
  {
    id: 1,
    subject: 'Mathematics',
    question: 'What is the derivative of x²?',
    options: ['2x', 'x', '2', 'x²'],
    correct: 0,
    difficulty: 'intermediate',
  },
  {
    id: 2,
    subject: 'Physics',
    question: 'What is the speed of light in vacuum?',
    options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁴ m/s'],
    correct: 0,
    difficulty: 'basic',
  },
  {
    id: 3,
    subject: 'History',
    question: 'When did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correct: 1,
    difficulty: 'basic',
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    role: '',
    interests: [],
    goals: [],
  });
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRoleSelect = (roleId: string) => {
    setUserInfo({ ...userInfo, role: roleId });
  };

  const handleInterestToggle = (subjectId: string) => {
    const interests = userInfo.interests.includes(subjectId)
      ? userInfo.interests.filter(id => id !== subjectId)
      : [...userInfo.interests, subjectId];
    setUserInfo({ ...userInfo, interests });
  };

  const handleAssessmentAnswer = (questionId: number, answerIndex: number) => {
    setAssessmentAnswers({
      ...assessmentAnswers,
      [questionId]: answerIndex,
    });
  };

  const renderWelcome = () => (
    <View style={styles.stepContent}>
      <View style={styles.welcomeIcon}>
        <Text style={styles.welcomeEmoji}>🚀</Text>
      </View>
      <Text style={styles.stepTitle}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.stepSubtitle}>{onboardingSteps[currentStep].subtitle}</Text>
      <Text style={styles.stepDescription}>{onboardingSteps[currentStep].description}</Text>
      
      <View style={styles.featuresList}>
        <View style={styles.featureItem}>
          <Brain color="#6366F1" size={20} />
          <Text style={styles.featureText}>AI-Powered Personalization</Text>
        </View>
        <View style={styles.featureItem}>
          <BookOpen color="#10B981" size={20} />
          <Text style={styles.featureText}>TikTok-Style Learning Videos</Text>
        </View>
        <View style={styles.featureItem}>
          <Target color="#F59E0B" size={20} />
          <Text style={styles.featureText}>Competitions & Rankings</Text>
        </View>
        <View style={styles.featureItem}>
          <User color="#8B5CF6" size={20} />
          <Text style={styles.featureText}>Learning Communities</Text>
        </View>
      </View>
    </View>
  );

  const renderUserInfo = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.stepDescription}>{onboardingSteps[currentStep].description}</Text>
      
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Your Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your name"
          placeholderTextColor="#6B7280"
          value={userInfo.name}
          onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your age"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={userInfo.age}
          onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>I am a...</Text>
        <View style={styles.rolesGrid}>
          {userRoles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                userInfo.role === role.id && styles.roleCardSelected
              ]}
              onPress={() => handleRoleSelect(role.id)}
            >
              <Text style={styles.roleIcon}>{role.icon}</Text>
              <Text style={[
                styles.roleLabel,
                userInfo.role === role.id && styles.roleLabelSelected
              ]}>
                {role.label}
              </Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Subjects I'm interested in</Text>
        <View style={styles.subjectsGrid}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectChip,
                userInfo.interests.includes(subject.id) && styles.subjectChipSelected
              ]}
              onPress={() => handleInterestToggle(subject.id)}
            >
              <Text style={styles.subjectIcon}>{subject.icon}</Text>
              <Text style={[
                styles.subjectLabel,
                userInfo.interests.includes(subject.id) && styles.subjectLabelSelected
              ]}>
                {subject.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderAssessment = () => {
    const question = assessmentQuestions[currentQuestion];
    
    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{onboardingSteps[currentStep].title}</Text>
        <Text style={styles.stepDescription}>{onboardingSteps[currentStep].description}</Text>
        
        <View style={styles.assessmentProgress}>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {assessmentQuestions.length}
          </Text>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill, 
              { width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }
            ]} />
          </View>
        </View>

        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionSubject}>{question.subject}</Text>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{question.difficulty}</Text>
            </View>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  assessmentAnswers[question.id] === index && styles.optionButtonSelected
                ]}
                onPress={() => handleAssessmentAnswer(question.id, index)}
              >
                <Text style={[
                  styles.optionText,
                  assessmentAnswers[question.id] === index && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.assessmentNavigation}>
          {currentQuestion > 0 && (
            <TouchableOpacity
              style={styles.assessmentButton}
              onPress={() => setCurrentQuestion(currentQuestion - 1)}
            >
              <ChevronLeft color="#6366F1" size={20} />
              <Text style={styles.assessmentButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentQuestion < assessmentQuestions.length - 1 ? (
            <TouchableOpacity
              style={[styles.assessmentButton, styles.assessmentButtonPrimary]}
              onPress={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!assessmentAnswers[question.id] && assessmentAnswers[question.id] !== 0}
            >
              <Text style={styles.assessmentButtonTextPrimary}>Next</Text>
              <ChevronRight color="#FFFFFF" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.assessmentButton, styles.assessmentButtonPrimary]}
              onPress={nextStep}
              disabled={!assessmentAnswers[question.id] && assessmentAnswers[question.id] !== 0}
            >
              <Text style={styles.assessmentButtonTextPrimary}>Complete Assessment</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderGoals = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.stepDescription}>{onboardingSteps[currentStep].description}</Text>
      
      <View style={styles.goalsContainer}>
        <Text style={styles.inputLabel}>What's your main learning goal?</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="e.g., Master calculus, Learn Spanish, Understand quantum physics..."
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.goalsContainer}>
        <Text style={styles.inputLabel}>How much time can you dedicate daily?</Text>
        <View style={styles.timeOptions}>
          {['15 min', '30 min', '1 hour', '2+ hours'].map((time) => (
            <TouchableOpacity key={time} style={styles.timeOption}>
              <Text style={styles.timeOptionText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderComplete = () => (
    <View style={styles.stepContent}>
      <View style={styles.completeIcon}>
        <Text style={styles.completeEmoji}>🎉</Text>
      </View>
      <Text style={styles.stepTitle}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.stepDescription}>{onboardingSteps[currentStep].description}</Text>
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Learning Profile</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Role:</Text>
          <Text style={styles.summaryValue}>{userInfo.role}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Interests:</Text>
          <Text style={styles.summaryValue}>{userInfo.interests.length} subjects</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Assessment:</Text>
          <Text style={styles.summaryValue}>Completed</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Zap color="#FFFFFF" size={20} />
        <Text style={styles.startButtonText}>Start Learning</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStepContent = () => {
    const step = onboardingSteps[currentStep];
    switch (step.component) {
      case 'welcome': return renderWelcome();
      case 'userInfo': return renderUserInfo();
      case 'assessment': return renderAssessment();
      case 'goals': return renderGoals();
      case 'complete': return renderComplete();
      default: return renderWelcome();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {onboardingSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index <= currentStep && styles.progressDotActive
            ]}
          />
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Navigation */}
      {onboardingSteps[currentStep].component !== 'assessment' && 
       onboardingSteps[currentStep].component !== 'complete' && (
        <View style={styles.navigation}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={prevStep}>
              <ChevronLeft color="#6B7280" size={20} />
              <Text style={styles.navButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonPrimary]}
            onPress={nextStep}
          >
            <Text style={styles.navButtonTextPrimary}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <ChevronRight color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2D2D2D',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#6366F1',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  welcomeIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeEmoji: {
    fontSize: 48,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 18,
    color: '#6366F1',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  inputSection: {
    width: '100%',
    marginBottom: 24,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  rolesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleCardSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#1E1E3F',
  },
  roleIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  roleLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  roleLabelSelected: {
    color: '#6366F1',
  },
  roleDescription: {
    color: '#6B7280',
    fontSize: 10,
    textAlign: 'center',
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subjectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  subjectChipSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#1E1E3F',
  },
  subjectIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  subjectLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  subjectLabelSelected: {
    color: '#6366F1',
  },
  assessmentProgress: {
    width: '100%',
    marginBottom: 24,
  },
  progressText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2D2D2D',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  questionCard: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionSubject: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  difficultyBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '600',
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#1E1E3F',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  optionTextSelected: {
    color: '#6366F1',
  },
  assessmentNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  assessmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1F1F1F',
  },
  assessmentButtonPrimary: {
    backgroundColor: '#6366F1',
  },
  assessmentButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  assessmentButtonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  goalsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeOption: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  timeOptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completeIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  completeEmoji: {
    fontSize: 48,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#6B7280',
    fontSize: 14,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1F1F1F',
  },
  navButtonPrimary: {
    backgroundColor: '#6366F1',
  },
  navButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  navButtonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
});