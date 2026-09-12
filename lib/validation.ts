import { z } from 'zod';

export const applianceSchema = z.object({
  appliance: z.enum([
    'refrigerator',
    'washing_machine',
    'dishwasher',
    'stove',
    'oven',
    'air_conditioner',
    'other',
  ]),
});

export const problemSchema = z.object({
  problem: z
    .string()
    .min(10, 'Опишите проблему подробнее — минимум 10 символов')
    .max(1000, 'Слишком длинное описание — максимум 1000 символов'),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Введите имя — минимум 2 символа')
    .max(50, 'Слишком длинное имя — максимум 50 символов'),
  phone: z
    .string()
    .min(9, 'Введите корректный номер телефона')
    .max(20, 'Слишком длинный номер')
    .regex(/^[+]?[\d\s\-()]+$/, 'Номер может содержать только цифры и символы +, -, (, )'),
  address: z
    .string()
    .min(5, 'Введите адрес — минимум 5 символов')
    .max(200, 'Слишком длинный адрес'),
  preferredTime: z
    .string()
    .min(3, 'Укажите удобное время')
    .max(100, 'Слишком длинное значение'),
  comment: z
    .string()
    .max(500, 'Слишком длинный комментарий')
    .optional()
    .or(z.literal('')),
});

export const repairRequestSchema = z.object({
  appliance: z.enum([
    'refrigerator',
    'washing_machine',
    'dishwasher',
    'stove',
    'oven',
    'air_conditioner',
    'other',
  ]),
  problem: z
    .string()
    .min(10, 'Опишите проблему подробнее — минимум 10 символов')
    .max(1000, 'Слишком длинное описание'),
  name: z
    .string()
    .min(2, 'Введите имя')
    .max(50, 'Слишком длинное имя'),
  phone: z
    .string()
    .min(9, 'Введите корректный номер телефона')
    .max(20, 'Слишком длинный номер')
    .regex(/^[+]?[\d\s\-()]+$/, 'Некорректный формат номера'),
  address: z
    .string()
    .min(5, 'Введите адрес')
    .max(200, 'Слишком длинный адрес'),
  preferredTime: z
    .string()
    .min(3, 'Укажите удобное время')
    .max(100, 'Слишком длинное значение'),
  comment: z
    .string()
    .max(500, 'Слишком длинный комментарий')
    .optional()
    .or(z.literal('')),
});

export const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Введите имя — минимум 2 символа')
    .max(50, 'Слишком длинное имя'),
  rating: z.coerce
    .number()
    .int('Оценка должна быть целым числом')
    .min(1, 'Поставьте оценку от 1 до 5')
    .max(5, 'Оценка не может быть больше 5'),
  appliance: z
    .string()
    .trim()
    .min(2, 'Укажите технику')
    .max(60, 'Слишком длинное значение'),
  text: z
    .string()
    .trim()
    .min(10, 'Напишите отзыв — минимум 10 символов')
    .max(1000, 'Слишком длинный отзыв — максимум 1000 символов'),
  location: z
    .string()
    .trim()
    .max(80, 'Слишком длинное значение')
    .optional()
    .or(z.literal('')),
});

export type RepairRequest = z.infer<typeof repairRequestSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;

export type FormStep = 1 | 2 | 3 | 4;
