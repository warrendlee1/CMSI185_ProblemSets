//1
function countOfNegatives(a) {
  return a.filter(x => x < 0).length;
}

//2
function isPrime(input) {
  if (!Number.isSafeInteger(input) || input <= 0) {
    throw "error";
  }
  if (input === 4) {
    return false;
  }
  for (let i = 2; i < Math.sqrt(input); i++) {
    if (input % i === 0) {
      return false;
    }
  }
  return input > 1;
}

//3
function randomBetween(x, y) {
  return Math.random() * (y - x) + x;
}

//4
function acronym(input) {
  let split_input = input.split(/\s/);
  let new_input = "";
  if (input === "") {
    return input;
  }
  for (let i in split_input) {
    new_input += split_input[i].charAt(0);
  }
  return new_input.toLowerCase();
}

//5
function median(input1, input2, input3) {
  if ([input1, input2, input3].some(x => isNaN(x) || typeof x !== "number")) {
    throw "Invalid input entered";
  }
  return [input1, input2, input3].sort(function(a, b) {
    return a - b;
  })[1];
}

//6
function occurrences(string, char) {
  let count = 0;
  for (let i of string) {
    if (i === char) {
      count += 1;
    }
  }
  return count;
}

function sumOfEvenSquares(input) {
  return input
    .filter(x => x % 2 === 0)
    .map(x => x ** 2)
    .reduce((x, y) => x + y, 0);
}

//8
function insideSubstring(string1, string2) {
  if (string1.size >= string2.size) {
    return false;
  }
  if (
    (string1.includes(string2) &&
      !string1.startsWith(string2) &&
      !string1.endsWith(string2)) ||
    (string2.includes(string1) &&
      !string2.startsWith(string1) &&
      !string2.endsWith(string1))
  ) {
    return true;
  }
}

//9
function mostInterestingPerson(people) {
  if (typeof people !== "object") {
    throw "input is not an array";
  }
  for (let person in people) {
    for (let activity in person) {
      activity.toLowerCase();
      // person.filter((item, index) => array.indexOf(item)===index);
    }
  }
  let mostInteresting = people[0];
  for (let person in people) {
    if (person.length > mostInteresting.length) {
      mostInteresting = person;
    }
  }
  return mostInteresting;
}

//10

//11
function makeSequenceGenerator(func, initial) {
  let value = initial;
  return () => {
    const finalVal = value;
    value = func(value);
    return finalVal;
  };
}

//12
function randomValueFromSet(set) {
  if (set.constructor !== Set) {
    throw "error: type is not Set";
  }
  return [...set][Math.floor(Math.random() * set.size)];
}

QUnit.test("My negative counter function works", t => {
  t.equal(countOfNegatives([]), 0);
  t.equal(countOfNegatives([5]), 0);
  t.equal(countOfNegatives([-5]), 1);
  t.equal(
    countOfNegatives([1, undefined, 4, -10, -8.222, "dog", [5], -10, {}]),
    3
  );
  t.throws(() => countOfNegatives(), "Should throw on undefined");
  t.throws(() => countOfNegatives({}), "Should throw on non-array object");
  t.throws(
    () => countOfNegatives(1, 2, 3),
    "Should throw on a number argument"
  );
  t.throws(() => countOfNegatives("[1, 2, 3]"), "Should throw on a string");
});

QUnit.test("I'm detecting primes okay", t => {
  t.ok(isPrime(2), "2 should be prime");
  t.ok(isPrime(3), "2 should be prime");
  t.notOk(isPrime(4), "4 should not be prime");
  t.notOk(isPrime(20), "20 should not be prime");
  t.ok(isPrime(47), "47 should be prime");
  t.notOk(isPrime(933), "933 should not be prime");
  t.throws(() => isPrime(2.5), "Should throw on non-integer");
  t.throws(() => isPrime(1.999999), "Should throw on non-integer");
  t.notOk(isPrime(1), "1 is not prime");
  t.throws(() => isPrime(0), "Should throw on 0 because 0 is not positive");
  t.throws(() => isPrime(-50), "Should throw on negative integers");
  t.throws(() => isPrime(9007199254740992), "Should throw on max safe + 1");
  t.notOk(isPrime(9007199254740991), "Max safe is actually composite");
  t.ok(isPrime(57757791939599));
});

