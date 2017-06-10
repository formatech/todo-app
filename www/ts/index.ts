declare var $;
declare var ContactField;
declare var ContactName;

function addTodoToHtml(service, item, $items) {


    // console.log('adding new todo: ' + item.text);

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
    // console.log($items, $todo);
    $items.append($todo);
}


document.addEventListener('deviceready', () => {

    // to ignore typescript compiler error
    // same as `navigator.contacts`
    var contactsService = navigator['contacts'];

    // create an instance of the todo service
    var service = new TodoService();

    console.log(service);

    // create a reference for the <div id="items"></div>
    var $items = $('#items');


    /// 1. Fetch all todos

    // get all the todos from the service
    service.get().forEach(x => {
        console.log(x);
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




    $('#addcontact').on('click', function () {


        // selection by attributes
        var displayName = $('[name=displayName]').val();
        var name = $('[name=name]').val();
        var nickname = $('[name=nickname]').val();
        var phoneNumbers = $('[name=phoneNumbers]').val();
        var emails = $('[name=emails]').val();
        var note = $('[name=note]').val();


        console.log(displayName, name, nickname, phoneNumbers, emails, note);



        var myContact = contactsService.create({
            displayName: displayName,
            name: new ContactName(null, name, nickname),
            nickname: nickname,
            phoneNumbers: [
                new ContactField('home', phoneNumbers),
            ],
            emails: [
                new ContactField('work', emails),
            ],
            note: note,
        });


        myContact.save(function (contact) {
            alert('contact saved');
        }, function (err) {
            alert('Failed to save the contact')
        });

    });

});