package uz.todo.app.service;

import org.springframework.stereotype.Service;
import uz.todo.app.entity.Todo;
import uz.todo.app.payload.Response;
import uz.todo.app.payload.TodoDto;
import uz.todo.app.repository.TodoRepository;

@Service
public class TodoService {

    final
    TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Response addTodo(TodoDto todoDto) {
        try {
            Todo todo = new Todo();
            todo.setId(todoDto.getId());
            todo.setText(todoDto.getText());
            todoRepository.save(todo);
            return new Response("Successfully created!", true);
        }catch (Exception e){
            return new Response("Error!", false);
        }
    }

    public Object getTodos() {
        try {
            return new Response("Success!",true, todoRepository.findAll());
        }catch (Exception todos){
            return new Response("Error", false);
        }
    }

    public Response editTodo(TodoDto todoDto) {
        try {
            Todo todo = new Todo();
            todo.setId(todoDto.getId());
            todo.setText(todoDto.getNewText());
            todoRepository.save(todo);
            return new Response("Success!",true);
        }catch (Exception e){
            return new Response("Error!",false);
        }
    }

    public Response deleteTodo(Integer id) {
        try {
            todoRepository.deleteById(id);
            return new Response("Success!",true);
        }catch (Exception e){
            return new Response("Error!",false);
        }
    }
}
