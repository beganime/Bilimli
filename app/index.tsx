import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { getSubjects, deleteSubject, Subject } from '../utils/storage';

export default function HomeScreen() {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t.subjects.delete,
      t.common.confirmDelete || 'Вы уверены?',
      [
        { text: t.common.cancel, style: 'cancel' },
        { text: t.common.delete, style: 'destructive', onPress: async () => {
          await deleteSubject(id);
          loadSubjects();
        }},
      ]
    );
  };

  const renderSubject = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={[styles.subjectCard, isDark && styles.subjectCardDark]}
      onPress={() => router.push(`/subject/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={[styles.subjectIcon, { backgroundColor: isDark ? '#1e3a5f' : '#e3f2fd' }]}>
        <Text style={styles.subjectIconText}>{item.icon}</Text>
      </View>
      <View style={styles.subjectInfo}>
        <Text style={[styles.subjectName, isDark && styles.textDark]}>{item.name}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} activeOpacity={0.7}>
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, isDark && styles.textDark]}>{t.app.name}</Text>
          <Link href="/settings" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="settings-outline" size={28} color={isDark ? '#fff' : '#333'} />
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.buttonRow}>
          <Link href="/subjects" asChild>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Ionicons name="book-outline" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>{t.home.subjects}</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/about" asChild>
            <TouchableOpacity style={styles.actionButtonSecondary} activeOpacity={0.7}>
              <Ionicons name="information-circle-outline" size={24} color="#fff" />
              <Text style={styles.actionButtonText}>{t.home.about}</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>{t.subjects.title}</Text>

        {subjects.length === 0 ? (
          <View style={[styles.emptyState, isDark && styles.emptyStateDark]}>
            <Ionicons name="book-outline" size={48} color="#ccc" />
            <Text style={[styles.emptyText, isDark && styles.textDark]}>{t.home.noSubjects}</Text>
          </View>
        ) : (
          <FlatList
            data={subjects}
            renderItem={renderSubject}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      <Link href="/subjects" asChild>
        <TouchableOpacity style={styles.fab} activeOpacity={0.7}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  textDark: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 80,
  },
  subjectCard: {
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
  subjectCardDark: {
    backgroundColor: '#1e1e1e',
  },
  subjectIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subjectIconText: {
    fontSize: 24,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateDark: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
