

class test{
    constructor(hello){
        this.hello = hello;
    }
}
let tests=[new test(2),new test(3)];
find = new test(2);
console.log(tests.some(e=>JSON.stringify(e)===JSON.stringify(find)));

