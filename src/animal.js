function Animal(family) {
  this.kingdom = '動物界';
  this.family = family || '人科';
}
Animal.prototype.move = function animalProtoMove() {
  console.log(`${this.name} 移動`);
};

function Dog(name, color, size) {
  Animal.call(this, '狗科');
  this.name = name;
  this.color = color || '白色';
  this.size = size || '小';
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function dogProtoBark() {
  console.log(`${this.name} 吠叫`);
};

var Bibi = new Dog('比比', '棕色', '小');
