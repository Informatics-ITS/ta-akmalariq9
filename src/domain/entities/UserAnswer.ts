export class UserAnswer {
  public id!: string;
  public attemptId!: string;
  public userId!: string;
  public selectedOptionId!: string;
  public isCorrect?: boolean;

  constructor(
    id: string,
    attemptId: string,
    userId: string,
    selectedOptionId: string,
    isCorrect?: boolean
  ) {
    this.id = id;
    this.attemptId = attemptId;
    this.userId = userId;
    this.selectedOptionId = selectedOptionId;
    this.isCorrect = isCorrect;
  }
}
