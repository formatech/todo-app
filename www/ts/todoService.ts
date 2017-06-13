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

class TodoService {
    
    
    private items: any[] = [];

    constructor() {
        
    }
    
    /**
     * Add new Todo
     * @param todo 
     */
    add(todo) {
        this.items.push(todo);        
    }
    
    /**
     * Return all todos
     */
    get() {
        return this.items;
    }
    
    /**
     * Clear all todos
     */
    clear() {
        this.items = [];
    }

    /**
     * Toggle todo state
     * @param {*} item 
     */
    toggle(item) {
        item.done = !item.done;
    }

}
