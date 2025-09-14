// Interface för en todo
interface Todo {
    task: string;
    completed: boolean;
    priority: number;
    createdAt: Date;
    completedAt?: Date;
}

// Klass för att hantera todo-listan
class TodoList {
    private todos: Todo[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    // Lägg till en ny todo
    addTodo(task: string, priority: number): boolean {
        if (!task || task.trim() === '') return false;
        if (![1,2,3].includes(priority)) return false;

        const newTodo: Todo = {
            task: task.trim(),
            completed: false,
            priority,
            createdAt: new Date()
        };

        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }

    // Markera en todo som klar
    markTodoCompleted(index: number): void {
        const todo = this.todos[index];
        if (todo && !todo.completed) {
            todo.completed = true;
            todo.completedAt = new Date();
            this.saveToLocalStorage();
        }
    }

    // Ta bort en todo
    removeTodo(index: number): void {
        this.todos.splice(index, 1);
        this.saveToLocalStorage();
    }

    // Hämta alla todos
    getTodos(): Todo[] {
        return this.todos;
    }

    // Spara och ladda från localStorage
    saveToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // Ladda todos från localStorage
    loadFromLocalStorage(): void {
        const stored = localStorage.getItem('todos');
        if (stored) {
            this.todos = JSON.parse(stored).map((todo: any) => ({
                ...todo,
                createdAt: new Date(todo.createdAt),
                completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined
            }));
        }
    }
}

// DOM & UI logik
const todoList = new TodoList();

const form = document.getElementById('todo-form') as HTMLFormElement;
const taskInput = document.querySelector('.task') as HTMLInputElement;
const priorityInput = document.querySelector('.priority') as HTMLSelectElement;
const ul = document.querySelector('.todo-list') as HTMLUListElement;

// Rendera todo-listan
function renderTodos() {
    ul.innerHTML = ''; // Tömma listan

    todoList.getTodos().forEach((todo, index) => {
        const li = document.createElement('li');

        // Skapa texten för uppgift
        const span = document.createElement('span');
        let text = `${todo.task} (Prioritet: ${todo.priority}) - Skapad: ${todo.createdAt.toLocaleDateString()}`;
        if (todo.completed && todo.completedAt) {
            text += ` - Klar: ${todo.completedAt.toLocaleDateString()}`;
            li.style.textDecoration = 'line-through';
            li.style.color = '#888';
        }
        span.textContent = text;

        // Lägg texten först
        li.appendChild(span);

        // Skapa knappar
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Markera som klar';
        completeBtn.onclick = () => {
            todoList.markTodoCompleted(index);
            renderTodos();
        };

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Ta bort';
        removeBtn.onclick = () => {
            todoList.removeTodo(index);
            renderTodos();
        };

        // Placera knappar i en container under texten
        const btnContainer = document.createElement('div');
        btnContainer.style.marginTop = '5px'; // lite avstånd
        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(removeBtn);

        // Lägg container under span
        li.appendChild(btnContainer);

        // Lägg till li i ul
        ul.appendChild(li);
    });
}

// Lägg till ny todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = todoList.addTodo(taskInput.value, Number(priorityInput.value));
    if (!success) {
        alert('Felaktig uppgift eller prioritet!');
        return;
    }
    taskInput.value = '';
    priorityInput.value = '';
    renderTodos();
});

// Initiera listan vid start
renderTodos();