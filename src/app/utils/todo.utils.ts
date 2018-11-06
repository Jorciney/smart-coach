export class TodoUtils {

    static handleError(methodName: string, todoTitle: string) {
        return error => console.error('Error on ' + methodName + 'updating todo with title: ' + todoTitle, error);
    }
}
