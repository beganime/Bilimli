import { Stack } from 'expo-router';
import { LanguageProvider } from '../contexts/LanguageContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="about" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="subjects" />
        <Stack.Screen name="subject/[id]" />
        <Stack.Screen name="topics/[subjectId]" />
        <Stack.Screen name="tests/[subjectId]" />
        <Stack.Screen name="media/[subjectId]" />
        <Stack.Screen name="textbooks/[subjectId]" />
      </Stack>
    </LanguageProvider>
  );
}
