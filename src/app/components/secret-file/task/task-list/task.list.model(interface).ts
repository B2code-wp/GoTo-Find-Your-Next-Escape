export interface Task { 
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
} //Defining an interface for Task object from task.model.ts or in my case it will be the dummyTasks object


  /* Submission */

  /*//I have created a export interface NewTaskData
  instead of:
  @Output() add = new EventEmitter<{title: string; summary: string; date: string}>(); this EventEmitter is of type Object

  To this
  @Output() add = new EventEmitter<NewTaskData>();
*/
export interface NewTaskData {
  title: string;
  summary: string;
  date: string;
}

