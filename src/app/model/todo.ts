export class Todo {
    title: string;
    date: string;
    category ? = 'general';
    complete ? = false;
    children ? = [];
    isHovered ? = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
