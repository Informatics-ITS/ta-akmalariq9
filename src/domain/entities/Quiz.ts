export class Quiz {
  public id: string;
  public title: string;
  public authorType: "supervisor" | "superadmin";
  public authorId: string;

  constructor(
    id: string,
    title: string,
    authorType: "supervisor" | "superadmin",
    authorId: string
  ) {
    this.id = id;
    this.title = title;
    this.authorType = authorType;
    this.authorId = authorId;
  }
}
