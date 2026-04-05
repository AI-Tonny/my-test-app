import { View, TextInput, StyleSheet, Platform, Text } from 'react-native';
import { useState, useEffect } from "react";
import APIService from "@/services/APIService";

export default function NewsScreen() {
    const API = APIService.getInstance();
    const [numberOfPost, setNumberOfPost] = useState('');
    const [currentPost, setCurrentPost] = useState<any>(null);

    const onChangeNumber = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setNumberOfPost(numericValue);
    }

    useEffect(() => {
        const fetchPost = async () => {
            if (!numberOfPost) {
                setCurrentPost(null);
                return;
            }
            try {
                const data = await API.getData(`/posts/${numberOfPost}`);
                setCurrentPost(data);
            } catch (error) {
                console.warn("Помилка завантаження:", error);
            }
        }
        fetchPost();
    }, [numberOfPost]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter number of post:"
                keyboardType="numeric"
                value={numberOfPost}
                onChangeText={onChangeNumber}
            />

            {currentPost && (
                <View style={styles.newsContainer}>
                    <Text style={styles.title}>{currentPost.title}</Text>
                    <Text style={styles.body}>{currentPost.body}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === "android" ? 48 : 60,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    newsContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'capitalize',
    },
    body: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    }
})