const abc = {
    id: '1', name: 'asdf', email: 'asdf@email.com',
    getId: () => {
        return this.id;
    },
    getName: function () {
        return this.name;
    }
}

console.log(abc.getId());
console.log(abc.getName());
ㅂ