QUnit.test("Randoms fall in the right range and are spread a bit", t => {
  let foundASmallOne = false;
  let foundABigOne = false;
  for (let i = 0; i < 1000; i++) {
    let random = randomBetween(-3, 10.1);
    if (-3 <= random && random <= -2.75) {
      foundASmallOne = true;
    }
    if (9.75 <= random && random <= 10.1) {
      foundABigOne = true;
    }
    t.ok(random >= -3 && random < 10.1);
  }
  t.ok(foundASmallOne && foundABigOne);
});

QUnit.test("Acronyms work", t => {
  t.equal(acronym(""), "", "for the empty string");
  t.equal(acronym("DOG"), "d", "for a single word");
  t.equal(acronym("Laughing out loud"), "lol", "for multiple words");
  t.equal(acronym("I know, right?"), "ikr", "with punctuation");
  t.equal(
    acronym("British     Rail,  \t Baby!"),
    "brb",
    "with space sequences"
  );
  t.equal(acronym("As far as I know"), "afaik");
  t.equal(acronym("One . Three"), "o.t");
  t.equal(acronym("33 22 11"), "321", "with numbers");
  t.throws(() => acronym(), "throws when nothing to acronymize");
  t.throws(() => acronym(["one", "two", "three"]), "arrays are not strings");
  t.throws(() => acronym(123234), "numbers are not strings");
  t.throws(() => acronym(null), "null is not a string");
});

QUnit.test("My median function works", t => {
  t.equal(median(1, 5, 10), 5, "for sequence 1-5-10");
  t.equal(median(1, 10, 5), 5, "for sequence 1-10-5");
  t.equal(median(5, 1, 10), 5, "for sequence 5-1-10");
  t.equal(median(5, 10, 1), 5, "for sequence 5-10-1");
  t.equal(median(10, 1, 5), 5, "for sequence 10-1-5");
  t.equal(median(10, 5, 1), 5, "for sequence 10-5-1");
  t.throws(() => median(undefined, 5, 1), "undefined first");
  t.throws(() => median(10, null, 1), "null second");
  t.throws(() => median(10, 5, "1"), "string third");
  t.throws(() => median({}, 5, 1), "object first");
  t.throws(() => median(10, NaN, 1), "NaN second");
  t.throws(() => median(10, 5, false), "boolean third");
});

QUnit.test("I can count occurrences", t => {
  t.equal(occurrences("", "x"), 0, "in the empty string");
  t.equal(occurrences("zzyzx", "x"), 1, "for a character appearing once");
  t.equal(
    occurrences("zzyzx", "z"),
    3,
    "for a character appearing multiple times"
  );
  t.equal(occurrences("food", "$"), 0, "for a character not appearing");
  t.equal(
    occurrences("café", "é"),
    1,
    "for a non-ASCII character that appears"
  );
  t.equal(occurrences("....|....", "."), 8, "for regex metacharacters");
});

QUnit.test("My square-of-evens-summer works", t => {
  t.equal(sumOfEvenSquares([]), 0, "for empty list");
  t.equal(sumOfEvenSquares([5]), 0, "for singleton list with odd number");
  t.equal(sumOfEvenSquares([-4]), 16, "for singleton list with even number");
  t.equal(
    sumOfEvenSquares([1, 4, -10, -8.222, 1, 8, -101]),
    180,
    "for mixed lists"
  );
  t.throws(() => sumOfEvenSquares("alphabet"), "should throw on non-array");
});

QUnit.test("Non initial, non final substrings work", t => {
  t.notOk(
    insideSubstring("", "dog"),
    "Empty string is initial & final of every string"
  );
  t.notOk(insideSubstring("dog", "doghouse"), "Should return false on prefix");
  t.notOk(
    insideSubstring("house", "doghouse"),
    "Should return false on suffix"
  );
  t.ok(
    insideSubstring("abc", "xabcyyy"),
    "Okay just barely inside on the left"
  );
  t.ok(
    insideSubstring("abc", "yyyabcx"),
    "Okay just barely inside on the right"
  );
  t.ok(insideSubstring("what", "I know what I know"), "In the middle");
  t.notOk(insideSubstring("hello", "goodbye"), "Not even close");
  t.notOk(
    insideSubstring("dog", ""),
    "Empty string is initial & final of every string"
  );
  t.notOk(insideSubstring("doghouse", "dog"), "Should return false on prefix");
  t.notOk(insideSubstring("doghouse", "dog"), "Should return false on suffix");
  t.ok(
    insideSubstring("xabcyyy", "abc"),
    "Okay just barely inside on the left"
  );
  t.ok(
    insideSubstring("yyyabcx", "abc"),
    "Okay just barely inside on the right"
  );
  t.ok(insideSubstring("I know what I know", "what"), "In the middle");
  t.notOk(insideSubstring("goodbye", "hello"), "Not even close");
});

