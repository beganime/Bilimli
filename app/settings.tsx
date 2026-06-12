import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { setLanguage, Language } from '../utils/storage';

export default function SettingsScreen() {
  const { language, setLanguage: changeLanguage, t } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);

  const handleLanguageChange = async (lang: Language) => {
    await changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={28} color="#333" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>{t.settings.title}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.settings.language}</Text>
        
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.option}
            onPress={() => handleLanguageChange('ru')}
          >
            <View style={styles.optionLeft}>
              <Ionicons 
                name={language === 'ru' ? 'radio-button-on' : 'radio-button-off'} 
                size={24} 
                color={language === 'ru' ? '#4CAF50' : '#999'} 
              />
              <Text style={[styles.optionText, language === 'ru' && styles.optionTextActive]}>
                Русский
              </Text>
            </View>
            {language === 'ru' && <Ionicons name="checkmark" size={24} color="#4CAF50" />}
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity 
            style={styles.option}
            onPress={() => handleLanguageChange('tk')}
          >
            <View style={styles.optionLeft}>
              <Ionicons 
                name={language === 'tk' ? 'radio-button-on' : 'radio-button-off'} 
                size={24} 
                color={language === 'tk' ? '#4CAF50' : '#999'} 
              />
              <Text style={[styles.optionText, language === 'tk' && styles.optionTextActive]}>
                Türkmençe
              </Text>
            </View>
            {language === 'tk' && <Ionicons name="checkmark" size={24} color="#4CAF50" />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.settings.theme}</Text>
        
        <View style={styles.card}>
          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name={darkMode ? 'moon' : 'sunny'} size={24} color="#4CAF50" />
              <Text style={styles.optionText}>
                {darkMode ? t.settings.darkMode : t.settings.lightMode}
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81c784' }}
              thumbColor={darkMode ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Информация</Text>
        
        <View style={styles.card}>
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="information-circle-outline" size={24} color="#2196F3" />
              <Text style={styles.optionText}>О приложении</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="star-outline" size={24} color="#FFC107" />
              <Text style={styles.optionText}>Оценить приложение</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#9C27B0" />
              <Text style={styles.optionText}>Помощь</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
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
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextActive: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
});
