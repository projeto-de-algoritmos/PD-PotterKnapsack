const options = require("../data/events.json");
const items = require("../data/items.json");

export const knapSack = (selectedDesasters, bagCapacity) => {
  let weight = 0, itemIndex = 0, solution = [];

  let orderedItems = orderByPriority(selectedDesasters);

  while (bagCapacity > weight) {
    let currentItem = orderedItems[itemIndex++];
    let itemDurability = 100;
    if (currentItem.weight + weight > bagCapacity) {
      itemDurability = ((bagCapacity - weight) / currentItem.weight) * 100;
    }
    solution.push({ item: currentItem.name, durability: itemDurability, weight: currentItem.weight });
    weight += currentItem.weight;
  }

  return solution
};

function calculateWeights(selectedDesasters) {
  let weights = {
    protection: 0,
    attack: 0,
    mobility: 0,
    stealth: 0,
  };
  selectedDesasters.forEach((optionIndex) => {
    // console.log(options[optionIndex].name);
    weights["protection"] += options[optionIndex].protection;
    weights["attack"] += options[optionIndex].attack;
    weights["mobility"] += options[optionIndex].mobility;
    weights["stealth"] += options[optionIndex].stealth;
  });

  return weights;
}

function orderByPriority(selectedDesasters) {
  let weighted_items = []
  items.forEach((v, i) => {
    const value = Object.assign({}, v);
    weighted_items.push(value);
  });

  let weights = calculateWeights(selectedDesasters);

  weighted_items.forEach((item) => {
    item["protection"] *= weights["protection"];
    item["attack"] *= weights["attack"];
    item["mobility"] *= weights["mobility"];
    item["stealth"] *= weights["stealth"];
  });

  return weighted_items.sort((a, b) => {
    let priorityA =
      a["protection"] + a["attack"] + a["mobility"] + a["stealth"];
    let priorityB =
      b["protection"] + b["attack"] + b["mobility"] + b["stealth"];

    if (priorityA > priorityB) {
      return -1;
    }
    if (priorityA < priorityB) {
      return 1;
    }
    return 0;
  });
}