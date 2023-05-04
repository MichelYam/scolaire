export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    friendList: IUser[];
    role: string;
}
export interface INotification {
    _id: string;
    sender: string;
    recipient: string;
    status: string;
    type?: string
}

export interface IEvent {
    id: number;
    title: string;
    description: string;
    assigned: string;
    date: string;
    createdBy: string;
}

export interface ITask {
    id: number;
    title: string;
    description: string;
    assignee: string;
    date: string;
    dateDue: string;
    status: string;
    createdBy: string;
}
