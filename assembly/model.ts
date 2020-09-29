import { context, u128, PersistentVector, PersistentMap, logging } from "near-sdk-as";

@nearBindgen
export class TodoData {
  todoId: i32;
  owner: string;
  title: string;
  photo: string;
  timestamp: u64;
  isVerified: bool;
  verifier: string;

  constructor(title: string, photo: string) {
    this.todoId = todoList.length + 1;
    this.owner = context.sender;
    this.title = title;
    this.photo = photo;
    this.timestamp = context.blockIndex;
    this.isVerified = false;    
  }

  setVerified(): void {
    this.isVerified = true;
    this.verifier = context.sender;    
  }

}

export const todoList = new PersistentVector<TodoData>("t");
export const todoMap = new PersistentMap<i32, TodoData>("t");
