export interface IUser {
    _id: string;
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
    createdBy: string;
}

export interface ITicket {
    id: number;
    title: string;
    description: string;
    assigned: string;
    date: string;
    priority: string;
    statut: string;
    createdBy: string;
}
