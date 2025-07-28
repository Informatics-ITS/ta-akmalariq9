export class Employee {
  public id: string;
  public userId: string;
  public supervisorId: string;
  public companyId: string;
  public divisionId: string;
  public name?: string;
  public email?: string;
  public password?: string;
  public companyName?: string;
  public divisionName?: string;
  public supervisorName?: string;

  constructor(
    id: string,
    userId: string,
    supervisorId: string,
    companyId: string,
    divisionId: string,
    name?: string,
    email?: string,
    password?: string,
    companyName?: string,
    divisionName?: string,
    supervisorName?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.supervisorId = supervisorId;
    this.companyId = companyId;
    this.divisionId = divisionId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.companyName = companyName;
    this.divisionName = divisionName;
    this.supervisorName = supervisorName;
  }
}
