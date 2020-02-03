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
  static readonly TOKEN = 'Токен';
  static readonly PRODUCT = 'продукт';
  static readonly PRODUCTS = 'Продукты';
  static readonly PRICE = 'Цена';
  static readonly ORDERS = 'Заказы';
  static readonly MAILING = 'Рассылка новостей';
  static readonly RUBLES_POSTFIX = 'р.';

  static readonly YOU_MUST_ENTER_VALUE = 'Вы должны ввести значение';
  static readonly IMPORT_SHOP_PORTAL = 'Import shop portal';
  static readonly PRODUCT_IMAGE = 'Изображение продукта';
  static readonly SOMETHING_IS_WRONG = 'Что-то пошло не так...';
  static readonly INPUT_TOKEN = 'Введите токен';
  static readonly ACCOUNT_REMOVED = 'Аккаунт удалён';
  static readonly ACCOUNT_CREATED = 'Аккаунт создан';

  static readonly MIN_LENGTH_ERROR = (minLength: number) => `Минимальная длина: ${minLength}`;
  static readonly MIN_VALUE_ERROR = (min: number) => `Минимальная значение: ${min}`;
}
