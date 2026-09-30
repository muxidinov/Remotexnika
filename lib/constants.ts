import {
  Refrigerator,
  WashingMachine,
  CircleDot,
  CookingPot,
  Microwave,
  AirVent,
  HelpCircle,
  type LucideIcon,
  Zap,
  Wrench,
  ShieldCheck,
  Home,
  BadgePercent,
  Headphones,
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
    shortDesc: 'Не морозит, течёт, шумит или не включается',
  },
  {
    key: 'washing_machine',
    label: 'Стиральная машина',
    icon: WashingMachine,
    shortDesc: 'Не сливает воду, не отжимает, течёт или выдаёт ошибку',
  },
  {
    key: 'dishwasher',
    label: 'Посудомоечная машина',
    icon: CircleDot,
    shortDesc: 'Не моет, не сушит, не набирает воду или выдаёт ошибку',
  },
  {
    key: 'stove',
    label: 'Плита',
    icon: CookingPot,
    shortDesc: 'Не греет, не включается, не зажигается или работает нестабильно',
  },
  {
    key: 'oven',
    label: 'Духовка',
    icon: Microwave,
    shortDesc: 'Не нагревает, плохо печёт, не включается или перегревается',
  },
  {
    key: 'air_conditioner',
    label: 'Кондиционер',
    icon: AirVent,
    shortDesc: 'Не холодит, течёт, шумит или плохо работает',
  },
  {
    key: 'other',
    label: 'Другая техника',
    icon: HelpCircle,
    shortDesc: 'Сушильные машины, вытяжки и другая бытовая техника',
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
    title: 'Ремонт холодильников в Ташкенте',
    description:
      'Ремонтируем холодильники на дому: устраняем утечки фреона, меняем компрессоры, термостаты и уплотнители, восстанавливаем нормальное охлаждение.',
    priceFrom: 100000,
    features: [
      'Заправка фреона',
      'Замена компрессора',
      'Ремонт электроники',
    ],
    icon: Refrigerator,
  },
  {
    id: 'washing_machine',
    title: 'Ремонт стиральных машин в Ташкенте',
    description:
      'Диагностируем и ремонтируем стиральные машины на дому: устраняем проблемы со сливом, отжимом и нагревом, протечки и ошибки на дисплее.',
    priceFrom: 100000,
    features: [
      'Замена ТЭНа',
      'Ремонт системы слива',
      'Замена подшипников',
    ],
    icon: WashingMachine,
  },
  {
    id: 'dishwasher',
    title: 'Ремонт посудомоечных машин в Ташкенте',
    description:
      'Ремонт посудомоечных машин с выездом мастера: устраняем проблемы с мойкой, сушкой и подачей воды, засоры и неисправности насоса.',
    priceFrom: 90000,
    features: [
      'Устранение засоров',
      'Замена насоса',
      'Ремонт электронного модуля',
    ],
    icon: CircleDot,
  },
  {
    id: 'stove',
    title: 'Ремонт плит в Ташкенте',
    description:
      'Ремонтируем газовые и электрические плиты на дому. Устраняем неисправности конфорок, электроподжига и газ-контроля, заменяем необходимые детали.',
    priceFrom: 80000,
    features: [
      'Замена конфорок',
      'Ремонт газ-контроля',
      'Ремонт электроподжига',
    ],
    icon: CookingPot,
  },
  {
    id: 'oven',
    title: 'Ремонт духовых шкафов в Ташкенте',
    description:
      'Диагностируем и ремонтируем духовые шкафы: заменяем ТЭНы, термостаты и стекло, устраняем проблемы с нагревом и электронными платами.',
    priceFrom: 90000,
    features: [
      'Замена ТЭНа',
      'Ремонт термостата',
      'Замена стекла',
    ],
    icon: Microwave,
  },
  {
    id: 'air_conditioner',
    title: 'Ремонт кондиционеров в Ташкенте',
    description:
      'Ремонт и обслуживание кондиционеров с выездом мастера: заправка фреоном, чистка сплит-систем, диагностика и ремонт компрессора.',
    priceFrom: 120000,
    features: [
      'Заправка фреоном',
      'Чистка сплит-системы',
      'Замена компрессора',
    ],
    icon: AirVent,
  },
];

export interface PriceItem {
  service: string;
  priceFrom: number;
  note?: string;
}

