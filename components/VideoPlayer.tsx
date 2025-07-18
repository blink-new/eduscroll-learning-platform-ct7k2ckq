import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Play, Pause } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface VideoPlayerProps {
  videoUrl: string;
  isActive: boolean;
  poster?: string;
}

export function VideoPlayer({ videoUrl, isActive, poster }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.playAsync();
      setIsPlaying(true);
    } else {
      videoRef.current?.pauseAsync();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current?.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current?.playAsync();
      setIsPlaying(true);
    }
  };

  const handlePress = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      style={styles.container}
    >
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isActive}
        isLooping
        isMuted={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying || false);
          }
        }}
      />
      
      {/* Play/Pause Control */}
      {showControls && (
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            onPress={togglePlayPause}
            style={styles.playButton}
          >
            {isPlaying ? (
              <Pause color="white" size={40} />
            ) : (
              <Play color="white" size={40} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
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
  video: {
    width: screenWidth,
    height: screenHeight,
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 16,
  },
});