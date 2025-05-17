'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { toaster } from '@/components/ui/toaster';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  // Walidacja pola imię i nazwisko
  const validateName = (name: string) => {
    if (!name) {
      setNameError('Imię i nazwisko jest wymagane');
      return false;
    } else if (name.length < 3) {
      setNameError('Imię i nazwisko musi mieć co najmniej 3 znaki');
      return false;
    }
    setNameError('');
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

  // Walidacja pola potwierdzenia hasła
  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Potwierdzenie hasła jest wymagane');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Hasła nie są identyczne');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset błędów
    setError('');
    
    // Walidacja danych formularza
    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(name);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    
    if (!isEmailValid || !isNameValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    
    setIsLoading(true);

    try {
      // Tutaj normalnie wysłalibyśmy dane rejestracyjne do API
      // Ale na razie tylko symulujemy to
      
      setTimeout(() => {
        // Pokaż komunikat o sukcesie
        toaster.create({
          title: 'Rejestracja zakończona powodzeniem',
          description: 'Na Twój adres email został wysłany link aktywacyjny.',
          type: 'success',
          duration: 5000,
        });
        
        // Czyszczenie formularza
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setIsLoading(false);
      }, 1500);
    } catch (error: unknown) {
      console.error('Registration error:', error);
      setError('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <Stack gap={4}>
        {error && (
          <Box bg="#FFEBEE" p={3} borderRadius="md" borderLeftWidth="4px" borderLeftColor="var(--primary)">
            <Text color="var(--primary)" fontWeight="medium">{error}</Text>
          </Box>
        )}
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Imię i nazwisko</Text>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) validateName(e.target.value);
            }}
            onBlur={() => validateName(name)}
            placeholder="Jan Kowalski"
            borderRadius="md"
            borderColor={nameError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {nameError && <Text color="var(--primary)" fontSize="sm" mt={1}>{nameError}</Text>}
        </Box>
        
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
            placeholder="jan.kowalski@example.com"
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
              if (confirmPassword) validateConfirmPassword(confirmPassword);
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
        
        <Box>
          <Text mb={2} fontWeight="medium" color="gray.700">Potwierdź hasło</Text>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) validateConfirmPassword(e.target.value);
            }}
            onBlur={() => validateConfirmPassword(confirmPassword)}
            placeholder="Powtórz hasło"
            borderRadius="md"
            borderColor={confirmPasswordError ? "var(--primary)" : "gray.300"}
            _hover={{ borderColor: "var(--primary)" }}
            _focus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 1px var(--primary)" }}
          />
          {confirmPasswordError && <Text color="var(--primary)" fontSize="sm" mt={1}>{confirmPasswordError}</Text>}
        </Box>
          <Button
          type="submit"
          bg="var(--primary)"
          color="white"
          width="100%"
          mt={4}
          mb={2}
          disabled={isLoading}
          _hover={{ bg: "var(--primary-hover)" }}          _focus={{
            outline: 'none',
            boxShadow: 'none'
          }}
          _active={{
            bg: "var(--primary-active)",
          }}
        >
          {isLoading ? 'Trwa rejestracja...' : 'Zarejestruj się'}
        </Button>

        <Box pt={3} textAlign="center">
          <Text fontSize="sm" color="gray.700">
            Masz już konto?{' '}            <Link href="/sign-in" passHref style={{ outline: 'none' }}>
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