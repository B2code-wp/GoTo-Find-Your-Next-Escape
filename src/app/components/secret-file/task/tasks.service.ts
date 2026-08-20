 /*this tasks service is just another export class*/

import { Inject, Injectable } from "@angular/core";
import { NewTaskData } from "./task-list/task.list.model(interface)"

// I am adding the injectable here, this is a depend  injection
@Injectable({providedIn: 'root'})

 export class TasksService {
    private tasks = [
  {
    id: 't1',
    userId: 'u1',
    title: 'Entry/Specialist',
    summary: 'Executes specific, daily tasks and projects within a function (e.g., Data Analyst, Junior Developer, Marketing Specialist).',
    dueDate: '2025-12-31',
  },
  {
    id: 't2',
    userId: 'u3',
    title: 'First-Line Management',
    summary: 'Directly oversees the work of a small team of Individual Contributors, ensuring daily operations and tasks are completed correctly.',
    dueDate: '2024-05-31',
  },
  {
    id: 't3',
    userId: 'u3',
    title: 'Mid-Level Management',
    summary: 'Manages a department or functional area, sets departmental goals, handles budgets, and develops the staff under them.',
    dueDate: '2024-06-15',
  }, 
  {
    id: 't4',
    userId: 'u4',
    title: 'Senior Management',
    summary: 'Oversees multiple managers and teams, is responsible for the performance of a large functional area (e.g., Director of Sales), and contributes to high-level strategy.',
    dueDate: '2024-06-15',
  },  
  {
    id: 't5',
    userId: 'u5',
    title: 'C-Suite/Executive',
    summary: `Manages the company's day-to-day operations and internal execution, reporting directly to the CEO.`,
    dueDate: '2024-06-15',
  },
  {
    id: 't6',
    userId: 'u6',
    title: 'Documentation Lead',
    summary: 'Prepare and describe an issue template which will help with project management.',
    dueDate: '2024-06-15',
  },
  {
    id: 't7',
    userId: 'u7',
    title: 'C-Suite/Executive',
    summary: '	The highest-ranking executive, responsible for the overall strategic vision, performance, and long-term success of the entire organization.',
    dueDate: '2024-06-15',
  },
    {
    id: 't7',
    userId: 'u7',
    title: 'Prepare issue template',
    summary:
      'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
  },
   {
    id: 't8',
    userId: 'u8',
    title: 'Executive',
    summary: '	Leads a major division or entire function (e.g., VP of Engineering), setting the strategy and vision for that part of the company.',
    dueDate: '2024-06-15',
  },
] 

// I next add the methods

//LocalStorage for storing Data on my browser 
 constructor() {
  const tasks = localStorage.getItem('tasks');

  if (tasks) {
    this.tasks = JSON.parse(tasks);
  }
 }

getUserTasks(userId: string) {
    return this.tasks.filter((tasks) => tasks.userId === userId)
}

// A method to add a task
addTask(taskData: NewTaskData, userId: string) {
   this.tasks.push({
  id: new Date().getTime().toString(),
  userId: userId,  // we did not have added userId in the new-task.component.html when inputting the NewTaskData so userId is simply userId: this.userId
  title: taskData.title,
  summary: taskData.summary,
  dueDate: taskData.date,
 });
 this.saveTasks(); // Save to localStorage after adding task
}

//this is a method for deleting a Task or task Complete the onCompleteTask(id: string)
removeTask(id: string) {
 this.tasks = this.tasks.filter((task) => task.id !== id); //filter method creates a new array with all elements that pass the test implemented by the provided function
 this.saveTasks(); // Save to localStorage after removing task
}

// Method to mark a task as completed
completeTask(id: string) {
 const task = this.tasks.find(task => task.id === id);
 if (task) {
   // You can add a completed property to the Task interface if needed
   // For now, we'll just remove the task when completed
   this.removeTask(id);
   // saveTasks() is already called in removeTask()
 }
}

// Method to get all tasks (useful for debugging or admin purposes)
getAllTasks() {
 return this.tasks;
}

// Method to get a specific task by ID
getTaskById(id: string) {
 return this.tasks.find(task => task.id === id);
}

//this function is made from the constructor() {} which I will add get
private saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(this.tasks))
}
 }