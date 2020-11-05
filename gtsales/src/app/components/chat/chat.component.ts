import { Component, OnInit, Inject, ViewChild, ElementRef } from "@angular/core";

import { UserService } from "../../services/user.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Client } from "../../shared/client";
import { ChatService } from "../../services/chat.service";
import { ChatMessage } from "../../shared/chatMessage";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  vendor: Client;
  room: String;
  client: Client;
  message: String;
  messages: ChatMessage[];

  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('in') messageInput: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<ChatComponent>,
    private userService: UserService,
    private chatService: ChatService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject("baseURL") public baseURL
  ) {
    
    console.log(this.data["client_id"], this.data["vendor_id"])
    this.chatService
      .getRoom({
        client_one: this.data["client_id"],
        client_two: this.data["vendor_id"],
      })
      .subscribe((res) => {
        this.room = res["chat_room"];
        console.log(res)
        this.chatService
          .getMessages(this.room["chat_room_id"])
          .subscribe((res) => {
            this.messages = res["messages"];
            console.log(this.messages);
          });
      });
    this.userService.getUser(this.data["vendor_id"]).subscribe((res) => {
      this.vendor = res;
    });
    this.userService.getUser(this.data["client_id"]).subscribe((res) => {
      this.client = res;
    });
  }

  ngOnInit(): void {
    this.scrollToBottom();

    // Receives all messages
    this.chatService.listen("newMessage").subscribe((data) => {
      let dataAux = {
        message_content: data.chat_message,
        client_id: data.client_id,
        client_name: this.client["client_name"],
        client_lastname: this.client["client_lastname"],
        message_date: "",
      };
      console.log("LISTENER", dataAux);
      this.messages.push(dataAux);
    });
  }

  sendMessage(value) {
    this.scrollToBottom();
    console.log(this.messageContainer.nativeElement)
    let messageSchema = {
      chat_message: value,
      client_id: this.data["client_id"],
      chat_room_id: this.room["chat_room_id"],
    };
    console.log(messageSchema);
    this.chatService.emit("newMessage", messageSchema);
    this.messageInput.nativeElement.value  = '';
  }

  scrollToBottom(): void {
    try {
        this.messageContainer.nativeElement.scrollTop = '10000'
    } catch(err) { }                 
}
}
