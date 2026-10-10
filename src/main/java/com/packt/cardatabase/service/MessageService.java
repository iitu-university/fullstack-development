package com.packt.cardatabase.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.packt.cardatabase.domain.Message;

@Service
public class MessageService {
    private final List<Message> messages = new ArrayList<>();

    public Message addMsg(String text) {
        Message message = new Message(text);
        messages.add(message);
        return message;
    }
}
