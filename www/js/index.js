var ContactController = (function () {
    function ContactController(contactService) {
        this.contactService = contactService;
        this.$contactsHolder = $('#contacts');
    }
    ContactController.prototype.addContact = function () {
        /*-----------------------------------------------------------
         | Read form values
         | ----------------------------------------------------------
         | the `.val()` method return the value of the input
         | Sometimes you may need to call the `.trim()` method to
         | remove the unnecessary whitespace
         |
         | Here we are using the **Attribute Selection** we can
         | use any method of selection for example by Class or by Id
         |---------------------------------------------------------*/
        var displayName = $('[name=displayName]').val();
        var name = $('[name=name]').val();
        var nickname = $('[name=nickname]').val();
        var phoneNumbers = $('[name=phoneNumbers]').val();
        var emails = $('[name=emails]').val();
        var note = $('[name=note]').val();
        // create a new contact instance
        var myContact = this.contactService.create();
        // fill the contact fields
        myContact.displayName = displayName;
        myContact.name = new ContactName(null, name, nickname);
        myContact.nickname = nickname;
        // note that a contact my have multiple phone numbers, for this reason
        // the phoneNumbers is of type Array<ContactField>
        myContact.phoneNumbers = [
            new ContactField('home', phoneNumbers),
        ];
        // same note as phoneNumbers
        myContact.emails = [
            new ContactField('work', emails),
        ];
        myContact.note = note;
        // Save the contact to the phone database
        myContact.save(function onSuccess(contact) {
            ons.notification.toast({ message: 'contact saved', timeout: 2000 });
            // rerender the page
            this.renderAll();
            // clear inputs
            $('[name=form-add-contact] input').val('');
            // hide the dialog
            hideDialog('dialog-add-contact');
        }, function onError(err) {
            // show error dialog
            ons.notification.alert('Failed to save the contact');
        });
    };
    ContactController.prototype.renderAll = function () {
        var _this = this;
        // check this link https://github.com/apache/cordova-plugin-contacts#contactfieldtype
        var types = this.contactService.fieldType;
        var fieldsToSearchOn = [
            types.name,
            types.displayName,
            types.middleName,
            types.familyName,
            types.givenName,
            types.nickName
        ];
        var searchOptions = {
            filter: '',
            multiple: true
        };
        var items = this.contactService.find(fieldsToSearchOn, function (contacts) {
            _this._renderItems(_this.$contactsHolder, contacts);
        }, function (error) {
            ons.notification.alert('Failed to retrieve contacts');
        }, searchOptions);
    };
    ContactController.prototype._renderItems = function ($holder, items) {
        var _this = this;
        $holder.empty(); // same as $holder.html('');
        if (items.length > 0) {
            items.forEach(function (todo) { return _this._renderItem($holder, todo); });
        }
        else {
            // show a no-data message 
            $holder.append('<ons-list-header>No Contacts found</ons-list-header>');
        }
    };
    ContactController.prototype._renderItem = function ($holder, contact) {
        var phonenumber = '<i>No phone number</i>';
        if (contact.phoneNumbers && contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].value) {
            phonenumber = contact.phoneNumbers[0].value;
        }
        var htmlTmpl = "\n        <ons-list-item>\n            <div class=\"left\">\n                <ons-icon icon=\"md-face\" class=\"list-item__icon\"></ons-icon>\n            </div>\n            <div class=\"center\">\n                <span class=\"list-item__title\">" + contact.name.formatted + "</span>\n                <span class=\"list-item__subtitle\">" + phonenumber + "</span>\n            </div>\n        </ons-list-item>";
        // remember: when passing html to the $() => we are creating an element and NOT selecting
        var $contact = $(htmlTmpl);
        $holder.append($contact);
    };
    return ContactController;
}());
/*-----------------------------------------------------------
 | Global functions
 | ----------------------------------------------------------
 | Functions that are somehow independent from the logic of
 | the app, for example `random`, `showDialog`, `hideDialog`
 |---------------------------------------------------------*/
var showDialog = function (id) {
    var dialog = document.getElementById(id);
    dialog.show();
};
var hideDialog = function (id) {
    var dialog = document.getElementById(id);
    dialog.hide();
};
/*-----------------------------------------------------------
 | PhoneGap Device ready event
 | ----------------------------------------------------------
 | At this point all PhoneGap plugins are ready, for example
 | the `navigator.contacts` plugin.
 |
 | However we are bootstrapping our application also here,
 | That's fine as a start, unless we faced some conflicts
 | with other libraries.
 |
 |---------------------------------------------------------*/
