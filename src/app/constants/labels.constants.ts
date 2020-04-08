export class LabelsConstants {
  static readonly CREATE = 'Создать';
  static readonly CHANGE = 'Изменить';
  static readonly REMOVE = 'Удалить';
  static readonly ENTER = 'Войти';
  static readonly EXIT = 'Выйти';
  static readonly DESCRIPTION = 'Описание';
  static readonly CATEGORY = 'Категория';
  static readonly TYPE = 'Тип';
  static readonly NAME = 'Имя';
  static readonly FIRST_NAME = 'Имя';
  static readonly LAST_NAME = 'Фамилия';
  static readonly ADDRESS = 'Адрес';
  static readonly PHONE = 'Телефон';
  static readonly CREATION_DATE = 'Дата создания';
  static readonly CREATION_TIME = 'Время создания';
  static readonly TOTAL_COST = 'Полная стоимость';
  static readonly TOKEN = 'Токен';
  static readonly PRODUCT = 'продукт';
  static readonly PRODUCTS = 'Продукты';
  static readonly PRICE = 'Цена';
  static readonly ORDERS = 'Заказы';
  static readonly MAILING = 'Рассылка новостей';
  static readonly MORE = 'Подробнее';
  static readonly RUBLES_POSTFIX = 'р.';
  static readonly NUMBER = '№';

  static readonly YOU_MUST_ENTER_VALUE = 'Вы должны ввести значение';
  static readonly IMPORT_SHOP_PORTAL = 'Import shop portal';
  static readonly PRODUCT_IMAGE = 'Изображение продукта';
  static readonly SOMETHING_IS_WRONG = 'Что-то пошло не так...';
  static readonly ACCOUNT_REMOVED = 'Аккаунт удалён';
  static readonly ACCOUNT_CREATED = 'Аккаунт создан';

  static readonly CLICK_TO_SEE_ORDER = (client: string) => `Нажмите, чтобы увидеть полное описание заказа клиента ${client}`;

  static readonly MIN_LENGTH_ERROR = (minLength: number) => `Минимальная длина: ${minLength}`;
  static readonly MIN_VALUE_ERROR = (min: number) => `Минимальное значение: ${min}`;
  static readonly MAX_VALUE_ERROR = (min: number) => `Максимальное значение: ${min}`;

  static readonly TO_PRICE = (value: number) => `${value}р.`;
  static readonly TO_DATE = (date: Date) => `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
  static readonly TO_TIME = (date: Date) => `${date.getHours()}:${date.getMinutes()}`;
}
