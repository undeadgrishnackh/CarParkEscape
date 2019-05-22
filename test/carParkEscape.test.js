import {
  EMPTY,
  CAR,
  understandWhereAmI,
  moveToTheExit,
  escape,
  moveToTheStaircase,
} from '../src/carParkEscape';

const { assert } = require('chai');

describe('Unit Test', () => {
  it('Am I on the Ground Floor?', () => {
    const carpark = [[0, 0, 0, 0, 2]];
    assert.deepEqual(understandWhereAmI(carpark).floor, 0, "I aren't able to understand where you are in the parking!");
  });
  it('Am I on 3th Floor?', () => {
    const carpark = [
      [1, 0, 0, 2, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    assert.deepEqual(understandWhereAmI(carpark).floor, 3, "I aren't able to understand where you are in the parking!");
  });
  it('Am I on 2th Floor of 3?', () => {
    const carpark = [
      [1, 0, 0, 0, 0],
      [0, 0, 0, 2, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    assert.deepEqual(understandWhereAmI(carpark).floor, 2, "I aren't able to understand where you are in the parking!");
  });
  it('Where is the exit on Ground Floor?', () => {
    const carpark = [[0, 0, 0, 0, 2]];
    const myPosition = moveToTheExit(carpark, understandWhereAmI(carpark));
    assert.deepEqual(myPosition.path, [], "I aren't able to understand where where is the EXIT!");
  });
  it('Where is the staircase on my floor?', () => {
    const carpark = [
      [1, 0, 0, 2, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    const myPosition = understandWhereAmI(carpark);
    assert.deepEqual(moveToTheStaircase(carpark, myPosition).path, ['L3'], "I aren't able to understand where where is the EXIT!");
  });
  it('How do I exit?', () => {
    const carpark = [
      [2, 0, 0, 0, 0],
    ];
    let myPosition = understandWhereAmI(carpark);
    myPosition = moveToTheExit(carpark, myPosition);
    assert.deepEqual(myPosition.path, ['R4'], "I aren't able to understand where where is the EXIT!");
  });
});

describe('E2E Test', () => {
  test.each([
    [
      '1 Floor',
      [
        [CAR, EMPTY, EMPTY, EMPTY, EMPTY],
      ],
      ['R4'],
    ],
    [
      '2 Floors easy',
      [
        [1, 0, 0, 2, 0],
        [0, 0, 0, 0, 0],
      ],
      ['L3', 'D1', 'R4'],
    ],
    [
      '4 Floors straight staircase',
      [
        [1, 0, 0, 2, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      ['L3', 'D3', 'R4'],
    ],
    [
      '4 Floors zig zag staircase',
      [
        [1, 0, 0, 2, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      ['L3', 'D1', 'R4', 'D1', 'L4', 'D1', 'R4'],
    ],
    [
      '5 Floors zig zag staircase with car in the middle floor',
      [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 2, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      ['L3', 'D1', 'R4', 'D1', 'L4', 'D1', 'R4'],
    ],
  ])(
    '%s',
    (name, carPark, expectedPath) => {
      assert.deepEqual(escape(carPark), expectedPath, "I aren't able to understand where where is the EXIT!");
    },
  );
});
