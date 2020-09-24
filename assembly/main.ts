/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/roles/developer/contracts/assemblyscript
 *
 */

import { Context, logging, storage } from "near-sdk-as";
import { TodoData, todoList, todoMap } from "./model";

const DEFAULT_MESSAGE = "Hello";


export function writeTodo(title: string, photo: Uint8Array): void {  
  const newData = new TodoData(title, photo);
  todoList.push(newData);
  todoMap.set(newData.todoId, newData);
}

export function verifyTodo(todoId: i32) {
  let todoData = todoMap.get(todoId)
  todoData?.setVerified(true);
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

export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/roles/developer/contracts/assemblyscript#imports
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function setGreeting(message: string): void {
  const account_id = Context.sender;

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  );
  message = message.split('').reverse().join('')

  storage.set(account_id, message);
}
