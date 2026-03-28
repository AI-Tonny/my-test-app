import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';

const SettingsScreen = () => {
    const availableLanguages = [
        { label: "Ukrainian", value: "ua" },
        { label: "English", value: "en" },
        { label: "Chinese", value: "ch" },
    ];

    const [language, setLanguage] = useState('ua');

    return (
        <View style={styles.container}>
            <View style={styles.headerCard}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Image
                        style={styles.userAvatar}
                        source={require('../../assets/image/profile_avatar.png')}
                    />
                </TouchableOpacity>

                <View style={styles.userTextInformation}>
                    <Text style={styles.userName}>Tim Ruscica</Text>
                    <Text style={styles.userAge}>28 years old</Text>
                    <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Dropdown
                style={styles.languageDropdown}
                data={availableLanguages}
                labelField="label"
                valueField="value"
                placeholder="Select Language"
                value={language}
                onChange={setLanguage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginTop: Platform.OS === 'android' ? 60 : 80,
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    userAvatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#f0f0f0',
    },
    userTextInformation: {
        marginLeft: 20,
        flex: 1,
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    userAge: {
        fontSize: 15,
        color: '#7d7d7d',
        marginTop: 4,
    },
    editButton: {
        marginTop: 12,
        backgroundColor: '#007AFF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    languageDropdown: {
        height: 50,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',

        marginHorizontal: 12,
        marginVertical: 12,
    },
});

export default SettingsScreen;