import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/context/session';
import http from '@/utils/http';

export interface Chauffeur {
    id: string;
    mat: number;
    nom: string;
    prenom: string;
    tel: string;
    tel2: string;
}

interface ChauffeurApiResponse {
    data: Chauffeur[];
    meta?: {
        current_page: number;
        last_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        total: number;
    };
}

export const useChauffeurQuery = ({ page = 1, search = '' }: { page: number; search: string }) => {
    const { session } = useSession();

    return useQuery<ChauffeurApiResponse, Error>({
        queryKey: ['chauffeurs', page, search],
        queryFn: () =>
            http
                .get(`chauffeurs?page=${page}&search=${encodeURIComponent(search)}`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                })
                .json<ChauffeurApiResponse>(),
        keepPreviousData: true,
    });
};