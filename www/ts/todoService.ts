
class TodoService {

    private items: any[];

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
