const isObject = (obj) => {
  return Object(obj) === obj;
}

const flatMapStrings = strings => {
  // flat map keys
  return strings.reduce((acc, keyName) => {
      return (acc.indexOf(keyName) === -1)
        ? [ ...acc, keyName]
        : acc
      ;
    }, [])
  ;
}

const assign = (originObject, newObject) => {
  const keys = [...Object.keys(originObject), ...Object.keys(newObject)];
  const newKeys = flatMapStrings(keys);
  const originValue = originObject[keyName];
  const newValue = newObject[keyName];
  
  return newKeys.reduce((acc, keyName) => {
    let result = { 
      [keyName]: newValue || originValue,
    };
    
    const areObjects = isObject(newValue) && isObject(originValue);
    
    // if it's an object we want to call this function recursively
    if (areObjects) {
      result = assign(originValue, newValue);
    }
    
    return { ...acc, ...result };
  }, {});
};

const objectAssignDeep = (...args) => {
  return args.reduce((acc, item, index) => {
    const previousItem = args[index];
    const nextItem = args[index + 1];
    
    if (!nextItem) return acc;
    
    return assignDeep(previousItem, nextItem);
  }, {});
};

export default objectAssignDeep;
