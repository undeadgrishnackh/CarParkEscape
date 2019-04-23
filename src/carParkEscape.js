const staircaseMarker = 1;
const carMarker = 2;


const inWhichParkSlotIsMyCarOnThisFloor = carparkFloor => carparkFloor.indexOf(carMarker);


const provideTheFullPathToTheExit = myPosition => myPosition.path;


const understandWhereIAm = (carpark) => {
  const path = [];
  let floor = null;
  let actualParkingId = null;
  let actualFloorId = null;
  for (let floorId = 0; floorId < carpark.length; floorId += 1) {
    if (inWhichParkSlotIsMyCarOnThisFloor(carpark[floorId]) >= 0) {
      actualParkingId = inWhichParkSlotIsMyCarOnThisFloor(carpark[floorId]);
      actualFloorId = floorId;
      floor = carpark.length - floorId - 1;
      break;
    }
  }
  return {
    floor, actualParkingId, actualFloorId, path,
  };
};


// The assumption is that EXIT is on ground floor on the right.
const moveToTheExit = (carpark, myPosition) => {
  const floorSize = carpark[myPosition.actualFloorId].length;
  const stepsToTheExit = floorSize - myPosition.actualParkingId - 1;
  if (stepsToTheExit !== 0) {
    const newPath = myPosition.path;
    newPath.push(`R${stepsToTheExit}`);
  }
  return myPosition;
};


// eslint-disable-next-line arrow-body-style
const AreYouOnAStaircase = (carpark, myPosition) => {
  return carpark[myPosition.actualFloorId].indexOf(staircaseMarker) === myPosition.actualParkingId;
};


const moveToTheStaircase = (carpark, myPosition) => {
  const staircaseId = carpark[myPosition.actualFloorId].indexOf(staircaseMarker);
  const stepsToTheStaircase = myPosition.actualParkingId - staircaseId;
  const myNewPosition = myPosition;
  if (stepsToTheStaircase < 0) {
    myNewPosition.path.push(`R${-stepsToTheStaircase}`);
  } else if (stepsToTheStaircase > 0) {
    myNewPosition.path.push(`L${stepsToTheStaircase}`);
  }
  myNewPosition.actualParkingId = staircaseId;
  return myNewPosition;
};


const moveDownWithTheStaircase = (carpark, myPosition) => {
  const staircaseId = myPosition.actualParkingId;
  const myNewPosition = myPosition;
  let floorsWalkedDown = 0;
  while (AreYouOnAStaircase(carpark, myNewPosition)) {
    myNewPosition.actualFloorId += 1;
    myNewPosition.actualParkingId = staircaseId;
    myNewPosition.floor -= 1;
    floorsWalkedDown += 1;
  }
  myNewPosition.path.push(`D${floorsWalkedDown}`);
  return myNewPosition;
};


function escape(carpark) {
  let myPosition = understandWhereIAm(carpark);
  while (myPosition.floor !== 0) {
    myPosition = moveToTheStaircase(carpark, myPosition);
    myPosition = moveDownWithTheStaircase(carpark, myPosition);
  }
  myPosition = moveToTheExit(carpark, myPosition);
  return provideTheFullPathToTheExit(myPosition);
}


module.exports.escape = escape;
module.exports.understandWhereAmI = understandWhereIAm;
module.exports.moveToTheExit = moveToTheExit;
module.exports.moveDownWithTheStaircase = moveDownWithTheStaircase;
module.exports.moveToTheStaircase = moveToTheStaircase;
