package uz.todo.app.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.todo.app.payload.Response;
import uz.todo.app.payload.TodoDto;
import uz.todo.app.service.TodoService;

@CrossOrigin(origins = "*")
@RestController
public class TodoController {

    final
    TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping("addTodo")
    public HttpEntity<?> addTodo(@RequestBody TodoDto todoDto){
        Response response = todoService.addTodo(todoDto);
        return ResponseEntity.status(response.isSuccess()?201:409).body(response);
    }

    @GetMapping("todos")
    public HttpEntity<?> getTodos(){
        return ResponseEntity.ok(todoService.getTodos());
    }

    @PutMapping("editTodo")
    public HttpEntity<?> editTodo(@RequestBody TodoDto todoDto){
        Response response = todoService.editTodo(todoDto);
        return ResponseEntity.status(response.isSuccess()?200:409).body(response);
    }

    @DeleteMapping("deleteTodo/{id}")
    public HttpEntity<?> deleteTodo(@PathVariable Integer id){
        Response response = todoService.deleteTodo(id);
        return ResponseEntity.status(response.isSuccess()?200:409).body(response);
    }
}
