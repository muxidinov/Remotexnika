
'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const languages = ['ru', 'uz', 'en'] as const;
export type Language = (typeof languages)[number];

export const languageNames: Record<Language, string> = {
  ru: 'Русский',
  uz: "O‘zbekcha",
  en: 'English',
};

type Dictionary = Record<string, string>;

const ru: Dictionary = {
  'nav.services': 'Услуги',
  'nav.pricing': 'Цены',
  'nav.how': 'Как работаем',
  'nav.reviews': 'Отзывы',
  'nav.faq': 'FAQ',
  'nav.contact': 'Контакты',

  'action.book': 'Вызвать мастера',
  'action.next': 'Далее',
  'action.back': 'Назад',
  'action.close': 'Закрыть',
  'action.submit': 'Отправить заявку',

  'menu.open': 'Открыть меню',
  'menu.close': 'Закрыть меню',
  'menu.title': 'Меню',
  'call.button': 'Позвонить',

  'hero.open': 'Работаем ежедневно',
  'hero.title': 'Ремонт бытовой техники в Ташкенте',
  'hero.titleAccent': 'с выездом на дом',
  'hero.description':
    'Ремонт холодильников, стиральных и посудомоечных машин, плит, духовок и кондиционеров в Ташкенте. Выезд мастера на дом, диагностика, ремонт и гарантия на выполненные работы.',
  'hero.services': 'Посмотреть услуги',
  'hero.fast': 'Выезд за 1–2 часа',
  'hero.warranty': 'Гарантия до 12 месяцев',
  'hero.reviews': 'Отзывы клиентов',
  'hero.diagnostics': 'Диагностика',
  'hero.from50': 'от 50 000 сум',
  'hero.rating': 'Рейтинг',

  'quick.eyebrow': 'Быстрая заявка',
  'quick.title': 'Нужен ремонт бытовой техники?',
  'quick.description':
    'Оставьте номер телефона — мастер свяжется с вами, уточнит проблему и согласует удобное время визита.',
  'quick.appliance': 'Выберите технику',
  'quick.refrigerator': 'Холодильник',
  'quick.washer': 'Стиральная машина',
  'quick.name': 'Имя',
  'quick.surname': 'Фамилия',
  'quick.phone': 'Телефон',
  'quick.namePlaceholder': 'Ваше имя',
  'quick.surnamePlaceholder': 'Ваша фамилия',
  'quick.phonePlaceholder': '+998 90 123 45 67',
  'quick.submit': 'Оставить заявку',
  'quick.sending': 'Отправляем…',
  'quick.success':
    'Спасибо! Заявка принята. Мы свяжемся с вами в ближайшее время.',
  'quick.validation':
    'Введите имя, фамилию и корректный номер телефона.',
  'quick.failed':
    'Не удалось отправить заявку. Попробуйте ещё раз позже.',

  'services.eyebrow': 'Наши услуги',
  'services.title': 'Ремонт бытовой техники в Ташкенте',
  'services.description':
    'Ремонтируем основные виды бытовой техники с выездом мастера на дом. Диагностируем неисправность, согласовываем стоимость и выполняем ремонт на месте, если это возможно.',
  'services.order': 'Заказать ремонт',
  'services.from': 'от',
  'services.currency': 'сум',
  'services.other':
    'Также ремонтируем сушильные машины, вытяжки, микроволновые печи, водонагреватели и другую бытовую технику.',

  'pricing.eyebrow': 'Цены',
  'pricing.title': 'Понятные цены без скрытых платежей',
  'pricing.description':
    'Стоимость ремонта зависит от типа неисправности, сложности работы и необходимых запчастей. Точную стоимость мастер сообщает после диагностики и согласовывает с вами до начала ремонта.',
  'pricing.hit': 'Популярное',
  'pricing.how': 'Как формируется стоимость?',
  'pricing.howText':
    'Итоговая стоимость состоит из работы мастера и необходимых запчастей. После диагностики мастер объясняет причину неисправности, называет стоимость и приступает к ремонту только после вашего согласия.',

  'why.eyebrow': 'Почему мы',
  'why.title': 'Почему клиенты выбирают ТехМастер',
  'why.description':
    'Помогаем быстро решить проблемы с бытовой техникой на дому. Работаем прозрачно: объясняем неисправность, заранее согласовываем стоимость и предоставляем гарантию на выполненные работы.',

  'stat.repairs': 'Выполнено ремонтов',
  'stat.experience': 'Опыт работы',
  'stat.warranty': 'Гарантия на работы',
  'stat.response': 'Время ответа',

  'how.eyebrow': 'Как мы работаем',
  'how.title': 'Простой процесс ремонта',
  'how.description':
    'От обращения до ремонта — всё максимально просто. Вы сообщаете о проблеме, а мастер помогает подобрать удобное время для визита.',

  'brands.title': 'Ремонтируем технику популярных брендов',

  'reviews.eyebrow': 'Отзывы',
  'reviews.title': 'Отзывы наших клиентов',
  'reviews.description':
    'Нам важно качество работы и мнение клиентов. Оставьте свой отзыв после ремонта и поделитесь впечатлениями.',

  'reviews.count': 'отзывов',
  'reviews.leave': 'Оставить отзыв',
  'reviews.leaveTitle': 'Поделитесь своим опытом',
  'reviews.leaveText':
    'Ваш отзыв поможет другим клиентам выбрать подходящий сервис.',
  'reviews.formName': 'Имя',
  'reviews.formNamePlaceholder': 'Как вас зовут?',
  'reviews.formRating': 'Оценка',
  'reviews.formAppliance': 'Какая техника?',
  'reviews.formAppliancePlaceholder': 'Например: холодильник',
  'reviews.formLocation': 'Район',
  'reviews.formLocationPlaceholder': 'Например: Чиланзарский район',
  'reviews.formComment': 'Ваш отзыв',
  'reviews.formCommentPlaceholder':
    'Расскажите, как прошёл ремонт…',
  'reviews.formOptional': 'необязательно',
  'reviews.formSubmit': 'Опубликовать отзыв',
  'reviews.formSending': 'Отправляем…',
  'reviews.formSuccess': 'Спасибо! Ваш отзыв опубликован.',
  'reviews.formError':
    'Заполните имя, оценку, технику и текст отзыва.',
  'reviews.formFailed':
    'Не удалось отправить отзыв. Попробуйте позже.',
  'reviews.new': 'Новый',
  'reviews.cancel': 'Отмена',

  'faq.eyebrow': 'Вопросы и ответы',
  'faq.title': 'Часто задаваемые вопросы',
  'faq.description':
    'Ответы на популярные вопросы о ремонте бытовой техники, выезде мастера, диагностике и стоимости услуг.',

  'contact.eyebrow': 'Контакты',
  'contact.title': 'Свяжитесь с нами',
  'contact.description':
    'Позвоните нам или оставьте заявку на сайте. Мы уточним проблему, ответим на ваши вопросы и согласуем удобное время визита мастера.',
  'contact.phone': 'Телефон',
  'contact.hours': 'Часы работы',
  'contact.area': 'Зона обслуживания',
  'contact.go': 'Позвонить',
  'contact.urgent': 'Нужен срочный ремонт?',
  'contact.urgentText':
    'Оставьте заявку или позвоните нам — постараемся организовать выезд мастера как можно быстрее.',
  'contact.hoursValue': '24/7',
  'contact.areaValue': 'Ташкент',

  'footer.description':
    'Ремонт бытовой техники в Ташкенте с выездом мастера на дом. Диагностика, ремонт и гарантия на выполненные работы.',
  'footer.services': 'Услуги',
  'footer.navigation': 'Навигация',
  'footer.contacts': 'Контакты',
  'footer.rights': 'Все права защищены.',
  'footer.privacy': 'Политика конфиденциальности',
  'footer.terms': 'Условия использования',

  'form.location': 'Геолокация (необязательно)',
  'form.locationHint':
    'Отправьте точку на карте, чтобы мастер быстрее нашёл вас.',
  'form.locationGet': 'Отправить мою геолокацию',
  'form.locationGetting': 'Определяем…',
  'form.locationReady': 'Геолокация добавлена',
  'form.locationDenied':
    'Доступ к геолокации запрещён. Вы можете указать адрес вручную.',
  'form.locationUnsupported':
    'Ваше устройство не поддерживает геолокацию. Укажите адрес вручную.',
  'form.locationError':
    'Не удалось определить геолокацию. Укажите адрес вручную.',
  'form.locationClear': 'Удалить',
  'form.summaryLocation': 'Геолокация',

  'form.title': 'Заявка на ремонт',
  'form.validation':
    'Проверьте правильность заполнения формы.',
  'form.step1': 'Что нужно отремонтировать?',
  'form.step2': 'Что произошло?',
  'form.step3': 'Ваши контакты',
  'form.step': 'Шаг',
  'form.of': 'из 3',
  'form.selectAppliance': 'Выберите технику для ремонта',
  'form.selected': 'Выбранная техника',
  'form.problem': 'Опишите проблему',
  'form.problemPlaceholder':
    'Например: холодильник не морозит, стиральная машина не сливает воду…',
  'form.problemHint':
    'Подробное описание поможет мастеру лучше подготовиться к ремонту.',
  'form.fullName': 'Имя и фамилия',
  'form.fullNamePlaceholder': 'Ваше имя и фамилия',
  'form.address': 'Адрес',
  'form.addressPlaceholder': 'Район, улица, дом, квартира',
  'form.time': 'Удобное время',
  'form.timePlaceholder': 'Например: сегодня после 18:00',
  'form.comment': 'Дополнительный комментарий',
  'form.optional': 'необязательно',
  'form.commentPlaceholder':
    'Любая дополнительная информация…',
  'form.sending': 'Отправляем…',
  'form.successTitle': 'Заявка отправлена!',
  'form.successText':
    'Спасибо! Мы получили вашу заявку и свяжемся с вами для уточнения деталей и согласования времени визита мастера.',
  'form.summaryAppliance': 'Техника',
  'form.summaryName': 'Имя',
  'form.summaryPhone': 'Телефон',
  'form.summaryAddress': 'Адрес',
  'form.summaryTime': 'Время',

  'appliance.refrigerator': 'Холодильник',
  'appliance.washing_machine': 'Стиральная машина',
  'appliance.dishwasher': 'Посудомоечная машина',
  'appliance.stove': 'Плита',
  'appliance.oven': 'Духовка',
  'appliance.air_conditioner': 'Кондиционер',
  'appliance.other': 'Другая техника',
};

