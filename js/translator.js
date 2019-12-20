export default class Translator {
  constructor() {
    this.init();
  }

  init() {
    this.lang = languages[0];
    for (const language of languages) {
      if (navigator.languages.includes(language)) {
        this.lang = language;
        break;
      }
    }
  }

  translate(code) {
    return translations[this.lang][code] || translations[this.lang]['error.unknown'];
  }
}

const languages = ['ru', 'en'];

const translations = {
  ru: {
    'error.network': 'Ошибка сети. Проверьте подключение',
    'error.unknown': 'Произошла ошибка',
    'error.message_send': 'Не удалось отправить сообщение',
    'error.unauthorized':'Вы не авторизированы',
      'error.access':'Ошибка доступа, возможно, у вас недостаточно прав'
  },
  en: {
    'error.network': 'Network error',
    'error.unknown': 'Unknown error',
    'error.message_send': 'Can\'t send message',
    'error.unauthorized':'You are not authorized'
  }
};

