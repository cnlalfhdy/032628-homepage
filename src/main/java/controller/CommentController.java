package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin
public class CommentController {

    private List<String> comments = new ArrayList<>();

    @GetMapping("/comments")
    public List<String> getComments() {
        return comments;
    }

    @PostMapping("/comments")
    public void addComment(@RequestBody String comment) {
        comments.add(comment);
    }

    @PutMapping("/comments")
    public void updateComments(@RequestBody List<String> updatedComments) {
        comments = updatedComments;
    }
}