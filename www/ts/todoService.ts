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
    
    
    private items: any[];

    constructor() {
        this.items = this._read();
    }
    
    /**
     * Add new Todo
     * @param todo 
     */
    add(todo) {
        this.items.push(todo);
        this._write();
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
        this._write();
    }

    /**
     * Toggle todo state
     * @param {*} item 
     */
    toggle(item) {
        item.done = !item.done;
        this._write();
    }

    /**
     * Load items from localStorage
     * 
     * @internal
     */
    private _read(): any[] {

        if (localStorage.getItem('items')) {
            return JSON.parse(localStorage.getItem('items'));
        }

        return [];
    }

    /**
     * Persist items to localStorage
     * 
     * @internal
     */
    private _write() {
        var str = JSON.stringify(this.items);
        localStorage.setItem('items', str);
    }

}
