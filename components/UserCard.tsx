import { View, Text, StyleSheet } from 'react-native';

interface UserCardProps {
    user: {
        name: string;
        age: number;
        email: string;
        role: string;
    };
}

export const UserCard = ({user}: UserCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{user.name}, {user.age}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View style={styles.badge}>
                <Text style={styles.roleText}>{user.role}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    name: { fontSize: 18, fontWeight: "bold" },
    email: { marginVertical: 4 },
    badge: { alignSelf: 'flex-start', backgroundColor: '#e0e0e0', padding: 5, borderRadius: 5 },
    roleText: { fontSize: 12, textTransform: 'uppercase' }
})

export default UserCard;