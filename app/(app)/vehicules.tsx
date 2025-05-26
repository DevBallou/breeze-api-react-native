import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useVehiculeQuery } from '@/features/vehicule/useVehiculeQuery';
import ky from 'ky';

export default function Vehicules() {
    const { data, isLoading, error } = useVehiculeQuery();

    if (isLoading) {
        return <ActivityIndicator size="large" style={styles.centered} />;
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error fetching vehicules.</Text>
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
                    <Text style={styles.name}>{item.matricule}</Text>
                    <Text>Type: {item.type}</Text>
                    <Text>Marque: {item.marque}</Text>
                    <Text>Capacité: {item.capacite}</Text>
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
