'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../../lib/api/auth';
import { useGlobal } from '@/lib/context/GlobalDataContext';
import {
  Box,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { FormInput } from '@/components/ui/form/FormInput';
import { FormButton } from '@/components/ui/form/FormButton';
import { authSchemas, SignInFormData } from '@/lib/validation';
import Link from 'next/link';

export default function SignInForm() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login: loginContext } = useGlobal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<SignInFormData>({
    resolver: zodResolver(authSchemas.signIn),
    mode: 'onBlur'
  });

  const email = watch('email');

  const onSubmit = async (data: SignInFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await login({ email: data.email, password: data.password });
      
      if (response?.accessToken) {
        // Zapisz token w localStorage jeśli włączono "Zapamiętaj mnie"
        if (rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('rememberEmail', data.email);
        } else if (typeof window !== 'undefined') {
          localStorage.removeItem('rememberEmail');
        }

        // Używamy kontekstu do zarządzania stanem logowania
        loginContext(response.accessToken, { 
          email: data.email, 
          name: data.email.split('@')[0] // Tymczasowo używamy części adresu email jako imienia
        });
        
        // Pokaż komunikat o sukcesie
        toaster.create({
          title: 'Zalogowano pomyślnie',
          type: 'success',
          duration: 5000,
        });
      } else {
        console.error('Token not found in response', response);
        throw new Error('Authentication failed - no token received');
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        setError(error.message || 'Nieprawidłowe dane logowania. Spróbuj ponownie.');
      } else {
        setError('Nieprawidłowe dane logowania. Spróbuj ponownie.');
      }
      
      // Pokaż komunikat o błędzie
      toaster.create({
        title: 'Błąd logowania',
        description: 'Nieprawidłowy email lub hasło. Spróbuj ponownie.',
        type: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Odczytanie zapamiętanego emaila z localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('rememberEmail');
      if (savedEmail) {
        setValue('email', savedEmail);
        setRememberMe(true);
      }
    }
  }, [setValue]);

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
          placeholder="twoj@email.com"
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
        
        <Flex justify="space-between" width="full" align="center">
          <Box display="flex" alignItems="center">
            <input 
              type="checkbox" 
              id="rememberMe"
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <Text fontSize="sm" color="gray.700">Zapamiętaj mnie</Text>
          </Box>
          <Link href="/forgot-password" passHref style={{ outline: 'none' }}>
            <Text 
                 fontSize="sm" 
                 color="var(--primary)" 
                 fontWeight="medium" 
                 _hover={{ textDecoration: 'underline' }}
                 style={{ outline: 'none' }}
            >
              Zapomniałeś hasła?
            </Text>
          </Link>
        </Flex>

        <FormButton
          isLoading={isLoading}
          loadingText="Trwa logowanie..."
        >
          Zaloguj się
        </FormButton>

        <Box pt={3} textAlign="center">
          <Text fontSize="sm" color="gray.700">
            Nie masz jeszcze konta?{' '}
            <Link href="/sign-up" passHref style={{ outline: 'none' }}>
              <Text 
                   as="span" 
                   color="var(--primary)" 
                   fontWeight="semibold" 
                   _hover={{ textDecoration: 'underline' }}
                   style={{ outline: 'none' }}
              >
                Zarejestruj się
              </Text>
            </Link>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}