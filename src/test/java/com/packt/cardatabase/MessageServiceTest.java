package com.packt.cardatabase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.packt.cardatabase.domain.Message;
import com.packt.cardatabase.service.MessageService;

class MessageServiceTest {
    @Test
    void testAddMessage() {
        MessageService messageService = new MessageService();
        String text = "Hello world";

        Message message = messageService.addMsg(text);

        assertEquals(text, message.getMessage());
    }
}
