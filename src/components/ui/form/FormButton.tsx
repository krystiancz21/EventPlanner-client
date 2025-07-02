import { Button, ButtonProps } from '@chakra-ui/react';

interface FormButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export function FormButton({ 
  children, 
  isLoading, 
  loadingText,
  ...props 
}: FormButtonProps) {
  return (
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
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}