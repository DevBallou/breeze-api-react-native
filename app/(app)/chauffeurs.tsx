import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useChauffeurQuery } from '@/features/chauffeur/useChauffeurQuery';

export default function Chauffeurs() {
    const { data, isLoading, error } = useChauffeurQuery();

    if (isLoading) {
        return <ActivityIndicator size="large" style={styles.centered} />;
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error fetching chauffeurs.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Text style={styles.name}>{item.nom} {item.prenom}</Text>
                    <Text>Matricule: {item.mat}</Text>
                    <Text>Téléphone: {item.tel}</Text>
                    <Text>Téléphone 2: {item.tel2}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        padding: 16,
    },
    card: {
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});