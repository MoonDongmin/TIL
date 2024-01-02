class Latte {
    constructor() {
        this.name = 'latte';
    }
}

class Espresso {
    constructor() {
        this.name = 'Espresso';
    }
}

class LatteFactory {
    static createCoffee() {
        return new Latte();
    }
}

class EspressoFactory {
    static createCoffee() {
        return new Espresso();
    }
}

const factoryList = {LatteFactory, EspressoFactory};

class CoffeeFactory {
    static creatCoffee(type) {
        const factory = factoryList[type];
        return factory.creatCoffee();
    }
}

const main = () => {
    // 라떼 커피를 주문한다
    const coffee = CoffeeFactory.creatCoffee('LatteFactory');
    // 커피 이름을 부른다
    console.log(coffee.name);
}

main();