import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AddToCartPayload,
  AppState,
  CartItem,
  FoodItem,
  ReviewItem,
} from "@/types";
import { foodProducts } from "@/lib/foodData";
import { buildCartItem, calcTotalQuantity } from "@/store/cartHelpers";

const initialState: AppState = {
  FoodBank: [],
  filtterFood: [],
  featureFood: [],
  favouriteFood: [],
  popUp: false,
  popUpCart: [],
  cart: [],
  love: [],
  ddCart: false,
  totalQuantity: 0,
  totalFv: 0,
  checkOut: {},
  Blog_D: [],
  toast: false,
  toastMessage: "order was add to cart",
  reviewArr: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    hydrateFromStorage(
      state,
      action: PayloadAction<{
        cart: CartItem[];
        favouriteFood: FoodItem[];
        love: number[];
        checkOut: AppState["checkOut"];
      }>
    ) {
      state.cart = action.payload.cart;
      state.favouriteFood = action.payload.favouriteFood;
      state.love = action.payload.love;
      state.checkOut = action.payload.checkOut;
      state.totalQuantity = calcTotalQuantity(action.payload.cart);
      state.totalFv = action.payload.love.length;
    },
    setFoodData(state) {
      const featureProduct = foodProducts.filter((el) => el.feature);
      state.FoodBank = foodProducts;
      state.filtterFood = foodProducts;
      state.featureFood = featureProduct;
    },
    addToWish(state, action: PayloadAction<number>) {
      const id = action.payload;
      const loveArray = state.love.find((el) => el === id);
      const wishRemove = state.favouriteFood.find((el) => el.id === id);

      if (wishRemove || loveArray) {
        state.love = state.love.filter((el) => el !== id);
        state.favouriteFood = state.favouriteFood.filter((el) => el.id !== id);
      } else {
        const fv = state.filtterFood.filter((el) => el.id === id);
        if (fv[0]) {
          state.favouriteFood.push(fv[0]);
          state.love.push(id);
        }
      }
      state.totalFv = state.love.length;
    },
    setCategory(state, action: PayloadAction<string>) {
      const payload = action.payload;
      state.FoodBank = state.filtterFood.filter((el) => {
        if (payload.toLowerCase() === "all") return true;
        return el.category.toLowerCase() === payload.toLowerCase();
      });
    },
    openPopUp(state, action: PayloadAction<number>) {
      state.popUp = true;
      state.popUpCart = state.filtterFood.filter((el) => el.id === action.payload);
    },
    closePopUp(state) {
      state.popUp = false;
    },
    addToCart(state, action: PayloadAction<AddToCartPayload>) {
      const obj = buildCartItem(state.filtterFood, action.payload);
      if (!obj) return;

      const match = state.cart.find((elm) => elm.id === obj.id);
      if (match) {
        state.cart = state.cart.map((el) =>
          el.id === obj.id
            ? { ...el, quantity: el.quantity + obj.quantity }
            : el
        );
      } else {
        state.cart.push(obj);
      }
      state.popUp = false;
      state.totalQuantity = calcTotalQuantity(state.cart);
    },
    removeCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((el) => el.id !== action.payload);
      state.totalQuantity = calcTotalQuantity(state.cart);
    },
    openCartDropdown(state) {
      state.ddCart = true;
    },
    closeCartDropdown(state) {
      state.ddCart = false;
    },
    handleCheckout(state, action: PayloadAction<AddToCartPayload>) {
      const obj = buildCartItem(state.filtterFood, action.payload);
      if (obj) {
        state.checkOut = obj;
        state.ddCart = false;
      }
    },
    searchFilter(state, action: PayloadAction<string>) {
      const q = action.payload.toLowerCase();
      state.FoodBank = state.filtterFood.filter((item) =>
        item.name.toLowerCase().includes(q)
      );
    },
    addBlogDetails(state, action: PayloadAction<number>) {
      state.Blog_D = state.filtterFood.filter((item) => item.id === action.payload);
    },
    showToast(state, action: PayloadAction<string>) {
      state.toast = true;
      state.toastMessage = action.payload;
    },
    hideToast(state) {
      state.toast = false;
    },
    addReview(state, action: PayloadAction<ReviewItem>) {
      state.reviewArr.push(action.payload);
    },
  },
});

export const {
  hydrateFromStorage,
  setFoodData,
  addToWish,
  setCategory,
  openPopUp,
  closePopUp,
  addToCart,
  removeCart,
  openCartDropdown,
  closeCartDropdown,
  handleCheckout,
  searchFilter,
  addBlogDetails,
  showToast,
  hideToast,
  addReview,
} = appSlice.actions;

export default appSlice.reducer;
