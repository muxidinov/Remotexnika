import { z } from 'zod';

export const repairRequestSchema = z.object({
  // Kept first so the original required fields and their behaviour are unchanged.
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
  // Optional GPS coordinates captured from the customer's device.
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  // Human-readable approximation supplied by the device, e.g. "41.31, 69.24 ±30m".
  locationLabel: z
    .string()
    .max(200, 'Слишком длинное значение')
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
