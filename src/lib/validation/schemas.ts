export * from './schemas';
import { z } from 'zod';

const emailValidation = z
  .string()
  .min(1, 'Email jest wymagany')
  .email('Wprowadź poprawny adres email');

const passwordValidation = z
  .string()
  .min(1, 'Hasło jest wymagane')
  .min(6, 'Hasło musi mieć co najmniej 6 znaków');
//   .regex(passwordValidation, {
//       message: 'Your password is not valid',
//     })
// const passwordValidation = new RegExp(
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// );

export const authSchemas = {
  signIn: z.object({
    email: emailValidation,
    password: passwordValidation,
  }),

  signUp: z.object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z
      .string()
      .min(1, 'Potwierdzenie hasła jest wymagane')
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła nie są identyczne',
    path: ['confirmPassword']
  }),

//   forgotPassword: z.object({
//     email: emailValidation,
//   }),

//   resetPassword: z.object({
//     password: passwordValidation,
//     confirmPassword: z
//       .string()
//       .min(1, 'Potwierdzenie hasła jest wymagane')
//   }).refine((data) => data.password === data.confirmPassword, {
//     message: 'Hasła nie są identyczne',
//     path: ['confirmPassword']
//   })
};

// Schematy dla innych części aplikacji
export const profileSchemas = {
  updateProfile: z.object({
    name: z
      .string()
      .min(1, 'Imię jest wymagane')
      .min(2, 'Imię musi mieć co najmniej 2 znaki'),
    email: emailValidation,
    phone: z
      .string()
      .regex(/^[+]?[\d\s\-()]{9,}$/, 'Nieprawidłowy numer telefonu')
      .optional()
  })
};

// Typy TypeScript
export type SignInFormData = z.infer<typeof authSchemas.signIn>;
export type SignUpFormData = z.infer<typeof authSchemas.signUp>;
// export type ForgotPasswordFormData = z.infer<typeof authSchemas.forgotPassword>;
// export type ResetPasswordFormData = z.infer<typeof authSchemas.resetPassword>;
export type UpdateProfileFormData = z.infer<typeof profileSchemas.updateProfile>;