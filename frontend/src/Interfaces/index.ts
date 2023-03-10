export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    friendsList: [];
    role: string;
}

export interface IEvents {
    id: number;
    title: string;
    description: string;
    assigned: string;
    date: string;
    priority: string;
    status: string;
    createdBy: string;
}

export interface ITicket {
    id: number;
    title: string;
    description: string;
    assigned: string;
    date: string;
    priority: string;
    status: string;
    createdBy: string;
}