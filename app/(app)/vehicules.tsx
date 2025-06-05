import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useVehiculeQuery } from '@/features/vehicule/useVehiculeQuery';

export default function Vehicules() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useVehiculeQuery({ page });

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

    const handleNext = () => {
        if (data?.meta?.current_page < data?.meta?.last_page) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.matricule}</Text>
                        <Text>Type: {item.type}</Text>
                        <Text>Marque: {item.marque}</Text>
                        <Text>Capacité: {item.capacite}</Text>
                        <Text>Ville: {item.ville}</Text>
                        <Text>Usage: {item.usage}</Text>
                        <Text>En circulation depuis: {new Date(item.dateMiseEnCirculation).toLocaleDateString()}</Text>
                        <Text>Status: {item.active ? 'Actif' : 'Inactif'}</Text>
                    </View>
                )}
                ListFooterComponent={
                    <View style={styles.pagination}>
                        <Button title="Précédent" onPress={handlePrevious} disabled={page === 1} />
                        <Text>Page {page}</Text>
                        <Button title="Suivant" onPress={handleNext} disabled={page === data?.meta?.last_page} />
                    </View>
                }
            />
            {isFetching && <ActivityIndicator style={styles.fetching} />}
        </View>
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
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    fetching: {
        marginTop: 10,
    },
});
