export class Identity {
    constructor(x) {
        this.__value = x;
    }

    static of(x) {
        return new Identity(x);
    }

    map(fn) {
        return Identity.of(fn(this.__value));
    }

    ap(f) {
        return f.map(this.__value);
    }

    chain(fn) {
        return this.map(fn).join();
    }

    join() {
        return this.__value;
    }

}