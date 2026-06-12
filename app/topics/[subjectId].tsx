import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, Modal } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTopics, saveTopic, deleteTopic, Topic, generateId } from '../../utils/storage';

export default function TopicsScreen() {
  const { t } = useLanguage();
  const params = useLocalSearchParams<{ subjectId: string }>();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [topicName, setTopicName] = useState('');

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    const data = await getTopics(params.subjectId);
    setTopics(data);
  };

  const openAddModal = () => {
    setEditingTopic(null);
    setTopicName('');
    setModalVisible(true);
  };

  const openEditModal = (topic: Topic) => {
    setEditingTopic(topic);
    setTopicName(topic.name);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!topicName.trim()) {
      Alert.alert(t.common.error, 'Введите название темы');
      return;
    }

    const topic: Topic = {
      id: editingTopic?.id || generateId(),
      subjectId: params.subjectId,
      name: topicName.trim(),
    };

    await saveTopic(topic);
    setModalVisible(false);
    loadTopics();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t.common.delete,
      'Вы уверены?',
      [
        { text: t.common.cancel, style: 'cancel' },
        { text: t.common.delete, style: 'destructive', onPress: async () => {
          await deleteTopic(id);
          loadTopics();
        }},
      ]
    );
  };

  const renderTopic = ({ item }: { item: Topic }) => (
    <TouchableOpacity 
      style={styles.topicCard}
      onPress={() => {}}
    >
      <View style={styles.topicIcon}>
        <Ionicons name="layers-outline" size={24} color="#2196F3" />
      </View>
      <View style={styles.topicInfo}>
        <Text style={styles.topicName}>{item.name}</Text>
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
        <Link href={`/subject/${params.subjectId}`} asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back-outline" size={28} color="#333" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>{t.topics.title}</Text>
        <TouchableOpacity onPress={openAddModal}>
          <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {topics.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="layers-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>{t.home.noSubjects}</Text>
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>{t.topics.addTopic}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={topics}
          renderItem={renderTopic}
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
              {editingTopic ? t.subjects.edit : t.topics.addTopic}
            </Text>

            <Text style={styles.label}>{t.topics.topicName}</Text>
            <TextInput
              style={styles.input}
              value={topicName}
              onChangeText={setTopicName}
              placeholder={t.topics.topicName}
            />

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
  topicCard: {
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
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
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
    marginBottom: 20,
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
