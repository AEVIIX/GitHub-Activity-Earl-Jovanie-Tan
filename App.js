//install first
//npm install react-native-qrcode-svg react-native-svg
//npx expo install @expo/vector-icons

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Keyboard,
  Clipboard,
  Share,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const COLOR_PRESETS = [
  { name: 'Dark', fg: '#0F172A', bg: '#FFFFFF' },
  { name: 'Indigo', fg: '#4F46E5', bg: '#EEF2FF' },
  { name: 'Emerald', fg: '#059669', bg: '#ECFDF5' },
  { name: 'Rose', fg: '#E11D48', bg: '#FFF1F2' },
  { name: 'Violet', fg: '#7C3AED', bg: '#F5F3FF' },
];

export default function App() {
  const [value, setValue] = useState('https://reactnative.dev');
  const [activeValue, setActiveValue] = useState('https://reactnative.dev');
  const [colorScheme, setColorScheme] = useState(COLOR_PRESETS[0]);
  const [qrRef, setQrRef] = useState(null);

  const handleGenerate = () => {
    if (value.trim()) {
      setActiveValue(value.trim());
      Keyboard.dismiss();
    }
  };

  const handleClear = () => {
    setValue('');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this link: ${activeValue}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = () => {
    if (activeValue) {
      Clipboard.setString(activeValue);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>QR Studio</Text>
            <Text style={styles.headerSubtitle}>
              Create customized QR codes instantly
            </Text>
          </View>

          {/* QR Display Card */}
          <View style={styles.qrCard}>
            <View
              style={[
                styles.qrFrame,
                { backgroundColor: colorScheme.bg },
              ]}
            >
              {activeValue ? (
                <QRCode
                  value={activeValue}
                  size={190}
                  color={colorScheme.fg}
                  backgroundColor={colorScheme.bg}
                  getRef={(c) => setQrRef(c)}
                />
              ) : (
                <Text style={styles.placeholderText}>
                  Enter text or URL below
                </Text>
              )}
            </View>

            {/* Quick Actions */}
            {activeValue ? (
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtn} onPress={handleCopy}>
                  <Text style={styles.actionBtnText}><Ionicons name="copy-outline" size={16} color="#F1F5F9" style={{ marginRight: 6 }} /> Copy Link</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
                  <Text style={styles.actionBtnText}><Ionicons name="share-outline" size={16} color="#F1F5F9" style={{ marginRight: 6 }} /> Share</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          {/* Color Customization Presets */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Theme Style</Text>
            <View style={styles.colorPalette}>
              {COLOR_PRESETS.map((preset) => {
                const isSelected = preset.name === colorScheme.name;
                return (
                  <TouchableOpacity
                    key={preset.name}
                    style={[
                      styles.colorBubble,
                      { backgroundColor: preset.fg },
                      isSelected && styles.selectedBubble,
                    ]}
                    onPress={() => setColorScheme(preset)}
                  >
                    {isSelected && <Text style={styles.checkMark}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Input Section */}
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>Content / URL</Text>
              {value.length > 0 && (
                <TouchableOpacity onPress={handleClear}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              )}
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="e.g. https://example.com or Wi-Fi info"
              placeholderTextColor="#64748B"
              multiline
              value={value}
              onChangeText={setValue}
            />

            <TouchableOpacity
              style={[
                styles.generateBtn,
                !value.trim() && styles.generateBtnDisabled,
              ]}
              onPress={handleGenerate}
              disabled={!value.trim()}
            >
              <Text style={styles.generateBtnText}>Generate QR Code</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A2AADB',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#006199',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#000000',
    marginTop: 4,
  },
  qrCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  qrFrame: {
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderText: {
    color: '#64748B',
    fontSize: 14,
    height: 190,
    textAlignVertical: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  actionBtn: {
    backgroundColor: '#334155',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  actionBtnText: {
    color: '#F1F5F9',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBubble: {
    borderWidth: 3,
    borderColor: '#F8FAFC',
  },
  checkMark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    color: '#818CF8',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clearText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  textInput: {
    color: '#F8FAFC',
    fontSize: 16,
    minHeight: 70,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  generateBtn: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  generateBtnDisabled: {
    backgroundColor: '#334155',
    shadowOpacity: 0,
  },
  generateBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});