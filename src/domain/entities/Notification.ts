export class Notification {
  public id!: string;
  public category!: string;
  public message!: string;
  public supervisorId!: string;

  constructor(
    id: string,
    category: string,
    message: string,
    supervisorId: string
  ) {
    this.id = id;
    this.category = category;
    this.message = message;
    this.supervisorId = supervisorId;
  }
}
