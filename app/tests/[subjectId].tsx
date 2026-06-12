import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTests, Test } from '../../utils/storage';

export default function TestsScreen() {
  const { t } = useLanguage();
  const params = useLocalSearchParams<{ subjectId: string }>();
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    const data = await getTests(params.subjectId);
    setTests(data);
  };

  const renderTest = ({ item }: { item: Test }) => (
    <TouchableOpacity 
      style={styles.testCard}
      onPress={() => {}}
    >
      <View style={styles.testIcon}>
        <Ionicons name="help-circle-outline" size={24} color="#4CAF50" />
      </View>
      <View style={styles.testInfo}>
        <Text style={styles.testName}>{item.title}</Text>
        <Text style={styles.testQuestions}>{item.questions.length} вопросов</Text>
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
        <Text style={styles.title}>{t.tests.title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {tests.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="help-circle-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Нет тестов</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => {}}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>{t.tests.addTest}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={tests}
          renderItem={renderTest}
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
  testCard: {
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
  testIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  testQuestions: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
