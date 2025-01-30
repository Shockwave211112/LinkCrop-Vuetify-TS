# LinkCrop
Frontend к API сервиса по сокращению ссылок.

Целью было попробовать создать какой-никакой фронт к завалявшемуся API и попробовать
сделать UI на современном стеке Vue 3 + TS + Vuetify с возможностью смены темы и
переключением языка, поиском и всем CRUD функционалом, а также рабочей OAuth Google
авторизацией.
>Vue.JS - 3.4.31
>
>Vuetify - 3.6.14
>
>Pinia - 2.2.8
>
>i18n - 11.0.1
>
>Vite - 5.4.10
>
>Vuelidate - 2.0.3
> 
>TypeScript
>
>Vue Router | ChartJS | MDIcons

## 💿 Запуск
Для запуска требуется API URL в .env.

* Вручную:
```bash
  npm install
```
```bash
  npm run dev
  vite
```
---
```bash
  npm run build
  vite build
```
```bash
  npm run preview
  vite preview
```
---
* Docker (preview):
```bash
cd docker
```
```bash
docker compose up -d
```

## 🖼️ Вид
### Стартовая страница
![Стартовая страница dark-eng](https://s.iimg.su/s/30/3F1TwE6yhNfEoC6sCxzB1Hy9wRbetEKYbQNmFGbl.png)
![Стартовая страница light-rus](https://s.iimg.su/s/30/W4hQrp4huViFBzgMVrIeutqAj03EQqbpoJMVJm4Y.png)
![Стартовая страница auth](https://s.iimg.su/s/30/SyckgBsh64N71RPJM8Nrfd47bB3ISNbqFUwncn1I.png)

### Профиль
![Профиль, редактирование ссылки dark](https://s.iimg.su/s/30/maUTJTsmEVRbqCIm7GrFZ738F5zGngh1JeKqpOix.png)
![Профиль, редактирование ссылки light](https://s.iimg.su/s/30/fQKZbibRAS838jIu9aXzHBkSZq7VGNXIeCcrHPjB.png)

### Создание ссылки/группы
![Профиль, создание ссылки](https://s.iimg.su/s/30/DO7T6PY1vASSOzhQA78qYCSUMAhTcua5vGHLnyCI.png)
![Профиль, создание группы](https://s.iimg.su/s/30/UqHiZDdfnm7CL0VplWH5UxceF0NbkGfiOSAxGMwt.png)

### Настройки пользователя
![Профиль, страница настроек юзера](https://s.iimg.su/s/30/uXAwQxCW3kIlJnlRKgWSQIRXrWL3qiHR8XyYvFG0.png)

### Панель администратора с просмотром всего и вся
![Админ панель, редактирование юзера](https://s.iimg.su/s/30/M9uHwZxnfFsIXsswoswMbANKciI7XAdFIzjlTqEO.png)
![Админ панель, редактирование ссылки](https://s.iimg.su/s/30/0XbKZmNti5e0fSHStyhIShZKpVfYkaoqTXybucqc.png)

### Другие окна на стартовой странице
![Всплывающее меню регистрации](https://s.iimg.su/s/30/5ZU7PVesSRRYUxC2ziisfwbbjlfKQN6YyFKKuFyh.png)
![Всплывающее меню сброса пароля](https://s.iimg.su/s/30/XHdiMBqW3Mj0cfQWaB3kLxws9U4PtutH0mbtS3cQ.png)

