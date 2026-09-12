import {
  Refrigerator,
  WashingMachine,
  CircleDot,
  CookingPot,
  Microwave,
  AirVent,
  Wind,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

export type ApplianceKey =
  | 'refrigerator'
  | 'washing_machine'
  | 'dishwasher'
  | 'stove'
  | 'oven'
  | 'air_conditioner'
  | 'other';

export interface ApplianceType {
  key: ApplianceKey;
  label: string;
  icon: LucideIcon;
  shortDesc: string;
}

export const applianceTypes: ApplianceType[] = [
  {
    key: 'refrigerator',
    label: 'Холодильник',
    icon: Refrigerator,
    shortDesc: 'Не морозит, течёт, шумит',
  },
  {
    key: 'washing_machine',
    label: 'Стиральная машина',
    icon: WashingMachine,
    shortDesc: 'Не сливает, не крутит, течёт',
  },
  {
    key: 'dishwasher',
    label: 'Посудомоечная машина',
    icon: CircleDot,
    shortDesc: 'Не моет, не сушит, ошибки',
  },
  {
    key: 'stove',
    label: 'Плита',
    icon: CookingPot,
    shortDesc: 'Не греет, не зажигается',
  },
  {
    key: 'oven',
    label: 'Духовка',
    icon: Microwave,
    shortDesc: 'Не нагревает, не включается',
  },
  {
    key: 'air_conditioner',
    label: 'Кондиционер',
    icon: AirVent,
    shortDesc: 'Не холодит, течёт, шумит',
  },
  {
    key: 'other',
    label: 'Другая техника',
    icon: HelpCircle,
    shortDesc: 'Сушильная машина, вытяжка и др.',
  },
];

export function getApplianceLabel(key: ApplianceKey): string {
  return applianceTypes.find((a) => a.key === key)?.label ?? key;
}

export interface ServiceItem {
  id: ApplianceKey;
  title: string;
  description: string;
  priceFrom: number;
  features: string[];
  icon: LucideIcon;
}

export const services: ServiceItem[] = [
  {
    id: 'refrigerator',
    title: 'Ремонт холодильников',
    description:
      'Устраняем утечки фреона, заменяем компрессоры, термостаты и уплотнители. Восстанавливаем охлаждение за один визит.',
    priceFrom: 100000,
    features: ['Заправка фреона', 'Замена компрессора', 'Ремонт электроники'],
    icon: Refrigerator,
  },
  {
    id: 'washing_machine',
    title: 'Ремонт стиральных машин',
    description:
      'Чиним систему слива, заменяем подшипники и ТЭНы, устраняем протечки и ошибки на дисплее.',
    priceFrom: 100000,
    features: ['Замена ТЭНа', 'Ремонт слива', 'Замена подшипников'],
    icon: WashingMachine,
  },
  {
    id: 'dishwasher',
    title: 'Ремонт посудомоечных машин',
    description:
      'Восстанавливаем мойку, сушку и подачу воды. Устраняем засоры и меняем циркуляционные насосы.',
    priceFrom: 90000,
    features: ['Чистка засоров', 'Замена насоса', 'Ремонт модуля'],
    icon: CircleDot,
  },
  {
    id: 'stove',
    title: 'Ремонт плит',
    description:
      'Ремонт газовых и электрических плит. Замена конфорок, ремонт газ-контроля и поджига.',
    priceFrom: 80000,
    features: ['Замена конфорок', 'Ремонт газ-контроля', 'Чистка форсунок'],
    icon: CookingPot,
  },
  {
    id: 'oven',
    title: 'Ремонт духовых шкафов',
    description:
      'Замена ТЭНов, ремонт терморегуляторов и электронных плат. Восстанавливаем равномерный нагрев.',
    priceFrom: 90000,
    features: ['Замена ТЭНа', 'Ремонт термостата', 'Замена стекла'],
    icon: Microwave,
  },
  {
    id: 'air_conditioner',
    title: 'Ремонт кондиционеров',
    description:
      'Заправка фреона, чистка сплит-систем, замена компрессоров. Подготовка к сезону и срочный ремонт.',
    priceFrom: 120000,
    features: ['Заправка фреона', 'Чистка сплит-системы', 'Замена компрессора'],
    icon: AirVent,
  },
];

export interface PriceItem {
  service: string;
  priceFrom: number;
  note?: string;
}

export const pricing: PriceItem[] = [
  { service: 'Диагностика', priceFrom: 50000, note: 'Бесплатно при ремонте' },
  { service: 'Ремонт холодильника', priceFrom: 100000 },
  { service: 'Ремонт стиральной машины', priceFrom: 100000 },
  { service: 'Ремонт посудомоечной машины', priceFrom: 90000 },
  { service: 'Ремонт плиты', priceFrom: 80000 },
  { service: 'Ремонт духового шкафа', priceFrom: 90000 },
  { service: 'Ремонт кондиционера', priceFrom: 120000 },
  { service: 'Замена запчастей', priceFrom: 30000, note: 'Цена детали' },
];

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

import {
  Zap,
  Wrench,
  ShieldCheck,
  Home,
  BadgePercent,
  Headphones,
} from 'lucide-react';

export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: 'Быстрый выезд',
    description: 'Мастер приедет в течение 1–2 часов после заявки по всему Ташкенту.',
  },
  {
    icon: Wrench,
    title: 'Опытные мастера',
    description: 'Сертифицированные специалисты с опытом более 8 лет работы с бытовой техникой.',
  },
  {
    icon: BadgePercent,
    title: 'Честные цены',
    description: 'Окончательную стоимость называем после диагностики — без скрытых платежей.',
  },
  {
    icon: Home,
    title: 'Выезд на дом',
    description: 'Ремонтируем на месте — не нужно никуда везти технику, экономим ваше время.',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия на работу',
    description: 'Даём гарантию до 12 месяцев на все виды ремонта и заменённые запчасти.',
  },
  {
    icon: Headphones,
    title: 'Поддержка клиентов',
    description: 'Отвечаем на вопросы и консультируем после ремонта в любое удобное время.',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Оставляете заявку',
    description: 'Заполняете форму на сайте или звоните — выбрав удобный способ связи.',
  },
  {
    number: '02',
    title: 'Мы связываемся с вами',
    description: 'Менеджер перезвонит в течение 15 минут и уточнит детали поломки.',
  },
  {
    number: '03',
    title: 'Мастер приезжает',
    description: 'В назначенное время специалист приезжает с инструментами и запчастями.',
  },
  {
    number: '04',
    title: 'Выполняем ремонт',
    description: 'Проводим диагностику, согласовываем стоимость и чиним технику на месте.',
  },
];

