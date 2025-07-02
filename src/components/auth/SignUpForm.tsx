'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Text,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { toaster } from '@/components/ui/toaster';
import { FormInput } from '@/components/ui/form/FormInput';
import { FormButton } from '@/components/ui/form/FormButton';
import { authSchemas, SignUpFormData } from '@/lib/validation';
import { register as registerUser } from '@/lib/api/auth';

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpFormData>({
    resolver: zodResolver(authSchemas.signUp),
    mode: 'onBlur'
  });

  const onSubmit = async (data: SignUpFormData) => {
    setError('');
    setIsLoading(true);

    try {
      await registerUser({ 
        email: data.email, 
        password: data.password 
      });
      
      toaster.create({
        title: 'Rejestracja zakończona powodzeniem',
        description: 'Możesz się teraz zalogować.',
        type: 'success',
        duration: 5000,
      });
      
      reset();
    } catch (error: unknown) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        setError(error.message || 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
      } else {
        setError('Wystąpił nieznany błąd podczas rejestracji. Spróbuj ponownie.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack gap={4}>
        {error && (
          <Box bg="#FFEBEE" p={3} borderRadius="md" borderLeftWidth="4px" borderLeftColor="var(--primary)">
            <Text color="var(--primary)" fontWeight="medium">{error}</Text>
          </Box>
        )}
        
        <FormInput
          label="Email"
          type="email"
          placeholder="jan.kowalski@example.com"
          {...register('email')}
          error={errors.email?.message}
          required
        />
        
        <FormInput
          label="Hasło"
          type="password"
          placeholder="Wprowadź hasło"
          {...register('password')}
          error={errors.password?.message}
          required
        />
        
        <FormInput
          label="Potwierdź hasło"
          type="password"
          placeholder="Powtórz hasło"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          required
        />
          
        <FormButton
          isLoading={isLoading}
          loadingText="Trwa rejestracja..."
        >
          Zarejestruj się
        </FormButton>

        <Box pt={3} textAlign="center">
          <Text fontSize="sm" color="gray.700">
            Masz już konto?{' '}
            <Link href="/sign-in" passHref style={{ outline: 'none' }}>
              <Text 
                as="span" 
                color="var(--primary)" 
                fontWeight="semibold" 
                _hover={{ textDecoration: 'underline' }}
                style={{ outline: 'none' }}
              >
                Zaloguj się
              </Text>
            </Link>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}