import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutScreen() {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={28} color="#333" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>{t.about.title}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="school-outline" size={64} color="#4CAF50" />
          </View>
          <Text style={styles.appName}>{t.app.name}</Text>
          <Text style={styles.description}>{t.about.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.about.author}</Text>
          <Text style={styles.cardText}>Bilimli Team</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.about.version}</Text>
          <Text style={styles.cardText}>1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Особенности</Text>
          <View style={styles.featureItem}>
            <Ionicons name="language-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Мультиязычность (RU/TK)</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="book-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Управление предметами</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="layers-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Темы и учебники</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="help-circle-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Тесты и проверка знаний</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="videocam-outline" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Медиа контент</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Bilimli. All rights reserved.</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});
