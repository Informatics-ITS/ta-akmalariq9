export class User {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "personal" | "supervisor" | "employee" | "superadmin";

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: "personal" | "supervisor" | "employee" | "superadmin"
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
