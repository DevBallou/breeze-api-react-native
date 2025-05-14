import { useQueryClient } from '@tanstack/react-query';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from "react-native";
import tw from 'twrnc';


export default function Chauffeur() {
    const queryClient = useQueryClient();

    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>Page Consultation Chauffeur</Text>
        </View>
    );
}