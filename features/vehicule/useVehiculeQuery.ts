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

interface VehiculeApiResponse {
    data: Vehicule[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

export const useVehiculeQuery = ({ page }: { page: number }) => {
    const { session } = useSession();

    return useQuery<VehiculeApiResponse, Error>({
        queryKey: ['vehicules', page],
        queryFn: () =>
            http
                .get(`vehicules?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                })
                .json<VehiculeApiResponse>(),
        keepPreviousData: true,
    });
};
