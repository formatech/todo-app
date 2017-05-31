function log(text) {
    // throw "fake error here";
    console.log(text);
}
function addTodoToHtml(service, item, $items) {
    log('adding new todo: ' + item.text);
    var $todo = $('<div>')
        .addClass('item')
        .html(item.text);
    // bind an click event 
    $todo.on('click', function () {
        if (item.done) {
            $todo.removeClass('done');
        }
        else {
            $todo.addClass('done');
        }
        service.toggle(item);
    });
    $items.append($todo);
}
document.addEventListener('deviceready', function () {
    // setup navigation
    $('#todo-page').show();
    // show todo page
    $('[tab="todo-page"]').on('click', function () {
        $('#todo-page').show();
        $('#about-page').hide();
    });
    // show about page
    $('[tab="about-page"]').on('click', function () {
        $('#about-page').show();
        $('#todo-page').hide();
    });
    // create an instance of the todo service
    var service = new TodoService();
    // create a reference for the <div id="items"></div>
    var $items = $('#items');
    /// 1. Fetch all todos
    // get all the todos from the service
    service.get().forEach(function (x) {
        // render each todo 
        addTodoToHtml(service, x, $items);
    });
    /// 2. add new todo
    // create a reference for the <button id="addBtn"></button>
    var $addBtn = $('#addBtn');
    // create a reference for the <input id="todoTxt"/>
    var $todoTxt = $('#todoTxt');
    // bind on click event 
    $addBtn.on('click', function () {
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
    // navigator.contacts.pickContact(function (contact) {
    //     alert(JSON.stringify(contact))
    // }, function (err) {
    //     console.log(err);
    // });
});
var TodoService = (function () {
    function TodoService() {
        this.items = [
            { text: 'first todo', done: false },
            { text: 'first todo', done: false },
        ];
    }
    TodoService.prototype.add = function (todo) {
        this.items.push(todo);
    };
    TodoService.prototype.get = function () {
        return this.items;
    };
    /**
     * Toggle todo state
     * @param {*} item
     */
    TodoService.prototype.toggle = function (item) {
        item.done = !item.done;
    };
    return TodoService;
}());
