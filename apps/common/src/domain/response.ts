export class Response<T> {
  message = '¡Operación exitosa!';
  data: T;
  constructor(data: T, message?: string) {
    if (message) this.message = message;
    this.data = data;
  }
}
