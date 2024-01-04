export interface ICollectorDetail{
    os: IOs;
    id: string;
    lastKeepAlive: Date;
    status: string;
    group: [];
}

export interface IOs { 
    name: string;
}