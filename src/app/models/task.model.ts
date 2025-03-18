export interface Task {
    id: number;
    name: string;
    status: 'Pending' | 'In Progress' | 'Completed';
}
