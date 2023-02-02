export interface IUser {
  _id?: number;
  // Дата создания пользователя
  createDate: string;
  // Ссылка на аватар
  avatar?: string;
  // Фамилия
  firstName: string;
  // Имя
  lastName: string;
  // Отчество
  patronymic?: string;
  // Почта
  email: string;
  // Текстовая информация о пользователей
  about?: string;
}

export interface ICheckEmail {
  id?: number;
  email: string;
}

export interface IDeleteUser {
  ids: number[];
}
