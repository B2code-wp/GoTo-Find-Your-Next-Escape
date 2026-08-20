export interface Task {
  id: string;
  userId: string;   // ✅ REQUIRED (fixes your error)
  role: string;
  title: string;
  summary: string;
  dueDate: string;
}

export const Tasks: Task[] = [
  {
    id: 't1',
    userId: 'u1',
    role: 'Frontend Lead',
    title: 'Master Angular',
    summary: 'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
  },
  {
    id: 't2',
    userId: 'u3',
    role: 'Project Developer',
    title: 'Build First Prototype',
    summary: 'Build a first prototype of the online shop website.',
    dueDate: '2024-05-31',
  },
  {
    id: 't3',
    userId: 'u3',
    role: 'Project Coordinator',
    title: 'Prepare Issue Template',
    summary: 'Prepare and describe an issue template which will help with project management.',
    dueDate: '2024-06-15',
  },
  {
    id: 't4',
    userId: 'u4',
    role: 'Team Assistant',
    title: 'Ths',
    summary: 'Prepare and describe an issue template which will help with project management.',
    dueDate: '2024-06-15',
  },
  {
    id: 't5',
    userId: 'u5',
    role: 'Operations Manager',
    title: 'Prepare Issue Template',
    summary: 'Prepare and describe an issue template which will help with project management.',
    dueDate: '2024-06-15',
  },
  {
    id: 't6',
    userId: 'u6',
    role: 'Documentation Lead',
    title: 'Prepare Issue Template',
    summary: 'Prepare and describe an issue template which will help with project management.',
    dueDate: '2024-06-15',
  },
  {
    id: 't7',
    userId: 'u7',
    role: 'CFO',
    title: 'Prepare Issue Template',
    summary: 'Prepare and describe an issue template which will help with project management.',
    dueDate: '2024-06-15',
  },
];