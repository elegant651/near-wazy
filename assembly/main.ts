import { logging } from "near-sdk-as";
import { PostedMessage, messages, TodoData, todoList, todoMap  } from "./model";

// --- contract code goes below

const DEFAULT_MESSAGE = "Hello";

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



// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the the persistent collection
  messages.push(message);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */ 
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for (let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}
