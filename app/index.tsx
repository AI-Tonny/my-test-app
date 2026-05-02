import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAudioRecorder, AudioModule, RecordingPresets, createAudioPlayer } from 'expo-audio';

export default function Index() {
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedUri, setRecordedUri] = useState<string | null>(null);
    const [player, setPlayer] = useState<ReturnType<typeof createAudioPlayer> | null>(null);

    const startRecording = async () => {
        const status = await AudioModule.requestRecordingPermissionsAsync();

        if (!status.granted) {
            Alert.alert('Доступ заборонено', 'Надайте дозвіл на використання мікрофона в налаштуваннях.');
            return;
        }

        player?.pause();

        await AudioModule.setAudioModeAsync({
            allowsRecording: true,
            playsInSilentMode: true,
            interruptionMode: 'doNotMix',
        });

        try {
            await audioRecorder.prepareToRecordAsync();
            audioRecorder.record();
            setIsRecording(true);
        } catch (error) {
            console.error('Помилка запису:', error);
        }
    };

    const stopRecording = async () => {
        try {
            await audioRecorder.stop();
            setIsRecording(false);

            const uri = audioRecorder.uri;
            if (!uri) return;

            setRecordedUri(uri);

            // Перемикаємо режим на відтворення
            await AudioModule.setAudioModeAsync({
                allowsRecording: false,
                playsInSilentMode: true,
                interruptionMode: 'doNotMix',
            });

            // Завжди створюємо новий плеєр щоб URI точно оновився
            player?.remove();
            const newPlayer = createAudioPlayer({ uri });
            setPlayer(newPlayer);

        } catch (error) {
            console.error('Помилка зупинки:', error);
        }
    };

    const playRecording = useCallback(async () => {
        if (!player) return;

        await AudioModule.setAudioModeAsync({
            allowsRecording: false,
            playsInSilentMode: true,
            interruptionMode: 'doNotMix',
        });

        player.seekTo(0);
        player.play();
    }, [player]);

    const stopPlaying = useCallback(() => {
        player?.pause();
    }, [player]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎙️ Аудіо запис</Text>

            <TouchableOpacity
                style={[styles.btn, isRecording ? styles.btnStop : styles.btnRecord]}
                onPress={isRecording ? stopRecording : startRecording}
            >
                <Text style={styles.btnText}>
                    {isRecording ? '⏹ Зупинити запис' : '🔴 Почати запис'}
                </Text>
            </TouchableOpacity>

            {recordedUri && (
                <View style={styles.playbackRow}>
                    <TouchableOpacity style={[styles.btn, styles.btnPlay]} onPress={playRecording}>
                        <Text style={styles.btnText}>▶️ Відтворити</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, styles.btnPause]} onPress={stopPlaying}>
                        <Text style={styles.btnText}>⏸ Пауза</Text>
                    </TouchableOpacity>
                </View>
            )}

            {recordedUri && (
                <Text style={styles.status}>✅ Запис збережено: {recordedUri.split('/').pop()}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    btn: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        marginVertical: 8,
        minWidth: 200,
        alignItems: 'center',
        elevation: 2,
    },
    btnRecord: { backgroundColor: '#4CAF50' },
    btnStop:   { backgroundColor: '#f44336' },
    btnPlay:   { backgroundColor: '#2196F3' },
    btnPause:  { backgroundColor: '#FF9800' },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    playbackRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    status: {
        marginTop: 20,
        color: 'gray',
        fontSize: 12,
        textAlign: 'center',
    },
});