export const brands: string[] = [
  'Samsung',
  'LG',
  'Bosch',
  'Beko',
  'Artel',
  'Indesit',
  'Haier',
  'Midea',
  'Electrolux',
  'Whirlpool',
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Сколько стоит диагностика?',
    answer:
      'Диагностика стоит от 50 000 сум. Если вы заказываете ремонт у нас, диагностика проводится бесплатно — её стоимость включается в общую цену ремонта.',
  },
  {
    question: 'Мастер приезжает домой?',
    answer:
      'Да, мы ремонтируем технику на дому у клиента. Мастеру не нужно везти технику в сервисный центр — большинство поломок устраняются на месте за один визит.',
  },
  {
    question: 'Сколько времени занимает ремонт?',
    answer:
      'Большинство ремонтов выполняются за 1–2 часа. Если требуется заказать редкую запчасть, ремонт может занять больше времени — мы заранее сообщим сроки.',
  },
  {
    question: 'Есть ли гарантия?',
    answer:
      'Да, мы предоставляем гарантию до 12 месяцев на все виды работ и заменённые запчасти. Если проблема повторится в течение гарантийного срока, мы исправим её бесплатно.',
  },
  {
    question: 'Какие марки техники вы ремонтируете?',
    answer:
      'Мы ремонтируем технику всех популярных брендов: Samsung, LG, Bosch, Beko, Artel, Indesit, Haier, Midea, Electrolux, Whirlpool и другие. Мастера знакомы с особенностями каждой марки.',
  },
  {
    question: 'Можно ли вызвать мастера в выходной день?',
    answer:
      'Да, мы работаем без выходных — с 8:00 до 21:00. Вы можете оставить заявку в любой день, и мы подберём удобное для вас время визита мастера.',
  },
  {
    question: 'Запчасти входят в стоимость?',
    answer:
      'Стоимость запчастей оплачивается отдельно. После диагностики мастер называет окончательную цену — стоимость работ и деталей. Вы заранее знаете, за что платите.',
  },
];

export interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  appliance: string;
  date: string;
}

export const reviews: Review[] = [
  {
    name: 'Алишер',
    location: 'Мирзо Улугбекский район',
    rating: 5,
    text: 'Холодильник Samsung перестал морозить. Мастер приехал через час после заявки, нашёл утечку фреона и заправил. Работает уже 3 месяца — всё отлично.',
    appliance: 'Холодильник',
    date: 'Август 2026',
  },
  {
    name: 'Дилфуза',
    location: 'Чиланзарский район',
    rating: 5,
    text: 'Стиральная машина не сливала воду. Обзвонила несколько сервисов, здесь назвали самую адекватную цену. Мастер починил за 40 минут, дал гарантию.',
    appliance: 'Стиральная машина',
    date: 'Август 2026',
  },
  {
    name: 'Бекзод',
    location: 'Юнусабадский район',
    rating: 5,
    text: 'Кондиционер перестал холодить перед самым летом. Вызвал вечером — мастер приехал на следующее утро, заправил фреон и почистил. Очень доволен.',
    appliance: 'Кондиционер',
    date: 'Июль 2026',
  },
  {
    name: 'Гулнора',
    location: 'Сергелийский район',
    rating: 5,
    text: 'Посудомоечная машина Bosch выдавала ошибку. Мастер быстро нашёл проблему — засорился насос. Почистил и проверил всё. Спасибо за честную работу.',
    appliance: 'Посудомоечная машина',
    date: 'Июль 2026',
  },
  {
    name: 'Жасур',
    location: 'Яккасарайский район',
    rating: 4,
    text: 'Газовая плита не зажигалась на одной конфорке. Мастер заменил термопару за 20 минут. Приятно, что не пришлось везти плиту в сервис.',
    appliance: 'Плита',
    date: 'Июнь 2026',
  },
  {
    name: 'Нодира',
    location: 'Алмазарский район',
    rating: 5,
    text: 'Духовка неравномерно пекла, снизу подгорало. Мастер заменил нижний ТЭН и откалибровал термостат. Теперь печёт идеально, как раньше.',
    appliance: 'Духовка',
    date: 'Июнь 2026',
  },
];

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  telegram: string;
  telegramHref: string;
  workingHours: string;
  workingHoursShort: string;
  serviceArea: string;
  email: string;
}

export const contactInfo: ContactInfo = {
  phone: '+998 71 200-50-50',
  phoneHref: '+998712005050',
  telegram: '@tehmaster_uz',
  telegramHref: 'https://t.me/tehmaster_uz',
  workingHours: 'Ежедневно с 8:00 до 21:00',
  workingHoursShort: '8:00 – 21:00',
  serviceArea: 'Весь Ташкент и пригород',
  email: 'info@tehmaster.uz',
};

export const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Как работаем', href: '#how-it-works' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contact' },
];
