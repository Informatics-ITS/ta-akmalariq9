export class Supervisor {
  public id!: string;
  public userId!: string;
  public companyId!: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public companyName?: string;

  constructor(
    id: string,
    userId: string,
    companyId: string,
    name?: string,
    email?: string,
    password?: string,
    companyName?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.companyId = companyId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.companyName = companyName;
  }
}
