export class Badges {
  public id: string;
  public name: string;
  public quizCompleted: number;
  public description?: string;

  constructor(
    id: string,
    name: string,
    quizCompleted: number,
    description?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quizCompleted = quizCompleted;
  }
}
