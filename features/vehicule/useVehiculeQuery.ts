import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/context/session';
import http from '@/utils/http';

export interface Vehicule {
    id: string;
    matricule: string;
    type: string;
    marque: string;
    capacite: number;
    ville: string;
    societe: string;
    usage: string;
    dateMiseEnCirculation: Date;
    active: boolean;
}

/**
 * Custom hook to fetch and cache chauffeur data.
 *
 * The Chauffeur data is set to stay in cache indefinitely (staleTime: Infinity) because:
 * 1. Chauffeur information rarely changes during a session.
 * 2. It reduces unnecessary network requests, improving performance.
 * 3. It ensures consistent chauffeur data across the app without frequent refetches.
 * 4. Any updates to chauffeur data should be manually invalidated after successful mutations.
 */
export const useVehiculeQuery = () => {
    const { session } = useSession();

    return useQuery<Vehicule[], Error>({
        queryKey: ['vehicules'],
        queryFn: () =>
            http
                .get('vehicules', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                })
                .json<Vehicule[]>(),
        staleTime: Infinity,
    });
};
