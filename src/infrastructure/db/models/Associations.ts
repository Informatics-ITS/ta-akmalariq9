import { UserModel } from "./UserModels";
import { QuizModel } from "./QuizModels";
import { BadgesModel } from "./BadgesModels";
import { OptionModel } from "./OptionModels";
import { CompanyModel } from "./CompanyModels";
import { EmployeeModel } from "./EmployeeModels";
import { DivisionModel } from "./DivisionModels";
import { QuestionModel } from "./QuestionModels";
import { ErgonomicModel } from "./ErgonomicModels";
import { UserAnswerModel } from "./UserAnswerModels";
import { SupervisorModel } from "./SupervisorModels";
import { UserBadgesModel } from "./UserBadgesModels";
import { QuizAttemptModel } from "./QuizAttemptModels";
import { NotificationModel } from "./NotificationModels";
import { ErgonomicMoveNetModel } from "./ErgonomicMoveNetModels";
import { ErgonomicVideoModel } from "./ErgonomicVideoModels";
import { ErgonomicVideoMoveNetModel } from "./ErgonomicVideoMoveNetModels";

export const defineAssociations = () => {
  UserModel.hasOne(SupervisorModel, {
    foreignKey: "userId",
    as: "supervisorProfile",
    onDelete: "CASCADE",
  });
  SupervisorModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  UserModel.hasOne(EmployeeModel, {
    foreignKey: "userId",
    as: "employeeProfile",
    onDelete: "CASCADE",
  });
  EmployeeModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  SupervisorModel.hasMany(EmployeeModel, {
    foreignKey: "supervisorId",
    as: "employees",
  });
  EmployeeModel.belongsTo(SupervisorModel, {
    foreignKey: "supervisorId",
    as: "supervisor",
  });

  CompanyModel.hasMany(EmployeeModel, {
    foreignKey: "companyId",
    as: "employees",
  });
  EmployeeModel.belongsTo(CompanyModel, {
    foreignKey: "companyId",
    as: "company",
  });

  DivisionModel.hasMany(EmployeeModel, {
    foreignKey: "divisionId",
    as: "employees",
  });
  EmployeeModel.belongsTo(DivisionModel, {
    foreignKey: "divisionId",
    as: "division",
  });

  CompanyModel.hasMany(SupervisorModel, {
    foreignKey: "companyId",
    as: "supervisors",
  });
  SupervisorModel.belongsTo(CompanyModel, {
    foreignKey: "companyId",
    as: "company",
  });

  CompanyModel.hasMany(DivisionModel, {
    foreignKey: "companyId",
    as: "divisions",
  });
  DivisionModel.belongsTo(CompanyModel, {
    foreignKey: "companyId",
    as: "company",
  });

  QuizModel.hasMany(QuestionModel, {
    foreignKey: "quizId",
    as: "questions",
  });
  QuestionModel.belongsTo(QuizModel, {
    foreignKey: "quizId",
    as: "quiz",
  });

  QuestionModel.hasMany(OptionModel, {
    foreignKey: "questionId",
    as: "options",
    onDelete: "CASCADE",
    hooks: true,
  });
  OptionModel.belongsTo(QuestionModel, {
    foreignKey: "questionId",
    as: "question",
  });

  QuizModel.hasMany(QuizAttemptModel, {
    foreignKey: "quizId",
    as: "attempts",
  });
  QuizAttemptModel.belongsTo(QuizModel, {
    foreignKey: "quizId",
    as: "quiz",
  });

  QuizAttemptModel.hasMany(UserAnswerModel, {
    foreignKey: "attemptId",
    as: "answers",
  });
  UserAnswerModel.belongsTo(QuizAttemptModel, {
    foreignKey: "attemptId",
    as: "attempt",
  });

  OptionModel.hasMany(UserAnswerModel, {
    foreignKey: "selectedOptionId",
    as: "userAnswers",
  });
  UserAnswerModel.belongsTo(OptionModel, {
    foreignKey: "selectedOptionId",
    as: "option",
  });

  UserModel.hasMany(UserBadgesModel, {
    foreignKey: "userId",
    as: "userBadges",
  });
  UserBadgesModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  BadgesModel.hasMany(UserBadgesModel, {
    foreignKey: "badgeId",
    as: "userBadgeAssignments",
  });
  UserBadgesModel.belongsTo(BadgesModel, {
    foreignKey: "badgeId",
    as: "badge",
  });

  SupervisorModel.hasMany(NotificationModel, {
    foreignKey: "supervisorId",
    as: "notifications",
  });
  NotificationModel.belongsTo(SupervisorModel, {
    foreignKey: "supervisorId",
    as: "supervisor",
  });

  UserModel.hasMany(QuizAttemptModel, {
    foreignKey: "userId",
    as: "quizAttempts",
  });
  QuizAttemptModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  UserModel.hasMany(QuizModel, {
    foreignKey: "authorId",
    as: "quizzes",
    onDelete: "CASCADE",
  });

  QuizModel.belongsTo(UserModel, {
    foreignKey: "authorId",
    as: "author",
  });

  UserModel.hasMany(UserAnswerModel, {
    foreignKey: "userId",
    as: "userAnswers",
  });

  UserAnswerModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  UserModel.hasMany(ErgonomicModel, {
    foreignKey: "userId",
    as: "ergonomicRecords",
    onDelete: "CASCADE",
  });

  ErgonomicModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  UserModel.hasMany(ErgonomicMoveNetModel, {
    foreignKey: "userId",
    as: "ergonomicMoveNetRecords",
    onDelete: "CASCADE",
  });

  ErgonomicMoveNetModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  ErgonomicVideoModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  UserModel.hasMany(ErgonomicVideoModel, {
    foreignKey: "userId",
    as: "ergonomicVideoRecords",
    onDelete: "CASCADE",
  });

  ErgonomicVideoMoveNetModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user",
  });

  UserModel.hasMany(ErgonomicVideoMoveNetModel, {
    foreignKey: "userId",
    as: "ergonomicVideoMoveNetRecords",
    onDelete: "CASCADE",
  });
};
