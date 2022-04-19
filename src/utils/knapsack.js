const options = require("../data/events.json");
const items = require("../data/items.json");

export const knapSack = (selectedScenario, bagCapacity) => {
  let itemsLength = items.length + 1;
  let memoization = new Array(itemsLength).fill(0).map(() => new Array(bagCapacity + 1).fill(0));
  let trackBack = new Array(itemsLength).fill(0).map(() => new Array(bagCapacity + 1).fill(0));
  let orderedItems = orderByPriority(selectedScenario);

  for (let i = 1; i < itemsLength; i++) {
    for (let w = 1; w <= bagCapacity; w++) {
      if (orderedItems[i - 1].weight > w)
        memoization[i][w] = memoization[i - 1][w]
      else {
        let maxA = orderedItems[i - 1].value + memoization[i - 1][(w - orderedItems[i - 1].weight)]
        let maxB = memoization[i - 1][w]
        if (maxB > maxA) {
          memoization[i][w] = maxB
        }
        else {
          memoization[i][w] = maxA
          trackBack[i][w] = 1
        }
      }
    }
  }
  return trackBackItems(trackBack, orderedItems, bagCapacity)
};

const trackBackItems = (trackBackMatrix, items, weight) => {
  let solutionItems = []
  let w = weight
  let i = items.length
  while (i > 0) {
    if (trackBackMatrix[i][w] === 1) {
      solutionItems.push(items[i - 1].name);
      w = w - items[i - 1].weight;
    }
    i--;
  }
  return solutionItems;
}

function calculateWeights(selectedScenario) {
  let weights = {
    protection: 0,
    attack: 0,
    mobility: 0,
    stealth: 0,
  };
  selectedScenario.forEach((optionIndex) => {
    weights["protection"] += options[optionIndex].protection;
    weights["attack"] += options[optionIndex].attack;
    weights["mobility"] += options[optionIndex].mobility;
    weights["stealth"] += options[optionIndex].stealth;
  });

  return weights;
}

function orderByPriority(selectedScenario) {
  let weighted_items = []
  items.forEach((v) => {
    const value = Object.assign({}, v);
    weighted_items.push(value);
  });

  let weights = calculateWeights(selectedScenario);

  weighted_items.forEach((item) => {
    item["protection"] *= weights["protection"];
    item["attack"] *= weights["attack"];
    item["mobility"] *= weights["mobility"];
    item["stealth"] *= weights["stealth"];
    item["value"] = item["protection"] + item["attack"] + item["mobility"] + item["stealth"]
  });

  return weighted_items.sort((a, b) => {
    if (a["weight"] > b["weight"]) {
      return 1;
    }
    if (a["weight"] < b["weight"]) {
      return -1;
    }
    return 0;
  });
}
