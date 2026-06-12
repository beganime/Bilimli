import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, Modal, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { getSubjects, saveSubject, deleteSubject, Subject, generateId } from '../utils/storage';

const ICONS = ['📚', '🧮', '🔬', '🌍', '🎨', '💻', '📝', '🎵', '⚽', '🧬'];

export default function SubjectsScreen() {
  const { t } = useLanguage();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };

  const openAddModal = () => {
    setEditingSubject(null);
    setSubjectName('');
    setSelectedIcon(ICONS[0]);
    setModalVisible(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setSubjectName(subject.name);
    setSelectedIcon(subject.icon);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!subjectName.trim()) {
      Alert.alert(t.common.error, 'Введите название предмета');
      return;
    }

    const subject: Subject = {
      id: editingSubject?.id || generateId(),
      name: subjectName.trim(),
      icon: selectedIcon,
    };

    await saveSubject(subject);
    setModalVisible(false);
    loadSubjects();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t.subjects.delete,
      'Вы уверены?',
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
      style={styles.subjectCard}
      onPress={() => router.push(`/subject/${item.id}`)}
    >
      <View style={styles.subjectIcon}>
        <Text style={styles.subjectIconText}>{item.icon}</Text>
      </View>
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectName}>{item.name}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={22} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={22} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={28} color="#333" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>{t.subjects.title}</Text>
        <TouchableOpacity onPress={openAddModal}>
          <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {subjects.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="book-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>{t.home.noSubjects}</Text>
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>{t.subjects.addSubject}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={subjects}
          renderItem={renderSubject}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingSubject ? t.subjects.edit : t.subjects.addSubject}
            </Text>

            <Text style={styles.label}>{t.subjects.subjectName}</Text>
            <TextInput
              style={styles.input}
              value={subjectName}
              onChangeText={setSubjectName}
              placeholder={t.subjects.subjectName}
            />

            <Text style={styles.label}>{t.subjects.icon}</Text>
            <View style={styles.iconGrid}>
              {ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    selectedIcon === icon && styles.iconOptionSelected,
                  ]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <Text style={styles.iconOptionText}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>{t.common.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>{t.common.save}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  iconOptionText: {
    fontSize: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
