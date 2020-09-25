import { context, u128, PersistentVector, PersistentMap } from "near-sdk-as";

@nearBindgen
export class TodoData {
  todoId: i32;
  owner: string;
  title: string;
  photo: Uint8Array;
  timestamp: u64;
  isVerified: bool;
  verifier: string;

  constructor(title: string, photo: Uint8Array) {
    this.todoId = todoList.length + 1;
    this.owner = context.sender;
    this.title = title;
    this.photo = photo;
    this.timestamp = context.blockIndex;
    this.isVerified = false;    
  }

  setVerified(isVerified: bool): void {
    this.isVerified = true;
    this.verifier = context.sender;  
  }

}

export const todoList = new PersistentVector<TodoData>("t");
export const todoMap = new PersistentMap<i32, TodoData>("t");

/** 
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedMessage {
  premium: boolean;
  sender: string;
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}
/** 
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const messages = new PersistentVector<PostedMessage>("m");