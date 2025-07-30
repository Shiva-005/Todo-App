import { useEffect, useState } from "react"
import './todo.css'

const Todo = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : []
    });
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([...todos, inputValue]);
            setInputValue("");
        }
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleDelete = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    }

    return (
        <div className="app-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter the new todo..." onChange={handleChange} value={inputValue} />
                <button type="submit" onClick={handleSubmit}>Add</button>
            </form>

            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => handleDelete(index)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo
