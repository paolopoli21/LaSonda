export interface IMonitoring {
    processname:     string;
    instance:        string;
    lastRun:     Date;
    runduration:     string;
    executionstatus: string;
    nextRun:     Date;
    checkProcess: Number;
    colore: string;
}