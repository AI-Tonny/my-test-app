import { View, FlatList, RefreshControl, StyleSheet, Platform } from "react-native";
import { useState } from "react";

import { UserCard } from "@/components/UserCard";

const ProfileScreen = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Bob", age: 16, email: "bob@example.com", role: "user", createdAt: "2024-01-15" },
        { id: 2, name: "Charlie", age: 22, email: "charlie@example.com", role: "admin", createdAt: "2023-11-03" },
    ]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = () => {
        setIsRefreshing(true);

        setTimeout(() => {
            const nextUserId = users.length + 1;
            const newUser = {
                id: nextUserId,
                name: "User #" + nextUserId,
                age: 15,
                email: `user${nextUserId}@gmail.com`,
                role: "user",
                createdAt: "2024-01-15"
            }

            setUsers(prevUsers => [...prevUsers, newUser]);

            setIsRefreshing(false);
        }, 2000);
    }

    return (
        <View style={styles.profileContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>}
                data={users}
                renderItem={({item}) => (<UserCard user={item}/>)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 48 : 60,
    }
})

export default ProfileScreen;