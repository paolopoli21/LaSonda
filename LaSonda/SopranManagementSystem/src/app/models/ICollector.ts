export interface ICollector {
    iD_Wazuh: string
    name: string
    ip: string
    scanDate: string
    jsoN_Data: string
}

export interface ICollectorsAddJson extends ICollector {
    os: string;
    id: number;
    lastKeepAlive: string;
    status: string;
    group: string
}   