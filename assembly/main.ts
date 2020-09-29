import { logging } from "near-sdk-as";
import { TodoData, todoList, todoMap  } from "./model";

export function writeTodo(title: string, photo: string): void {  
  const newData = new TodoData(title, photo);
  todoList.push(newData);
  todoMap.set(newData.todoId, newData);
}

export function verifyTodo(todoId: i32): void {
  let todoData = todoMap.get(todoId)
  if (todoData) {    
    todoData.setVerified();
    todoList[todoId-1] = todoData;
    todoMap.set(todoId, todoData);    
  }
}

export function getTotalTodoCount(): i32 {
  return todoList.length;
}

export function getTodoList(): TodoData[] {
  const numList = min(20, todoList.length);
  const startIndex = todoList.length - numList;
  const result = new Array<TodoData>(numList);
  for (let i=0; i < numList; i++) {
    result[i] = todoList[i + startIndex];
  }
  return result
}

export function getTodo(todoId: i32): TodoData|null {
  const todoData = todoMap.get(todoId);
  return todoData;
}
