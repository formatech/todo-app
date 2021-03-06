/**
 * A service that manage the todos
 */
class TodoService {

    // private Array<Todo> items;

    constructor() {
        this.items = [
            { text: 'first todo', done: false },
            { text: 'first todo', done: false },
        ];
    }

    add(todo) {
        this.items.push(todo);
    }

    get() {
        return this.items;
    }

    /**
     * Toggle todo state
     * @param {*} item 
     */
    toggle(item) {
        item.done = !item.done;
    }

}

function addTodoToHtml(service, item, $items) {

    var $todo = $('<div>')
        .addClass('item')
        .html(item.text);

    // bind an click event 
    $todo.on('click', () => {
        if (item.done) {
            $todo.removeClass('done');
        } else {
            $todo.addClass('done');
        }

        service.toggle(item);
    });

    $items.append($todo);
}


document.addEventListener('deviceready', () => {
    
    

    // create an instance of the todo service
    var service = new TodoService();

    // create a reference for the <div id="items"></div>
    var $items = $('#items');


    /// 1. Fetch all todos

    // get all the todos from the service
    service.get().forEach(x => {

        // render each todo 
        addTodoToHtml(service, x, $items);
    });

    
    
    
    /// 2. add new todo

    // create a reference for the <button id="addBtn"></button>
    var $addBtn = $('#addBtn');
    
    // create a reference for the <input id="todoTxt"/>
    var $todoTxt = $('#todoTxt');

    // bind on click event 
    $addBtn.on('click', () => {

        var todoText = $todoTxt.val();

        // trim the spaces
        if (todoText.trim().length == 0) {
            alert('Please enter what you want todo 😁');

            return;
        }

        var newItem = {
            text: todoText,
            done: false,
        };

        service.add(newItem);

        addTodoToHtml(service, newItem, $items);

        // clear the input again
        $todoTxt.val('');

    });

});