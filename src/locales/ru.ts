export default {
  $vuetify: {
    open: 'Открыть',
    close: 'Закрыть',
    input: {
      clear: 'Очистить',
    },
    pagination: {
      ariaLabel: {
        root: 'Навигация пагинации',
        previous: 'Предыдущая',
        next: 'Следующая',
        currentPage: 'Текущая страница',
        page: 'Страница',
      },
    },
    dataFooter: {
      pageText: 'Страница',
      itemsPerPageText: 'Штук на страницу',
      nextPage: 'Следующая страница',
      prevPage: 'Предыдущая страница',
      lastPage: 'Последняя страница',
      firstPage: 'Первая страница',
      itemsPerPageAll: 'Все',
    },
  },
  messages: {
    copied: 'Скопировано',
    checkFields: 'Проверьте данные в полях!',
    login: 'Авторизация успешна!',
    logout: 'Вы вышли из системы',
    register: 'Регистрация успешна!',
    emailSent: 'Письмо отправлено!',
    language: 'Язык - русский',
  },
  errors: {
    default: 'Произошла ошибка',
    incorrect: 'Неправильные данные!',
    tokenNotFound: 'Отсутствует токен для сброса пароля!',
  },
  header: {
    title: 'Войти/Зарегистрироваться',
    auth: 'Авторизация',
    name: 'Имя',
    password: 'Пароль',
    passwordConfirmation: 'Повтор пароля',
    forgot: 'Забыли пароль?',
    register: 'Регистрация',
    login: 'Войти',
    registerConfirm: 'Зарегистрироваться',
    social: 'Или войти с помощью соц. сетей:',
    profile: 'Мой профиль',
    logout: 'Выйти',
    resetTitle: 'Сброс пароля',
    reset: 'Сбросить',
  },
  footer: {
    image: 'Фоновое изображение by ',
    rights: 'Все права защищены',
  },
  resetPassword: {
    title: 'Смена пароля',
    password: 'Введите новый пароль',
    passwordConfirmation: 'Повторите новый пароль',
    save: 'Сохранить новый пароль',
  },
  index: {
    welcome: 'Добро пожаловать в LinkCrop!',
    description: 'Удобный способ сокращения и управления вашими ссылками.',
    advantages: {
      header: 'Наши преимущества',
      adv1: {
        header: 'Быстрота',
        description: 'Сокращение ссылок за секунды.',
      },
      adv2: {
        header: 'Группировка',
        description: 'Возможность создания и назначения групп для ссылок, а также фильтрация по ним.',
      },
      adv3: {
        header: 'Статистика',
        description: 'Функционал просмотра полной статистики переходам по Вашим ссылкам.',
      },
      adv4: {
        header: 'Удобство',
        description: 'Быстрый, понятный и удобный интерфейс.',
      },
    },
    usage: {
      header: 'Как можно использовать наш сервис?',
      description: 'Узнайте, как сокращенные ссылки могут помочь вам оптимизировать работу и сделать ваши задачи эффективнее.',
    },
    examples: {
      ex1: {
        header: 'Для маркетинга',
        description: 'Отслеживайте эффективность рекламных кампаний и оптимизируйте бюджеты.',
      },
      ex2: {
        header: 'Для блогеров',
        description: 'Делитесь короткими и удобными ссылками в соцсетях для вашей аудитории.',
      },
      ex3: {
        header: 'Для бизнеса',
        description: 'Получайте аналитику и улучшайте взаимодействие с клиентами.',
      },
      ex4: {
        header: 'Для всех',
        description: 'Сокращение ссылок — это просто, быстро и удобно для любых целей.',
      },
    },
    start: 'Давайте начнём',
  },
  profile: {
    search: 'Поиск',
    whereSearch: 'Где?',
    searchOptions: {
      title: 'Название',
      description: 'Описание',
      redirect: 'Куда',
      endpoint: 'Эндпоинт',
      linksCount: 'Количество ссылок',
    },
    sortOrder: 'Порядок сортировки',
    sort: 'Сортировка',
    sortOptions: {
      title: 'Название',
      description: 'Описание',
      endpoint: 'Эндпоинт',
      linksCount: 'Количество ссылок',
    },
    defaultGroupSelect: 'Все',
    buttons: {
      save: 'Сохранить',
      delete: 'Удалить',
      reset: 'Сбросить поля',
    },
    nothingFound: 'Ничего не найдено',
    links: {
      title: 'Ссылки',
      header: 'Список ссылок',
      create: 'Создать ссылку',
      table: {
        title: 'Название:',
        endpoint: 'Эндпоинт:',
        description: 'Описание:',
        groups: 'Группы:',
        buttons: {
          stat: 'Открыть статистику',
          copy: 'Скопировать ссылку',
        },
      },
      form: {
        title: 'Название',
        header: 'Создание новой ссылки',
        redirect: 'Куда редиректим?',
        description: 'Описание',
        groups: 'Группы',
        createdAt: 'Дата создания',
      }
    },
    groups: {
      title: 'Группы',
      header: 'Список групп',
      create: 'Создать группу',
      table: {
        title: 'Название:',
        description: 'Описание:',
        linksCount: 'Количество ссылок в группе:',
      },
      form: {
        header: 'Создание новой группы',
        title: 'Название',
        description: 'Описание',
        createdAt: 'Дата создания',
      }
    },
    settings: {
      title: 'Настройки',
      header: 'Настройки профиля',
      welcome: 'Привет, ',
      subtitle: 'Здесь ты можешь подтвердить адрес электронной почты или сменить пароль.',
      email: 'Адрес электронной почты',
      verifyEmail: 'Подтвердите email!',
      sendBtn: 'Отправить подтверждение',
      passwordChange: 'Смена пароля',
      resetBtn: 'Сбросить пароль',
    },
    admin: {
      title: 'Админка',
      tabs: {
        users: 'Пользователи',
        links: 'Ссылки',
        groups: 'Группы',
        permissions: 'Права',
      },
      users: {
        name: 'Имя пользователя',
        createdAt: 'Дата регистрации',
      },
      groupsId: 'ID групп',
      usersId: 'ID пользователей',
      roleList: 'Список ролей',
      roles: {
        admin: 'Админ',
        user: 'Пользователь',
      },
      forms: {
        user: 'Пользователь',
        group: 'Группа',
        link: 'Ссылка',
        emailConfirmation: 'Email подтверждён',
        emailNotConfirmed: 'Email не подтверждён',
        role: 'Роль',
        checkAll: 'Выбрать все',
        uncheck: 'Снять выделение',
      },
    },
  }
};
