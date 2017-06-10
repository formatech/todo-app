/*-----------------------------------------------------------
 | TypeScript declration
 | ----------------------------------------------------------
 | hint for the compiler that these variables are defined
 | outside of our code
 |---------------------------------------------------------*/
declare var $;
declare var ons;


/*-----------------------------------------------------------
 | Global functions
 | ----------------------------------------------------------
 | Functions that are somehow independent from the logic of 
 | the app, for example `random`, `showDialog`, `hideDialog`
 |---------------------------------------------------------*/

var showDialog = function (id) {
    var dialog: any = document.getElementById(id);
    dialog.show();
}

var hideDialog = function (id) {
    var dialog: any = document.getElementById(id);
    dialog.hide();
}


/*-----------------------------------------------------------
 | PhoneGap Device ready event 
 | ----------------------------------------------------------
 | At this point all PhoneGap plugins are ready, for example
 | the `navigator.contacts` plugin.
 | 
 | However we are bootstraping our application also here,
 | That's fine as a start, unless we faced some conflicts 
 | with other libraries.
 |
 |---------------------------------------------------------*/

document.addEventListener('deviceready', () => {

    var todoService = new TodoService();
    var todoController = new TodoController(todoService);

    // same as navigator.contacts
    // https://github.com/formatech/todo-app/tree/session-07#notes-in-this-session
    var contactService = navigator['contacts'];
    var contactController = new ContactController(contactService);

    var tabs: any = document.querySelector('ons-tabbar');

    // Show the first page by default
    // https://onsen.io/v2/docs/js/ons-tabbar.html#method-setActiveTab
    tabs.setActiveTab(0);


    // Watch for tab change, so we update the content of each page accordingly
    // https://onsen.io/v2/docs/js/ons-tabbar.html#event-postchange
    tabs.addEventListener('postchange', function (event) {

        var page = event.tabItem.page;

        if (page === 'all.html') {

            todoController.renderAll();

        } else if (page === 'pending.html') {

            todoController.renderPending();

        } else if (page === 'completed.html') {

            todoController.renderCompleted();

        } else if (page === 'contacts.html') {

            contactController.renderAll();

        }

    });

    /*-----------------------------------------------------------
    | Buttons Bindings
    | ----------------------------------------------------------
    | 
    | We can also use the raw JavaScript Api to select element, 
    | for example 
    |
    | document.querySelector('#btn-add-todo').onclick = function() {
    |   // do you logic here   
    | }
    |
    |---------------------------------------------------------*/
    $('#btn-add-todo').on('click', function () {
        todoController.addTodo();
    });

    $('#btn-clear-todo').on('click', function () {
        todoController.clearTodos();
    });

    $('#btn-add-contact').on('click', function () {
        contactController.addContact();
    });
});