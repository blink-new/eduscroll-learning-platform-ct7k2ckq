import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brain, Send, Mic, Image, BookOpen, Lightbulb, Target, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Hi! I\'m your AI tutor. I\'m here to help you learn anything you want. You can ask me questions, request explanations, or even get personalized video recommendations based on your learning style.',
    timestamp: new Date(),
    suggestions: [
      'Explain quantum physics simply',
      'Help me with calculus',
      'Recommend math videos',
      'Create a study plan'
    ]
  }
];

const quickActions = [
  { id: 'explain', label: 'Explain Topic', icon: Lightbulb, color: '#F59E0B' },
  { id: 'videos', label: 'Find Videos', icon: BookOpen, color: '#6366F1' },
  { id: 'study-plan', label: 'Study Plan', icon: Target, color: '#10B981' },
  { id: 'quiz', label: 'Quick Quiz', icon: Brain, color: '#8B5CF6' },
];

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(text),
        timestamp: new Date(),
        suggestions: generateSuggestions(text),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('quantum') || input.includes('physics')) {
      return 'Quantum physics is fascinating! At its core, it describes how matter and energy behave at the smallest scales. Think of it like this: imagine if you could only walk up stairs by jumping entire steps at once - that\'s similar to how electrons can only exist at specific energy levels. Would you like me to recommend some great videos that explain this visually?';
    }
    
    if (input.includes('calculus') || input.includes('derivative')) {
      return 'Calculus is all about understanding change and motion! A derivative tells you the rate of change at any point - like how fast a car is going at exactly 3:00 PM. Think of it as the slope of a curve at a specific point. I can find some excellent step-by-step videos that make this concept crystal clear. What specific part of calculus are you struggling with?';
    }
    
    if (input.includes('study plan') || input.includes('schedule')) {
      return 'I\'d love to help you create a personalized study plan! Based on your learning profile, I recommend:\n\n📅 Daily: 30-45 minutes of focused learning\n🎯 Weekly goals with specific topics\n📊 Regular progress assessments\n🏆 Reward milestones\n\nWhat subject would you like to focus on first?';
    }
    
    if (input.includes('video') || input.includes('recommend')) {
      return 'Based on your learning style and interests, I\'ve found some perfect videos for you! I can recommend content that matches your current knowledge level and preferred learning pace. Would you like videos that are more visual, theoretical, or hands-on practical?';
    }
    
    return 'That\'s a great question! I\'m here to help you understand any topic. I can break down complex concepts into simple explanations, recommend personalized videos, create study plans, or even generate practice questions. What would be most helpful for your learning right now?';
  };

  const generateSuggestions = (userInput: string): string[] => {
    const input = userInput.toLowerCase();
    
    if (input.includes('quantum') || input.includes('physics')) {
      return [
        'Show me quantum physics videos',
        'Explain wave-particle duality',
        'What is Schrödinger\'s cat?',
        'Create a physics study plan'
      ];
    }
    
    if (input.includes('calculus') || input.includes('math')) {
      return [
        'Practice derivative problems',
        'Explain integration',
        'Find calculus video series',
        'Create math study schedule'
      ];
    }
    
    return [
      'Recommend videos for this topic',
      'Create a study plan',
      'Generate practice questions',
      'Explain this more simply'
    ];
  };

  const handleQuickAction = (actionId: string) => {
    let message = '';
    switch (actionId) {
      case 'explain':
        message = 'Can you explain a complex topic in simple terms?';
        break;
      case 'videos':
        message = 'Find me educational videos on my current learning topics';
        break;
      case 'study-plan':
        message = 'Help me create a personalized study plan';
        break;
      case 'quiz':
        message = 'Generate a quick quiz to test my knowledge';
        break;
    }
    sendMessage(message);
  };

  const handleSuggestionPress = (suggestion: string) => {
    sendMessage(suggestion);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.aiAvatar}>
            <Brain color="#6366F1" size={24} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Tutor</Text>
            <Text style={styles.headerSubtitle}>Your personal learning assistant</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Image color="#6B7280" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Mic color="#6B7280" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              onPress={() => handleQuickAction(action.id)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}20` }]}>
                <action.icon color={action.color} size={16} />
              </View>
              <Text style={styles.quickActionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            <View style={[
              styles.messageBubble,
              message.type === 'user' ? styles.userMessage : styles.aiMessage
            ]}>
              {message.type === 'ai' && (
                <View style={styles.aiMessageHeader}>
                  <Brain color="#6366F1" size={16} />
                  <Text style={styles.aiLabel}>AI Tutor</Text>
                </View>
              )}
              <Text style={[
                styles.messageText,
                message.type === 'user' ? styles.userMessageText : styles.aiMessageText
              ]}>
                {message.content}
              </Text>
              <Text style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            
            {/* AI Suggestions */}
            {message.type === 'ai' && message.suggestions && (
              <View style={styles.suggestionsContainer}>
                {message.suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionButton}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingIndicator}>
            <View style={styles.aiMessageHeader}>
              <Brain color="#6366F1" size={16} />
              <Text style={styles.aiLabel}>AI Tutor is typing...</Text>
            </View>
            <View style={styles.typingDots}>
              <View style={[styles.typingDot, styles.typingDot1]} />
              <View style={[styles.typingDot, styles.typingDot2]} />
              <View style={[styles.typingDot, styles.typingDot3]} />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask me anything about your studies..."
            placeholderTextColor="#6B7280"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() && styles.sendButtonActive
            ]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Send color={inputText.trim() ? "#FFFFFF" : "#6B7280"} size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#6B7280',
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  quickActionsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  quickActionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '85%',
  },
  userMessage: {
    backgroundColor: '#6366F1',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#1F1F1F',
    alignSelf: 'flex-start',
  },
  aiMessageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiLabel: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginLeft: 12,
  },
  suggestionButton: {
    backgroundColor: '#2D2D2D',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  suggestionText: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '500',
  },
  typingIndicator: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 12,
    maxWidth: '85%',
    alignSelf: 'flex-start',
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
    marginRight: 4,
  },
  typingDot1: {
    // Animation would be added here
  },
  typingDot2: {
    // Animation would be added here
  },
  typingDot3: {
    // Animation would be added here
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#6366F1',
  },
});