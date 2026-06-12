import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language } from './i18n';

const LANGUAGE_KEY = '@bilimli_language';
const SUBJECTS_KEY = '@bilimli_subjects';
const TOPICS_KEY = '@bilimli_topics';
const TESTS_KEY = '@bilimli_tests';
const MEDIA_KEY = '@bilimli_media';
const TEXTBOOKS_KEY = '@bilimli_textbooks';

export interface Subject {
  id: string;
  name: string;
  icon: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  answers: string[];
  correctAnswers: number[];
  points: number;
}

export interface Test {
  id: string;
  subjectId?: string;
  topicId?: string;
  title: string;
  questions: TestQuestion[];
}

export interface MediaItem {
  id: string;
  subjectId?: string;
  topicId?: string;
  name: string;
  url: string;
  type: 'video' | 'image' | 'document' | 'link';
}

export interface Textbook {
  id: string;
  subjectId?: string;
  topicId?: string;
  name: string;
  url: string;
}

export const getLanguage = async (): Promise<Language> => {
  try {
    const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return (lang as Language) || 'ru';
  } catch (error) {
    return 'ru';
  }
};

export const setLanguage = async (language: Language): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export const getTranslation = (language: Language) => {
  return translations[language];
};

// Subjects CRUD
export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const data = await AsyncStorage.getItem(SUBJECTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting subjects:', error);
    return [];
  }
};

export const saveSubject = async (subject: Subject): Promise<void> => {
  try {
    const subjects = await getSubjects();
    const existingIndex = subjects.findIndex(s => s.id === subject.id);
    
    if (existingIndex >= 0) {
      subjects[existingIndex] = subject;
    } else {
      subjects.push(subject);
    }
    
    await AsyncStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
  } catch (error) {
    console.error('Error saving subject:', error);
  }
};

export const deleteSubject = async (id: string): Promise<void> => {
  try {
    const subjects = await getSubjects();
    const filtered = subjects.filter(s => s.id !== id);
    await AsyncStorage.setItem(SUBJECTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting subject:', error);
  }
};

// Topics CRUD
export const getTopics = async (subjectId?: string): Promise<Topic[]> => {
  try {
    const data = await AsyncStorage.getItem(TOPICS_KEY);
    let topics: Topic[] = data ? JSON.parse(data) : [];
    
    if (subjectId) {
      topics = topics.filter(t => t.subjectId === subjectId);
    }
    
    return topics;
  } catch (error) {
    console.error('Error getting topics:', error);
    return [];
  }
};

export const saveTopic = async (topic: Topic): Promise<void> => {
  try {
    const topics = await getTopics();
    const existingIndex = topics.findIndex(t => t.id === topic.id);
    
    if (existingIndex >= 0) {
      topics[existingIndex] = topic;
    } else {
      topics.push(topic);
    }
    
    await AsyncStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  } catch (error) {
    console.error('Error saving topic:', error);
  }
};

export const deleteTopic = async (id: string): Promise<void> => {
  try {
    const topics = await getTopics();
    const filtered = topics.filter(t => t.id !== id);
    await AsyncStorage.setItem(TOPICS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting topic:', error);
  }
};

// Tests CRUD
export const getTests = async (subjectId?: string, topicId?: string): Promise<Test[]> => {
  try {
    const data = await AsyncStorage.getItem(TESTS_KEY);
    let tests: Test[] = data ? JSON.parse(data) : [];
    
    if (subjectId) {
      tests = tests.filter(t => t.subjectId === subjectId);
    }
    
    if (topicId) {
      tests = tests.filter(t => t.topicId === topicId);
    }
    
    return tests;
  } catch (error) {
    console.error('Error getting tests:', error);
    return [];
  }
};

export const saveTest = async (test: Test): Promise<void> => {
  try {
    const tests = await getTests();
    const existingIndex = tests.findIndex(t => t.id === test.id);
    
    if (existingIndex >= 0) {
      tests[existingIndex] = test;
    } else {
      tests.push(test);
    }
    
    await AsyncStorage.setItem(TESTS_KEY, JSON.stringify(tests));
  } catch (error) {
    console.error('Error saving test:', error);
  }
};

export const deleteTest = async (id: string): Promise<void> => {
  try {
    const tests = await getTests();
    const filtered = tests.filter(t => t.id !== id);
    await AsyncStorage.setItem(TESTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting test:', error);
  }
};

// Media CRUD
export const getMediaItems = async (subjectId?: string, topicId?: string): Promise<MediaItem[]> => {
  try {
    const data = await AsyncStorage.getItem(MEDIA_KEY);
    let items: MediaItem[] = data ? JSON.parse(data) : [];
    
    if (subjectId) {
      items = items.filter(i => i.subjectId === subjectId);
    }
    
    if (topicId) {
      items = items.filter(i => i.topicId === topicId);
    }
    
    return items;
  } catch (error) {
    console.error('Error getting media items:', error);
    return [];
  }
};

export const saveMediaItem = async (item: MediaItem): Promise<void> => {
  try {
    const items = await getMediaItems();
    const existingIndex = items.findIndex(i => i.id === item.id);
    
    if (existingIndex >= 0) {
      items[existingIndex] = item;
    } else {
      items.push(item);
    }
    
    await AsyncStorage.setItem(MEDIA_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving media item:', error);
  }
};

export const deleteMediaItem = async (id: string): Promise<void> => {
  try {
    const items = await getMediaItems();
    const filtered = items.filter(i => i.id !== id);
    await AsyncStorage.setItem(MEDIA_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting media item:', error);
  }
};

// Textbooks CRUD
export const getTextbooks = async (subjectId?: string, topicId?: string): Promise<Textbook[]> => {
  try {
    const data = await AsyncStorage.getItem(TEXTBOOKS_KEY);
    let items: Textbook[] = data ? JSON.parse(data) : [];
    
    if (subjectId) {
      items = items.filter(i => i.subjectId === subjectId);
    }
    
    if (topicId) {
      items = items.filter(i => i.topicId === topicId);
    }
    
    return items;
  } catch (error) {
    console.error('Error getting textbooks:', error);
    return [];
  }
};

export const saveTextbook = async (textbook: Textbook): Promise<void> => {
  try {
    const textbooks = await getTextbooks();
    const existingIndex = textbooks.findIndex(t => t.id === textbook.id);
    
    if (existingIndex >= 0) {
      textbooks[existingIndex] = textbook;
    } else {
      textbooks.push(textbook);
    }
    
    await AsyncStorage.setItem(TEXTBOOKS_KEY, JSON.stringify(textbooks));
  } catch (error) {
    console.error('Error saving textbook:', error);
  }
};

export const deleteTextbook = async (id: string): Promise<void> => {
  try {
    const textbooks = await getTextbooks();
    const filtered = textbooks.filter(t => t.id !== id);
    await AsyncStorage.setItem(TEXTBOOKS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting textbook:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
