import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { getMediaItems, MediaItem } from '../../utils/storage';

export default function MediaScreen() {
  const { t } = useLanguage();
  const params = useLocalSearchParams<{ subjectId: string }>();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    const data = await getMediaItems(params.subjectId);
    setMediaItems(data);
  };

  const renderMedia = ({ item }: { item: MediaItem }) => (
    <TouchableOpacity 
      style={styles.mediaCard}
      onPress={() => {}}
    >
      <View style={styles.mediaIcon}>
        <Ionicons 
          name={item.type === 'video' ? 'videocam' : item.type === 'image' ? 'image' : 'document'} 
          size={24} 
          color="#FF9800" 
        />
      </View>
      <View style={styles.mediaInfo}>
        <Text style={styles.mediaName}>{item.name}</Text>
        <Text style={styles.mediaType}>{item.type}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={`/subject/${params.subjectId}`} asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={28} color="#333" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>{t.media.title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {mediaItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="videocam-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Нет медиа</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => {}}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>{t.media.addMedia}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={mediaItems}
          renderItem={renderMedia}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    padding: 16,
  },
  mediaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mediaIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mediaInfo: {
    flex: 1,
  },
  mediaName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mediaType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    marginBottom: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
