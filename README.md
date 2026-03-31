# Тестовое задание на позицию Frontend-разработчик в ООО Единая Информационная Система ЖКХ

# Техническое задание

Создать приложение для отображения списка счётчиков горячей и холодной воды.
Дизайн:
https://www.figma.com/design/gxVXNv5MEY8RQ1KXRVvkUT/%D0%A2%D0%B5%D1%81
%D1%82-(%D1%84%D1%80%D0%BE%D0%BD%D1%82)?node-id=0-1&t=QQ9ijj1biJPPjj7
s-0
1. Список счётчиков.
Счётчики получать запросом GET
http://showroom.eis24.me/c300/api/v4/test/meters/ Параметры limit=20 и offset
(выводить по 20 на страницу).
Данные должны выводиться на странице с внутренним скроллом
(«шапка» фиксированная, табличка скроллится внутри).


Колонки:

1. Порядковый номер.
2. Тип (ColdWaterAreaMeter — ХВС, HotWaterAreaMeter — ГВС).
3. Дата установки в формате дд.мм.гггг.
4. Автоматический ли он (is_automatic).
5. Значение (initial_values).
6. Адреc.
7. Примечание (description).


  2. Адрес счётчика.
    Адреса получать параллельным запросом
    GET http://showroom.eis24.me/c300/api/v4/test/areas/ с параметром списка айди id in.
    Продумать оптимизацию, не запрашивать уже известные адреса.
    Выводить улицу, дом, номер квартиры.
  3. Удаление счётчика.
    При наведении на строку должна появляться кнопка удаления, инициирующая
    удаление счётчика (DELETE
    http://showroom.eis24.me/c300/api/v4/test/meters/:meterId/). На странице при этом
    всегда должно оставаться 20 элементов.

Стек технологий:
Использовать React, TypeScript, mobx-state-tree — обязательно,
styled-components — по желанию.
Конфиг Prettier
trailingComma: "es5"
tabWidth: 2
semi: true
singleQuote: true
printWidth: 80
Проект выложить на github.

## Для запуска проекта используйте следующие команды

```
git clone https://github.com/avasilyevartyem/interview-eis.git
```

```
npm i
```

```
npm run dev
```

## Стек:

- **TypeScript**
- **React**
- **Mobx-state-tree**
- **Tanstack**
- **Husky**
- **Github Actions**
- **Vitest**
- **Vite**

## Итог

![alt text](/public/interview-eis-result.jpg)

