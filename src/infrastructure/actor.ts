export abstract class Actor {
    private tasks = Promise.resolve();

    tell(message: any): void {
        console.log("queue", message);
        this.tasks = this.tasks.then(() => this.receive(message));
    }

    protected abstract receive(message: any): Promise<void>;
}

