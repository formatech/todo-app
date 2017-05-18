class TodoService {

    constructor() {
        this.todos = [
            {
                title: 'Task one',
                done: false,
            }
        ];
    }

    add(todo) {
        this.todos.add(todo);
    }

    toggle(item) {
        item.done = !item.done;
    }

    remove(todo) {
        this.todos = this.todos.filter(x => x != todo);
    }

    get() {
        return this.todos;
    }

}

document.addEventListener('deviceready', function () {

    var todos = new TodoService();

    $('#todos').click(() => {

        $('#page-about').hide();
        $('#page-todos').show();

        $('#todos-holder').empty();

        todos.get().forEach(x => {

            var row = $('<div class="' + (x.done ? 'done' : '') + '">').html(x.title);

            row.click(() => {
                todos.toggle(x);
                if (x.done) {
                    row.addClass('done')
                } else {
                    row.removeClass('done');
                }
            });

            $('#todos-holder').append(row);
        });


        return false;
    })

    $('#about').click(() => {

        $('#page-about').show();
        $('#page-todos').hide();

        return false;
    });

    $('#todos').click();


});