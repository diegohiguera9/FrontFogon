export const ADD_PRODUCT = "ADD_PRODUCT";

const initialState = {
  products: [],
};

const findProduct = (arr, name) => {
  const index = arr.findIndex((object) => {
    return object.name === name;
  });

  return index;
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const index = findProduct(state.products, action.payload.name);
      if (index === -1) {
        return {
          ...state,
          products: [
            ...state.products,
            { name: action.payload.name, count: action.payload.count },
          ],
        };
      }
      const newArray = [...state.products];
      newArray[index].count =
        newArray[index].count + action.payload.count ||
        action.payload.count;
      return {
        ...state,
        products: newArray,
      };
    default:
      return state;
  }
};

export default cartReducer;