document.addEventListener('deviceready', function () {
    var todoService = new TodoService();
    var todoController = new TodoController(todoService);
    // same as navigator.contacts
    // https://github.com/formatech/todo-app/tree/session-07#notes-in-this-session
    var contactService = navigator['contacts'];
    var contactController = new ContactController(contactService);
    var tabs = document.querySelector('ons-tabbar');
    // Show the first page by default
    // https://onsen.io/v2/docs/js/ons-tabbar.html#method-setActiveTab
    tabs.setActiveTab(0);
    // Watch for tab change, so we update the content of each page accordingly
    // https://onsen.io/v2/docs/js/ons-tabbar.html#event-postchange
    tabs.addEventListener('postchange', function (event) {
        var page = event.tabItem.page;
        if (page === 'all.html') {
            todoController.renderAll();
        }
        else if (page === 'pending.html') {
            todoController.renderPending();
        }
        else if (page === 'completed.html') {
            todoController.renderCompleted();
        }
        else if (page === 'contacts.html') {
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
/*-----------------------------------------------------------
 | Component declaration
 | ----------------------------------------------------------
 | A component is a reusable UI control that encapsulate
 | it's own logic
 |
 | If you are finding yourself writing to much code to
 | manage the UI most probably you need to rewrite your code
 | in a component
 |---------------------------------------------------------*/
(function () {
    $('tabs').each(function () {
        var $tabs = $(this).find('tab');
        var selector = '#' + $(this).attr('target');
        var $pages = $(selector + ' page');
        $tabs.on('click', function () {
            var index = $(this).index();
            // hide pages and show current page
            $pages.removeClass('active');
            $($pages[index]).addClass('active');
            // remove active from tabs and add it to the current tab
            $tabs.removeClass('active');
            $($tabs[index]).addClass('active');
        });
    });
})();
/*-----------------------------------------------------------
 | Todo Controller
 | ----------------------------------------------------------
 | You can think of the controller as a Bridge between the
 | Service and the UI
 |
 | In most cases the controller depend on the services
 | Here is the right place to manage the UI, bind data,
 | manage forms...
 |
 | Avoid complex calculations here, if you have complex logic
 | move it to the service instead
 |
 |---------------------------------------------------------*/
var TodoController = (function () {
    function TodoController(service) {
        this.service = service;
        /*-----------------------------------------------------------
         | jQuery element reference
         | ----------------------------------------------------------
         | Create jQuery reference for the elements needed
         |
         | A good practice is to start your jQuery variable with $
         |
         |---------------------------------------------------------*/
        this.$allHolder = $('#all');
        this.$pendingHolder = $('#pending');
        this.$completedHolder = $('#completed');
    }
    /**
     * Add todo logic
     */
    TodoController.prototype.addTodo = function () {
        var text = $('#input-todo').val().trim();
        if (text.length === 0) {
            ons.notification.alert('Please enter a valid text');
            return;
        }
        this.service.add({
            text: text,
            done: false
        });
        // rerender the page
        this.renderAll();
        // clear up the input
        $('#input-todo').val('');
        // hide the dialog
        hideDialog('dialog-add-todo');
    };
    /**
     * Clear all todos logic
     */
    TodoController.prototype.clearTodos = function () {
        var _this = this;
        ons.notification
            .confirm('Are you sure you want to clear all todos ?')
            .then(function (response) {
            if (response > 0) {
                _this.service.clear();
                // rerender page
                _this.renderAll();
            }
        });
    };
    /**
     * Render all todos logic
     */
    TodoController.prototype.renderAll = function () {
        var items = this.service.get();
        if (items.length > 0) {
            $('#btn-clear-todo').show();
        }
        else {
            $('#btn-clear-todo').hide();
        }
        this._renderItems(this.$allHolder, items);
    };
    /**
     * Render pending todos logic
     */
    TodoController.prototype.renderPending = function () {
        var items = this.service.get()
            .filter(function (todo) { return !todo.done; });
        this._renderItems(this.$pendingHolder, items);
    };
    /**
     * Render completed todos logic
     */
    TodoController.prototype.renderCompleted = function () {
        var items = this.service.get()
            .filter(function (todo) { return todo.done; });
        this._renderItems(this.$completedHolder, items);
    };
    /**
     * Render items
     *
     * @internal
     * @param $holder jQuery holder
     * @param items
     */
    TodoController.prototype._renderItems = function ($holder, items) {
        var _this = this;
        $holder.empty(); // same as $holder.html('');
        if (items.length > 0) {
            items.forEach(function (todo) { return _this._renderItem($holder, todo); });
        }
        else {
            // show a no-data message 
            $holder.append('<ons-list-header>No Items found</ons-list-header>');
        }
    };
    /**
     * Render a single todo item and do the necessary binding
     * @param jQuery the holder element
     * @param todo the todo item
     */
    TodoController.prototype._renderItem = function ($holder, todo) {
        var _this = this;
        var htmlTmpl = "\n        <ons-list-item>\n            <div class=\"center\">\n                " + todo.text + "\n            </div>\n            <div class=\"right\">\n                <ons-switch " + (todo.done ? 'checked' : '') + "></ons-switch>\n            </div>\n        </ons-list-item>";
        // remember: when passing html to the $() => we are creating an element and NOT selecting
        var $todo = $(htmlTmpl);
        var $switch = $todo.find('ons-switch');
        $switch.on('change', function (ev) {
            _this.service.toggle(todo);
            if (todo.done) {
                $switch.attr('checked', 'checked');
            }
            else {
                $switch.removeAttr('checked');
            }
        });
        // append it to the html
        $holder.append($todo);
    };
    return TodoController;
}());
/*-----------------------------------------------------------
 | Todo Service
 | ----------------------------------------------------------
 | This service should implement all the necessary Apis to
 | Manage todos, for instance, add, edit, delete, toggle,
 | etc ...
 |
 | In these services you SHOULD NOT write anything related to
 | the UI, such as dealing with DOM, show alerts, hide elements
 | etc ...
 |
 |---------------------------------------------------------*/
var TodoService = (function () {
    function TodoService() {
        this.items = [];
    }
    /**
     * Add new Todo
     * @param todo
     */
    TodoService.prototype.add = function (todo) {
        this.items.push(todo);
    };
    /**
     * Return all todos
     */
    TodoService.prototype.get = function () {
        return this.items;
    };
    /**
     * Clear all todos
     */
    TodoService.prototype.clear = function () {
        this.items = [];
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
