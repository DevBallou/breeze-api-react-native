import { router } from 'expo-router';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { Image, Pressable, Text, View } from 'react-native';
import tw from 'twrnc';

import { TextInput } from '@/components/form/text-input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/context/toast';
import type { ForgotPasswordUser } from '@/features/auth/useAuthMutations';
import { useForgotPasswordMutation } from '@/features/auth/useAuthMutations';
import { handleApiErrors } from '@/utils/helpers';

export default function Login() {
  const [status, setStatus] = useState<string>('');
  const { showToast } = useToast();
  const forgotPassword = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordUser>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordUser> = async (
    data: ForgotPasswordUser,
  ) => {
    forgotPassword.mutate(data, {
      onSuccess: ({ status: statusMessage }: { status: string }) => {
        setStatus(statusMessage);
      },
      onError: async (error) => {
        await handleApiErrors({ error, setError, showToast });
      },
    });
  };

  return (
    <View style={tw`flex-1 w-full items-center justify-center bg-gray-100`}>
      <Image source={require('../../assets/images/logo_stcr.png')} style={tw`w-[100px] h-[100px] self-center mb-10`} />
      <View style={tw`px-4 w-full max-w-sm`}>
        <Text style={tw`text-4xl font-bold mb-2 text-gray-900`}>
          Mot de passe oublié ?
        </Text>

        <Text style={tw`text-xs mb-6 text-gray-900`}>
          Vous avez oublié votre mot de passe ? Pas de problème. 
          Indiquez simplement votre adresse e-mail et nous vous enverrons un lien de réinitialisation 
          qui vous permettra d&apos;en choisir un nouveau.
        </Text>

        <View style={tw`flex flex-col mb-4`}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize="none"
                placeholder="Adresse E-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="email-address"
                value={value}
                error={
                  errors?.email?.type === 'required' || errors?.email?.message
                }
              />
            )}
          />
        </View>

        <Button
          text="Envoyer le lien de réinitialisation"
          disabled={forgotPassword.isPending}
          onPress={handleSubmit(onSubmit)}
        />

        {status !== '' && (
          <View style={tw`flex flex-col mt-6`}>
            <Text style={tw`text-sm text-center text-green-600`}>{status}</Text>
          </View>
        )}

        <Pressable onPress={() => router.push('/login')}>
          <Text style={tw`text-center text-gray-600 font-bold mt-6`}>
            Retour
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
