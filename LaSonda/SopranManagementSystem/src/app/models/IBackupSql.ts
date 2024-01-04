export interface IBackupSql {
  serverName: string;
  instance: string
  dbName: string
  backupType: string
  backupStartDate: string
}