/** @format */

const getId = require('../utils/getId');

// Mock Database
const skateboards = [
  {
    name: 'Silva Script Colorblock',
    id: getId(),
    brand: 'Real Skateboards',
    type: 'Deck',
    style: 'Street/Park',
    color: 'Multicolor with blue veneer',
    size: '8.5" x 31.85"',
    price: 59.98,
    image:
      'https://img.skatewarehouse.com/watermark/rs.php?path=RLMSCBDK-1.jpg&nw=540',
  },
  {
    name: 'Blazin',
    id: getId(),
    brand: 'Elemental Skateboards',
    type: 'Deck',
    style: 'Street',
    color: 'Black with Element Logo',
    size: '8.0" x 31.75"',
    price: 69.95,
    image:
      'https://blacksheepskateshop.com/cdn/shop/files/Element-Skateboards-Blazin-Deck-8_0.jpg?v=1694122781',
  },
  {
    name: 'Classic Dot',
    id: getId(),
    brand: 'Santa Cruz Skateboards',
    type: 'Deck',
    style: 'All-Around',
    color: 'Black with red dot logo',
    size: '8.25" x 31.83"',
    price: 69.95,
    image:
      'https://blacksheepskateshop.com/cdn/shop/files/Element-Skateboards-Blazin-Deck-8_0.jpg?v=1694122781',
  },
];

class Skateboard {
  // Create and add the new fellow to the "database" (the fellows array)
  // Rather than using a constructor, we use a static method to create a new fellow
  static createSkateboard(name, brand, type, style, color, size, price, image) {
    const newSKateboard = {
      name: name,
      id: getId(),
      brand: brand,
      type: type,
      style: style,
      color: color,
      size: size,
      price: price,
      image: image,
    };
    skateboards.push(newSKateboard);
    return newSKateboard;
  }

  // Get all values from the "database"
  static listSkateboards() {
    return [...skateboards];
  }

  // Get one value from the "database"
  static findSkateboard(id) {
    return skateboards.find((skateboard) => skateboard.id === id);
  }

  // Update one value from the "database"
  // static editSkateboardProperty(id, newName) {
  //   const skateboard = Skateboard.findSkateboard(id);
  //   if (!skateboard) return null;
  //   skateboard.name = newName;
  //   return skateboard;
  // }

  // Delete one value from the "database"
  static deleteSkateboard(id) {
    const skateboardIndex = skateboards.findIndex(
      (skateboard) => skateboard.id === id
    );
    if (skateboardIndex < 0) return false;

    skateboards.splice(skateboardIndex, 1);
    return true;
  }
}

module.exports = Skateboard;

// console.log(Skateboard.listSkateboards());
// console.log(Skateboard.findSkateboard(1));
// console.log(Skateboard.editSkateboardName(1, 'Mickey Mouse Skateboard'));
// console.log(Skateboard.deleteSkateboard(2));
// console.log(Skateboard.listSkateboards());
