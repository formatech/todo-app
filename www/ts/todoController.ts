declare var $;
declare var ons;

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

class TodoController {
    
    /*-----------------------------------------------------------
     | jQuery element reference
     | ----------------------------------------------------------
     | Create jQuery reference for the elements needed
     | 
     | A good practice is to start your jQuery variable with $     
     | 
     |---------------------------------------------------------*/
    private $allHolder = $('#all');
    private $pendingHolder = $('#pending');
    private $completedHolder = $('#completed');

    constructor(private service: TodoService) {
    }
    
    /**
     * Add todo logic
     */
    addTodo() {
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
    }
    
    /**
     * Clear all todos logic
     */
    clearTodos() {
        ons.notification
            .confirm('Are you sure you want to clear all todos ?')
            .then(response => {
                if (response > 0) {
                    this.service.clear();

                    // rerender page
                    this.renderAll();
                }
            })
    }
    
    /**
     * Render all todos logic
     */
    renderAll() {
        var items = this.service.get();

        if (items.length > 0) {
            $('#btn-clear-todo').show();
        } else {
            $('#btn-clear-todo').hide();
        }

        this._renderItems(this.$allHolder, items);
    }

    /**
     * Render pending todos logic
     */
    renderPending() {
        var items = this.service.get()
            .filter(todo => !todo.done);

        this._renderItems(this.$pendingHolder, items);
    }    
    
    /**
     * Render completed todos logic
     */
    renderCompleted() {
        var items = this.service.get()
            .filter(todo => todo.done);

        this._renderItems(this.$completedHolder, items);
    }
    
    /**
     * Render items
     * 
     * @internal
     * @param $holder jQuery holder
     * @param items 
     */
    private _renderItems($holder, items) {

        $holder.empty(); // same as $holder.html('');

        if (items.length > 0) {
            items.forEach(todo => this._renderItem($holder, todo));
        } else {
            // show a no-data message 
            $holder.append('<ons-list-header>No Items found</ons-list-header>');
        }
    }
    
    /**
     * Render a single todo item and do the necessary binding
     * @param jQuery the holder element 
     * @param todo the todo item 
     */
    private _renderItem($holder, todo) {

        var htmlTmpl = `
        <ons-list-item>
            <div class="center">
                ${todo.text}
            </div>
            <div class="right">
                <ons-switch ${todo.done ? 'checked' : ''}></ons-switch>
            </div>
        </ons-list-item>`;

        // remember: when passing html to the $() => we are creating an element and NOT selecting
        var $todo = $(htmlTmpl);

        var $switch = $todo.find('ons-switch');
        
        $switch.on('change', (ev) => {

            this.service.toggle(todo);

            if (todo.done) {
                $switch.attr('checked', 'checked');
            } else {
                $switch.removeAttr('checked');
            }
        })
    
        // append it to the html
        $holder.append($todo);

    }

}