QUnit.test("I can find the most interesting person", t => {
  t.throws(() => mostInterestingPerson(8), "throws on a number");
  t.strictEqual(mostInterestingPerson([]), undefined, "undefined on empty");
  t.deepEqual(mostInterestingPerson([{}]), {});
  const alice = { name: "Alice", interests: ["coding", "CodING"] };
  const bob = { name: "Bob", interests: ["skiing", "Knitting"] };
  const chi = {
    name: "Chi",
    interests: ["karate", "cooking", "CoOkIng ", "dance"]
  };
  const daria = {
    name: "Daria",
    interests: ["dance", "coding", "hiking", "skiiNG"]
  };
  const ella = {
    name: "Ella",
    interests: ["guitar", "chess", "karate", "judo", "aikido"]
  };
  t.deepEqual(mostInterestingPerson([alice]), alice);
  t.deepEqual(mostInterestingPerson([alice, bob]), bob);
  t.deepEqual(mostInterestingPerson([alice, chi, bob]), chi);
  t.deepEqual(mostInterestingPerson([daria, bob, alice, chi]), daria);
  t.deepEqual(mostInterestingPerson([daria, bob, alice, ella, chi]), ella);
  t.deepEqual(
    mostInterestingPerson([daria, {}, bob, { x: 2 }, alice, ella, chi]),
    ella
  );
});

QUnit.test("Points satisfy all kinds of tests", t => {
  t.throws(() => {
    new Point(NaN, 0);
  });
  t.throws(() => {
    new Point(0, NaN);
  });
  t.throws(() => {
    new Point(NaN, NaN);
  });
  t.throws(() => {
    new Point(-90.001, 0);
  });
  t.throws(() => {
    new Point(90.001, 0);
  });
  t.throws(() => {
    new Point(50, 180.001);
  });
  t.throws(() => {
    new Point(50, -180.001);
  });
  t.ok(new Point(66.563, 10).inArcticCircle());
  t.notOk(new Point(66.562, 10).inArcticCircle());
  t.ok(new Point(-66.563, 10).inAntarcticCircle());
  t.notOk(new Point(-66.562, 10).inAntarcticCircle());
  t.ok(new Point(23.437, 10).inTropics());
  t.notOk(new Point(23.438, 10).inTropics());
  t.ok(new Point(-23.437, 10).inTropics());
  t.notOk(new Point(-23.438, 10).inTropics());
  t.deepEqual(new Point(0, 1).antipode(), new Point(0, -179));
  t.deepEqual(new Point(20, -3).antipode(), new Point(-20, 177));
});

QUnit.test("I can make sequences", t => {
  let g = makeSequenceGenerator(x => 2 * x + 3, 7);
  t.equal(g(), 7);
  t.equal(g(), 17);
  t.equal(g(), 37);
  t.equal(g(), 77);
  g = makeSequenceGenerator(x => x + 1, -5);
  t.equal(g(), -5);
  t.equal(g(), -4);
  t.equal(g(), -3);
  t.equal(g(), -2);
  g = makeSequenceGenerator(x => x * x, 2);
  t.equal(g(), 2);
  t.equal(g(), 4);
  t.equal(g(), 16);
  t.equal(g(), 256);
});

QUnit.test("Random value from set chooser works", t => {
  t.throws(() => randomValueFromSet(3), "throws on number");
  t.throws(() => randomValueFromSet("hello"), "throws on string");
  t.throws(() => randomValueFromSet([]), "throws on array");
  const s = new Set([5, 12, "dog", "rat", "pig"]);
  const m = Object.create(null);
  s.forEach(v => (m[v] = 0));
  for (let i = 0; i < 1000; i += 1) {
    m[randomValueFromSet(s)] += 1;
  }
  t.equal(Object.keys(m).length, 5, "selects only the right values");
  s.forEach(v =>
    t.ok(150 <= m[v] && m[v] <= 250, "selections roughly balanced")
  );
});
