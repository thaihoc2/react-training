export interface Ticket {
    id: number;
    subject: string;
    description: string;
    requestedDate: number;
    latestUpdate: number;
    status: string;
}