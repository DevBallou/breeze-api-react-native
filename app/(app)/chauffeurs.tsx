import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Button } from 'react-native';
import { useChauffeurQuery } from '@/features/chauffeur/useChauffeurQuery';

export default function Chauffeurs() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const { data, isLoading, isFetching, error } = useChauffeurQuery({ page, search });

    const chauffeurs = data?.data || [];

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
        <View style={{ flex: 1 }}>
            <TextInput
                placeholder="Search chauffeurs..."
                value={search}
                onChangeText={(text) => {
                    setPage(1);
                    setSearch(text);
                }}
                style={styles.searchInput}
            />

            <FlatList
                data={chauffeurs}
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
                ListFooterComponent={
                    <View style={styles.pagination}>
                        <Button title="Previous" onPress={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
                        <Text>Page {page}</Text>
                        <Button title="Next" onPress={() => setPage(p => p + 1)} disabled={!data?.meta?.next_page_url} />
                    </View>
                }
            />
            {isFetching && <ActivityIndicator style={{ marginTop: 10 }} />}
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
    searchInput: {
        margin: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
        paddingHorizontal: 16,
    },
});
