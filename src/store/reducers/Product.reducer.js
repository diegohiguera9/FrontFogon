export const POST_LOADING = "POST_LOADING";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_ERROR = "POST_ERROR";
export const POST_PLUS = "POST_PLUS";
export const POST_LESS = "POST_LESS";
export const POST_NUMBER = "POST_NUMBER";
export const POST_PENDING = 'POST_PENDING'

const initialState = {
  post: [],
  pending: [],
  loading: false,
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case POST_PLUS:
      const indexFound = action.payload.index;
      const newArray = [...state.post];
      newArray[indexFound].count = newArray[indexFound].count + 1 || 1;
      return {
        ...state,
        post: newArray,
      };
    case POST_LESS:
        const indexLess = action.payload.index;
        const newArrl = [...state.post];
      newArrl[indexLess].count = newArrl[indexLess].count - 1 || 0;
      return {
        ...state,
        post: newArrl,
      };
    case POST_NUMBER:
        const indexNumber = action.payload.index;
        const newNumber = [...state.post];
      newNumber[indexNumber].count = parseFloat(action.payload.amount);
      return {
        ...state,
        post: newNumber,
      };
    case POST_PENDING:
        const pendArray = state.post.filter(item=>item.count>=1)
        return {
            ...state,
            pending: pendArray
        }
    default:
      return state;
  }
};

export default productReducer;
