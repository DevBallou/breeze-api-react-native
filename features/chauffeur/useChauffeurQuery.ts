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

export const useChauffeurQuery = () => {
    const { session } = useSession();

    return useQuery<Chauffeur[], Error>({
        queryKey: ['chauffeurs'],
        queryFn: () =>
            http
                .get('chauffeurs', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                })
                .json<Chauffeur[]>(),
        staleTime: Infinity,
    });
};