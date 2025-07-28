export class UserBadges {
  public id: string;
  public badgeId: string;
  public userId: string;
  public badgeName?: string;
  public userName?: string;

  constructor(
    id: string,
    badgeId: string,
    userId: string,
    badgeName?: string,
    userName?: string
  ) {
    this.id = id;
    this.badgeId = badgeId;
    this.userId = userId;
    this.badgeName = badgeName;
    this.userName = userName;
  }
}
