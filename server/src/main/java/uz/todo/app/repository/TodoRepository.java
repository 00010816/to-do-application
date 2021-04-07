package uz.todo.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.todo.app.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
}