export const pricing: PriceItem[] = [
  {
    service: 'Диагностика бытовой техники',
    priceFrom: 50000,
    note: 'Бесплатно при ремонте',
  },
  {
    service: 'Ремонт холодильника',
    priceFrom: 100000,
  },
  {
    service: 'Ремонт стиральной машины',
    priceFrom: 100000,
  },
  {
    service: 'Ремонт посудомоечной машины',
    priceFrom: 90000,
  },
  {
    service: 'Ремонт плиты',
    priceFrom: 80000,
  },
  {
    service: 'Ремонт духового шкафа',
    priceFrom: 90000,
  },
  {
    service: 'Ремонт кондиционера',
    priceFrom: 120000,
  },
  {
    service: 'Замена запчастей',
    priceFrom: 30000,
    note: 'Стоимость детали рассчитывается отдельно',
  },
];

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: 'Быстрый выезд мастера',
    description:
      'Мастер приедет в течение 1–2 часов после заявки в пределах Ташкента.',
  },
  {
    icon: Wrench,
    title: 'Опытные мастера',
    description:
      'Сертифицированные специалисты с опытом более 8 лет в ремонте бытовой техники.',
  },
  {
    icon: BadgePercent,
    title: 'Прозрачные цены',
    description:
      'Окончательную стоимость ремонта называем после диагностики — без скрытых платежей.',
  },
  {
    icon: Home,
    title: 'Ремонт на дому',
    description:
      'Мастер приезжает по вашему адресу в Ташкенте, поэтому не нужно самостоятельно везти технику в сервис.',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия на ремонт',
    description:
      'Предоставляем гарантию до 12 месяцев на выполненные работы и заменённые запчасти.',
  },
  {
    icon: Headphones,
    title: 'Поддержка клиентов',
    description:
      'Консультируем по вопросам ремонта и помогаем после выполнения работ.',
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
    description:
      'Позвоните нам или оставьте заявку на сайте, указав вид бытовой техники и описание неисправности.',
  },
  {
    number: '02',
    title: 'Уточняем неисправность',
    description:
      'Специалист свяжется с вами в течение 15 минут, уточнит детали поломки и согласует удобное время визита.',
  },
  {
    number: '03',
    title: 'Мастер приезжает на дом',
    description:
      'В назначенное время мастер приезжает по вашему адресу в Ташкенте с необходимыми инструментами.',
  },
  {
    number: '04',
    title: 'Диагностика и ремонт',
    description:
      'Проводим диагностику, согласовываем стоимость и выполняем ремонт бытовой техники на месте.',
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
    question: 'Сколько стоит ремонт бытовой техники в Ташкенте?',
    answer:
      'Стоимость зависит от вида техники и неисправности. Диагностика стоит от 50 000 сум и проводится бесплатно при заказе ремонта. После диагностики мастер сообщает окончательную стоимость работ и запчастей.',
  },
  {
    question: 'Вы ремонтируете бытовую технику на дому?',
    answer:
      'Да. Мастер приезжает по вашему адресу в Ташкенте и выполняет диагностику и ремонт на месте. Большинство типовых неисправностей можно устранить за один визит.',
  },
  {
    question: 'Какие бытовые приборы вы ремонтируете?',
    answer:
      'Мы ремонтируем холодильники, стиральные и посудомоечные машины, газовые и электрические плиты, духовые шкафы и кондиционеры. Также принимаем заявки на ремонт другой бытовой техники.',
  },
  {
    question: 'Сколько времени занимает ремонт бытовой техники?',
    answer:
      'Большинство стандартных ремонтов выполняются в течение 1–2 часов. Если потребуется редкая запчасть, срок ремонта может увеличиться. О сроках мастер сообщает после диагностики.',
  },
  {
    question: 'Есть ли гарантия на ремонт?',
    answer:
      'Да. Мы предоставляем гарантию до 12 месяцев на выполненные работы и заменённые запчасти. Условия гарантии согласовываются после выполнения ремонта.',
  },
  {
    question: 'Какие марки бытовой техники вы ремонтируете?',
    answer:
      'Ремонтируем технику популярных брендов Samsung, LG, Bosch, Beko, Artel, Indesit, Haier, Midea, Electrolux, Whirlpool и других производителей.',
  },
  {
    question: 'Можно ли вызвать мастера в выходной день?',
    answer:
      'Да. Работаем круглосуточно, 24/7, без выходных. Вы можете обратиться за ремонтом бытовой техники в любое удобное время.',
  },
  {
    question: 'Запчасти входят в стоимость ремонта?',
    answer:
      'Запчасти оплачиваются отдельно. После диагностики мастер сообщает стоимость работы и необходимых деталей, поэтому вы заранее знаете итоговую сумму.',
  },
];

export interface Review {
  id?: string;
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
  phone: '+998 90 120-07-96',
  phoneHref: '+998901200796',
  telegram: '@Texnoremont1993',
  telegramHref: 'https://t.me/Texnoremont1993',
  workingHours: '24/7',
  workingHoursShort: '24/7',
  serviceArea: 'Ташкент',
  email: 'info@tehmaster.uz',
};

