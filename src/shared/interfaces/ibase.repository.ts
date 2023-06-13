export default interface IBaseRepository {
  getServerDate(): Promise<Date>;
}