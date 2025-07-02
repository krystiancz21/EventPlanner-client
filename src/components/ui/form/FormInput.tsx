import React from 'react';
import {
  Input,
  Text,
  Box,
  InputProps
} from '@chakra-ui/react';

interface FormInputProps extends Omit<InputProps, 'size'> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, ...props }, ref) => {
    return (
      <Box>
        <Text mb={2} fontWeight="medium" color="gray.700">
          {label}
          {required && <Text as="span" color="var(--primary)"> *</Text>}
        </Text>
        <Input
          {...props}
          ref={ref}
          borderRadius="md"
          borderColor={error ? "var(--primary)" : "gray.300"}
          _hover={{ borderColor: "var(--primary)" }}
          _focus={{ 
            borderColor: "var(--primary)", 
            boxShadow: "0 0 0 1px var(--primary)" 
          }}
        />
        {error && (
          <Text color="var(--primary)" fontSize="sm" mt={1}>
            {error}
          </Text>
        )}
      </Box>
    );
  }
);

FormInput.displayName = 'FormInput';