const en: Dictionary = {
  'nav.services': 'Services',
  'nav.pricing': 'Pricing',
  'nav.how': 'How it works',
  'nav.reviews': 'Reviews',
  'nav.faq': 'FAQ',
  'nav.contact': 'Contact',

  'action.book': 'Call a technician',
  'action.next': 'Next',
  'action.back': 'Back',
  'action.close': 'Close',
  'action.submit': 'Send request',

  'menu.open': 'Open menu',
  'menu.close': 'Close menu',
  'menu.title': 'Menu',
  'call.button': 'Call now',

  'hero.open': 'Available daily',
  'hero.title': 'Home appliance repair in Tashkent',
  'hero.titleAccent': 'at your home',
  'hero.description':
    'Repair of refrigerators, washing machines, dishwashers, cookers, ovens and air conditioners in Tashkent. Home visits, diagnostics, repair and warranty on completed work.',
  'hero.services': 'View services',
  'hero.fast': 'Arrival in 1–2 hours',
  'hero.warranty': 'Up to 12 months warranty',
  'hero.reviews': 'Customer reviews',
  'hero.diagnostics': 'Diagnostics',
  'hero.from50': 'from 50,000 UZS',
  'hero.rating': 'Rating',

  'quick.eyebrow': 'Quick request',
  'quick.title': 'Need home appliance repair?',
  'quick.description':
    'Leave your phone number and a technician will contact you to discuss the problem and arrange a convenient visit time.',
  'quick.appliance': 'Choose an appliance',
  'quick.refrigerator': 'Refrigerator',
  'quick.washer': 'Washing machine',
  'quick.name': 'First name',
  'quick.surname': 'Last name',
  'quick.phone': 'Phone number',
  'quick.namePlaceholder': 'Your first name',
  'quick.surnamePlaceholder': 'Your last name',
  'quick.phonePlaceholder': '+998 90 123 45 67',
  'quick.submit': 'Request a call',
  'quick.sending': 'Sending…',
  'quick.success':
    'Thank you! Your request has been received. We will contact you shortly.',
  'quick.validation':
    'Enter your first name, last name and a valid phone number.',
  'quick.failed':
    'Unable to send your request. Please try again later.',

  'services.eyebrow': 'Our services',
  'services.title': 'Home appliance repair in Tashkent',
  'services.description':
    'We repair major household appliances with home visits in Tashkent. Our technician diagnoses the problem, explains the cost and completes the repair on site whenever possible.',
  'services.order': 'Book a repair',
  'services.from': 'from',
  'services.currency': 'UZS',
  'services.other':
    'We also repair dryers, extractor hoods, microwaves, water heaters and other household appliances.',

  'pricing.eyebrow': 'Pricing',
  'pricing.title': 'Clear pricing with no hidden charges',
  'pricing.description':
    'The final cost depends on the type of fault, repair complexity and required spare parts. The technician confirms the exact price after diagnostics before starting the repair.',
  'pricing.hit': 'Popular',
  'pricing.how': 'How is the price calculated?',
  'pricing.howText':
    'The final price includes labour and required spare parts. After diagnostics, the technician explains the problem, provides the price and starts the repair only after your approval.',

  'why.eyebrow': 'Why us',
  'why.title': 'Why customers choose TehMaster',
  'why.description':
    'We help customers solve appliance problems at home. We explain the issue clearly, agree on the price before repair and provide a warranty on completed work.',

  'stat.repairs': 'Repairs completed',
  'stat.experience': 'Years of experience',
  'stat.warranty': 'Warranty on repairs',
  'stat.response': 'Response time',

  'how.eyebrow': 'How we work',
  'how.title': 'A simple repair process',
  'how.description':
    'From your request to the completed repair, the process is simple. Tell us about the problem and we will arrange a convenient technician visit.',

  'brands.title': 'We repair appliances from popular brands',

  'reviews.eyebrow': 'Reviews',
  'reviews.title': 'What our customers say',
  'reviews.description':
    'Customer feedback matters to us. Leave a review after your repair and share your experience.',

  'reviews.count': 'reviews',
  'reviews.leave': 'Leave a review',
  'reviews.leaveTitle': 'Share your experience',
  'reviews.leaveText':
    'Your review can help other customers choose a repair service.',
  'reviews.formName': 'Name',
  'reviews.formNamePlaceholder': 'Your name',
  'reviews.formRating': 'Rating',
  'reviews.formAppliance': 'Which appliance?',
  'reviews.formAppliancePlaceholder': 'For example: Refrigerator',
  'reviews.formLocation': 'District',
  'reviews.formLocationPlaceholder': 'For example: Chilanzar district',
  'reviews.formComment': 'Your review',
  'reviews.formCommentPlaceholder':
    'Tell us how the repair went…',
  'reviews.formOptional': 'optional',
  'reviews.formSubmit': 'Publish review',
  'reviews.formSending': 'Sending…',
  'reviews.formSuccess': 'Thank you! Your review has been published.',
  'reviews.formError':
    'Fill in your name, rating, appliance and review text.',
  'reviews.formFailed':
    'Could not send your review. Please try again later.',
  'reviews.new': 'New',
  'reviews.cancel': 'Cancel',

  'faq.eyebrow': 'Questions and answers',
  'faq.title': 'Frequently asked questions',
  'faq.description':
    'Answers to common questions about appliance repair, home visits, diagnostics and pricing.',

  'contact.eyebrow': 'Contact',
  'contact.title': 'Get in touch',
  'contact.description':
    'Call us or leave a request on the website. We will discuss the problem, answer your questions and arrange a convenient technician visit.',
  'contact.phone': 'Phone',
  'contact.hours': 'Working hours',
  'contact.area': 'Service area',
  'contact.go': 'Call',
  'contact.urgent': 'Need urgent repair?',
  'contact.urgentText':
    'Leave a request or call us and we will try to arrange a technician visit as quickly as possible.',
  'contact.hoursValue': '24/7',
  'contact.areaValue': 'Tashkent',

  'footer.description':
    'Home appliance repair in Tashkent with technician visits. Diagnostics, repair and warranty on completed work.',
  'footer.services': 'Services',
  'footer.navigation': 'Navigation',
  'footer.contacts': 'Contact',
  'footer.rights': 'All rights reserved.',
  'footer.privacy': 'Privacy policy',
  'footer.terms': 'Terms of use',

  'form.location': 'Location (optional)',
  'form.locationHint':
    'Share your map pin so the technician can find you faster.',
  'form.locationGet': 'Share my location',
  'form.locationGetting': 'Locating…',
  'form.locationReady': 'Location added',
  'form.locationDenied':
    'Location access was denied. You can enter your address manually.',
  'form.locationUnsupported':
    'Your device does not support geolocation. Please enter your address manually.',
  'form.locationError':
    'Could not get your location. Please enter your address manually.',
  'form.locationClear': 'Remove',
  'form.summaryLocation': 'Location',

  'form.title': 'Repair request',
  'form.validation':
    'Please check that the form is filled in correctly.',
  'form.step1': 'What needs repair?',
  'form.step2': 'What happened?',
  'form.step3': 'Your contact details',
  'form.step': 'Step',
  'form.of': 'of 3',
  'form.selectAppliance': 'Choose an appliance for repair',
  'form.selected': 'Selected appliance',
  'form.problem': 'Describe the problem',
  'form.problemPlaceholder':
    'For example: the refrigerator is not cooling, the washing machine does not drain water…',
  'form.problemHint':
    'A detailed description helps the technician prepare for the repair.',
  'form.fullName': 'Full name',
  'form.fullNamePlaceholder': 'Your first and last name',
  'form.address': 'Address',
  'form.addressPlaceholder': 'District, street, building, apartment',
  'form.time': 'Preferred time',
  'form.timePlaceholder': 'For example: today after 18:00',
  'form.comment': 'Additional comment',
  'form.optional': 'optional',
  'form.commentPlaceholder':
    'Any additional information…',
  'form.sending': 'Sending…',
  'form.successTitle': 'Request sent!',
  'form.successText':
    'Thank you! We received your request and will contact you to confirm the details and arrange the technician visit.',
  'form.summaryAppliance': 'Appliance',
  'form.summaryName': 'Name',
  'form.summaryPhone': 'Phone',
  'form.summaryAddress': 'Address',
  'form.summaryTime': 'Time',

  'appliance.refrigerator': 'Refrigerator',
  'appliance.washing_machine': 'Washing machine',
  'appliance.dishwasher': 'Dishwasher',
  'appliance.stove': 'Cooker',
  'appliance.oven': 'Oven',
  'appliance.air_conditioner': 'Air conditioner',
  'appliance.other': 'Other appliance',
};

