import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { getSubjects, deleteSubject, Subject } from '../../utils/storage';

export default function SubjectDetailScreen() {
  const { t } = useLanguage();
  const params = useLocalSearchParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    loadSubject();
  }, [params.id]);

  const loadSubject = async () => {
    const subjects = await getSubjects();
    const found = subjects.find(s => s.id === params.id);
    setSubject(found || null);
  };

  const handleDelete = () => {
    Alert.alert(
      t.subjects.delete,
      'Вы уверены?',
      [
        { text: t.common.cancel, style: 'cancel' },
        { 
          text: t.common.delete, 
          style: 'destructive', 
          onPress: async () => {
            await deleteSubject(params.id!);
            router.back();
          }
        },
      ]
    );
  };

  if (!subject) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/subjects" asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={28} color="#333" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>{subject.name}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="#ff4444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{subject.icon}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Разделы</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push(`/topics/${subject.id}`)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="layers-outline" size={24} color="#2196F3" />
              <Text style={styles.menuText}>{t.subjects.topics}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push(`/tests/${subject.id}`)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>{t.subjects.tests}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push(`/media/${subject.id}`)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="videocam-outline" size={24} color="#FF9800" />
              <Text style={styles.menuText}>{t.subjects.media}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push(`/textbooks/${subject.id}`)}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="book-outline" size={24} color="#9C27B0" />
              <Text style={styles.menuText}>{t.subjects.textbooks}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  iconText: {
    fontSize: 60,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    padding: 16,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
