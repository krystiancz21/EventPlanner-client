'use client';

import { useState, useEffect } from 'react';
import { login } from '../../lib/api/auth';
import { useGlobal } from '@/lib/context/GlobalDataContext';
import {
  Box,
  Button,
  Input,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import Link from 'next/link';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login: loginContext } = useGlobal();

  // Walidacja pola email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email jest wymagany');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Wprowadź poprawny adres email');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Walidacja pola hasło
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Hasło jest wymagane');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Hasło musi mieć co najmniej 6 znaków');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset błędów
    setError('');
    
    // Walidacja danych formularza
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      
      if (response?.accessToken) {
        // Zapisz token w localStorage jeśli włączono "Zapamiętaj mnie"
        if (rememberMe && typeof window !== 'undefined') {
          localStorage.setItem('rememberEmail', email);
        } else if (typeof window !== 'undefined') {
          localStorage.removeItem('rememberEmail');
        }

        // Używamy kontekstu do zarządzania stanem logowania
        loginContext(response.accessToken, { 
          email, 
          name: email.split('@')[0] // Tymczasowo używamy części adresu email jako imienia
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
      setError('Nieprawidłowe dane logowania. Spróbuj ponownie.');
      
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
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }
  }, []);

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <Stack gap={4}>
        {error && (
          <Box bg="#FFEBEE" p={3} borderRadius="md" borderLeftWidth="4px" borderLeftColor="var(--primary)">
            <Text color="var(--primary)" fontWeight="medium">{error}</Text>
          </Box>
        )}
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Email</Text>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(email)} 
            placeholder="twoj@email.com"
            borderRadius="md"
            borderColor={emailError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {emailError && <Text color="var(--primary)" fontSize="sm" mt={1}>{emailError}</Text>}
        </Box>
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Hasło</Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            onBlur={() => validatePassword(password)}
            placeholder="Wprowadź hasło"
            borderRadius="md"
            borderColor={passwordError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {passwordError && <Text color="var(--primary)" fontSize="sm" mt={1}>{passwordError}</Text>}
        </Box>
        
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
        <Button
          type="submit"
          bg="var(--primary)"
          color="white"
          width="100%"
          mt={4}
          mb={2}
          disabled={isLoading}
          _hover={{ bg: "var(--primary-hover)" }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          _active={{ bg: "var(--primary-active)" }}
        >
          {isLoading ? 'Trwa logowanie...' : 'Zaloguj się'}
        </Button>

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