const uz: Dictionary = {
  'nav.services': 'Xizmatlar',
  'nav.pricing': 'Narxlar',
  'nav.how': 'Qanday ishlaymiz',
  'nav.reviews': 'Sharhlar',
  'nav.faq': 'Savollar',
  'nav.contact': 'Aloqa',

  'action.book': 'Ustani chaqirish',
  'action.next': 'Keyingi',
  'action.back': 'Ortga',
  'action.close': 'Yopish',
  'action.submit': 'Ariza yuborish',

  'menu.open': 'Menyuni ochish',
  'menu.close': 'Menyuni yopish',
  'menu.title': 'Menyu',
  'call.button': 'Qo‘ng‘iroq qilish',

  'hero.open': 'Har kuni ishlaymiz',
  'hero.title': 'Toshkentda maishiy texnika ta’miri',
  'hero.titleAccent': 'uyga borib',
  'hero.description':
    'Toshkentda muzlatgich, kir yuvish va idish yuvish mashinasi, plita, duxovka hamda konditsionerlarni ta’mirlash. Usta uyga boradi, diagnostika qiladi va ta’mirlash ishlarini bajaradi.',
  'hero.services': 'Xizmatlarni ko‘rish',
  'hero.fast': '1–2 soatda yetib borish',
  'hero.warranty': '12 oygacha kafolat',
  'hero.reviews': 'Mijozlar sharhlari',
  'hero.diagnostics': 'Diagnostika',
  'hero.from50': '50 000 so‘mdan',
  'hero.rating': 'Reyting',

  'quick.eyebrow': 'Tezkor ariza',
  'quick.title': 'Maishiy texnika buzildimi?',
  'quick.description':
    'Telefon raqamingizni qoldiring — usta muammoni aniqlash va qulay vaqtni belgilash uchun siz bilan bog‘lanadi.',
  'quick.appliance': 'Texnikani tanlang',
  'quick.refrigerator': 'Muzlatgich',
  'quick.washer': 'Kir yuvish mashinasi',
  'quick.name': 'Ism',
  'quick.surname': 'Familiya',
  'quick.phone': 'Telefon raqami',
  'quick.namePlaceholder': 'Ismingiz',
  'quick.surnamePlaceholder': 'Familiyangiz',
  'quick.phonePlaceholder': '+998 90 123 45 67',
  'quick.submit': 'Ariza qoldirish',
  'quick.sending': 'Yuborilmoqda…',
  'quick.success':
    'Rahmat! Arizangiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.',
  'quick.validation':
    'Ism, familiya va to‘g‘ri telefon raqamini kiriting.',
  'quick.failed':
    'Arizani yuborib bo‘lmadi. Keyinroq yana urinib ko‘ring.',

  'services.eyebrow': 'Xizmatlarimiz',
  'services.title': 'Toshkentda maishiy texnika ta’miri',
  'services.description':
    'Toshkent bo‘ylab asosiy turdagi maishiy texnikalarni uyga borib ta’mirlaymiz. Usta nosozlikni aniqlaydi, narxni tushuntiradi va imkon qadar ta’mirlashni joyida amalga oshiradi.',
  'services.order': 'Ta’mir buyurtma qilish',
  'services.from': 'dan',
  'services.currency': 'so‘m',
  'services.other':
    'Shuningdek, quritgichlar, dudburonlar, mikroto‘lqinli pechlar, suv isitgichlar va boshqa maishiy texnikalarni ham ta’mirlaymiz.',

  'pricing.eyebrow': 'Narxlar',
  'pricing.title': 'Yashirin to‘lovlarsiz aniq narxlar',
  'pricing.description':
    'Ta’mir narxi nosozlik turi, ish murakkabligi va kerakli ehtiyot qismlarga bog‘liq. Diagnostikadan keyin usta yakuniy narxni ta’mirdan oldin siz bilan kelishadi.',
  'pricing.hit': 'Mashhur',
  'pricing.how': 'Narx qanday shakllanadi?',
  'pricing.howText':
    'Yakuniy narx usta mehnati va kerakli ehtiyot qismlardan iborat. Diagnostikadan so‘ng muammo tushuntiriladi, narx aytiladi va ta’mir faqat sizning roziligingizdan keyin boshlanadi.',

  'why.eyebrow': 'Nega biz',
  'why.title': 'Nega mijozlar TehMasterni tanlaydi',
  'why.description':
    'Maishiy texnika muammolarini uyda hal qilishga yordam beramiz. Nosozlikni tushuntiramiz, narxni oldindan kelishamiz va bajarilgan ishlarga kafolat beramiz.',

  'stat.repairs': 'Bajarilgan ta’mirlar',
  'stat.experience': 'Ish tajribasi',
  'stat.warranty': 'Ishlarga kafolat',
  'stat.response': 'Javob berish vaqti',

  'how.eyebrow': 'Qanday ishlaymiz',
  'how.title': 'Oddiy ta’mirlash jarayoni',
  'how.description':
    'Arizadan ta’mirgacha jarayon sodda. Muammo haqida ma’lumot bering — biz usta tashrifi uchun qulay vaqtni belgilashga yordam beramiz.',

  'brands.title': 'Mashhur brendlar texnikalarini ta’mirlaymiz',

  'reviews.eyebrow': 'Sharhlar',
  'reviews.title': 'Mijozlarimiz fikrlari',
  'reviews.description':
    'Mijozlarning fikri biz uchun muhim. Ta’mirdan so‘ng o‘z tajribangiz bilan o‘rtoqlashing.',

  'reviews.count': 'sharh',
  'reviews.leave': 'Sharh qoldirish',
  'reviews.leaveTitle': 'Tajribangiz bilan o‘rtoqlashing',
  'reviews.leaveText':
    'Sharhingiz boshqa mijozlarga xizmat tanlashda yordam beradi.',
  'reviews.formName': 'Ism',
  'reviews.formNamePlaceholder': 'Ismingiz',
  'reviews.formRating': 'Baho',
  'reviews.formAppliance': 'Qaysi texnika?',
  'reviews.formAppliancePlaceholder': 'Masalan: Muzlatgich',
  'reviews.formLocation': 'Tuman',
  'reviews.formLocationPlaceholder': 'Masalan: Chilonzor tumani',
  'reviews.formComment': 'Sharhingiz',
  'reviews.formCommentPlaceholder':
    'Ta’mir qanday o‘tganini yozing…',
  'reviews.formOptional': 'ixtiyoriy',
  'reviews.formSubmit': 'Sharhni joylash',
  'reviews.formSending': 'Yuborilmoqda…',
  'reviews.formSuccess': 'Rahmat! Sharhingiz joylandi.',
  'reviews.formError':
    'Ism, baho, texnika va sharh matnini to‘ldiring.',
  'reviews.formFailed':
    'Sharhni yuborib bo‘lmadi. Keyinroq urinib ko‘ring.',
  'reviews.new': 'Yangi',
  'reviews.cancel': 'Bekor qilish',

  'faq.eyebrow': 'Savol-javoblar',
  'faq.title': 'Ko‘p beriladigan savollar',
  'faq.description':
    'Maishiy texnika ta’miri, usta chaqirish, diagnostika va narxlar bo‘yicha eng ko‘p beriladigan savollarga javoblar.',

  'contact.eyebrow': 'Aloqa',
  'contact.title': 'Biz bilan bog‘laning',
  'contact.description':
    'Qo‘ng‘iroq qiling yoki saytda ariza qoldiring. Muammoni aniqlab, savollaringizga javob beramiz va usta tashrifi uchun qulay vaqtni belgilaymiz.',
  'contact.phone': 'Telefon',
  'contact.hours': 'Ish vaqti',
  'contact.area': 'Xizmat hududi',
  'contact.go': 'Qo‘ng‘iroq qilish',
  'contact.urgent': 'Shoshilinch ta’mir kerakmi?',
  'contact.urgentText':
    'Ariza qoldiring yoki qo‘ng‘iroq qiling — ustani imkon qadar tezroq yuborishga harakat qilamiz.',
  'contact.hoursValue': '24/7',
  'contact.areaValue': 'Toshkent',

  'footer.description':
    'Toshkentda maishiy texnikani uyga borib professional ta’mirlash. Diagnostika, ta’mir va bajarilgan ishlarga kafolat.',
  'footer.services': 'Xizmatlar',
  'footer.navigation': 'Menyu',
  'footer.contacts': 'Aloqa',
  'footer.rights': 'Barcha huquqlar himoyalangan.',
  'footer.privacy': 'Maxfiylik siyosati',
  'footer.terms': 'Foydalanish shartlari',

  'form.location': 'Geolokatsiya (ixtiyoriy)',
  'form.locationHint':
    'Xaritadagi nuqtani yuboring — usta sizni tezroq topadi.',
  'form.locationGet': 'Geolokatsiyamni yuborish',
  'form.locationGetting': 'Aniqlanmoqda…',
  'form.locationReady': 'Geolokatsiya qo‘shildi',
  'form.locationDenied':
    'Geolokatsiyaga ruxsat berilmadi. Manzilni qo‘lda kiritishingiz mumkin.',
  'form.locationUnsupported':
    'Qurilmangiz geolokatsiyani qo‘llab-quvvatlamaydi. Manzilni qo‘lda kiriting.',
  'form.locationError':
    'Geolokatsiyani aniqlab bo‘lmadi. Manzilni qo‘lda kiriting.',
  'form.locationClear': 'O‘chirish',
  'form.summaryLocation': 'Geolokatsiya',

  'form.title': 'Ta’mir uchun ariza',
  'form.validation':
    'Iltimos, ariza to‘g‘ri to‘ldirilganini tekshiring.',
  'form.step1': 'Nimani ta’mirlash kerak?',
  'form.step2': 'Nima sodir bo‘ldi?',
  'form.step3': 'Aloqa ma’lumotlaringiz',
  'form.step': 'Qadam',
  'form.of': '3 dan',
  'form.selectAppliance': 'Ta’mir uchun texnikani tanlang',
  'form.selected': 'Tanlangan texnika',
  'form.problem': 'Muammoni tasvirlang',
  'form.problemPlaceholder':
    'Masalan: muzlatgich sovutmayapti, kir yuvish mashinasi suv chiqarmayapti…',
  'form.problemHint':
    'Batafsil tavsif ustaga ta’mirga tayyorlanishga yordam beradi.',
  'form.fullName': 'Ism va familiya',
  'form.fullNamePlaceholder': 'Ismingiz va familiyangiz',
  'form.address': 'Manzil',
  'form.addressPlaceholder': 'Tuman, ko‘cha, uy, xonadon',
  'form.time': 'Qulay vaqt',
  'form.timePlaceholder': 'Masalan: bugun 18:00 dan keyin',
  'form.comment': 'Qo‘shimcha izoh',
  'form.optional': 'ixtiyoriy',
  'form.commentPlaceholder':
    'Boshqa qo‘shimcha ma’lumot…',
  'form.sending': 'Yuborilmoqda…',
  'form.successTitle': 'Ariza yuborildi!',
  'form.successText':
    'Rahmat! Arizangizni oldik. Tafsilotlarni aniqlash va usta tashrifi vaqtini belgilash uchun siz bilan bog‘lanamiz.',
  'form.summaryAppliance': 'Texnika',
  'form.summaryName': 'Ism',
  'form.summaryPhone': 'Telefon',
  'form.summaryAddress': 'Manzil',
  'form.summaryTime': 'Vaqt',

  'appliance.refrigerator': 'Muzlatgich',
  'appliance.washing_machine': 'Kir yuvish mashinasi',
  'appliance.dishwasher': 'Idish yuvish mashinasi',
  'appliance.stove': 'Plita',
  'appliance.oven': 'Duxovka',
  'appliance.air_conditioner': 'Konditsioner',
  'appliance.other': 'Boshqa texnika',
};

const dictionaries: Record<Language, Dictionary> = {
  ru,
  uz,
  en,
};

export function translate(language: Language, key: string): string {
  return dictionaries[language][key] ?? ru[key] ?? key;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const saved = window.localStorage.getItem(
      'tehmaster-language'
    ) as Language | null;

    if (saved && languages.includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem('tehmaster-language', language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => translate(language, key),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used within LanguageProvider'
    );
  }

  return context;
}
