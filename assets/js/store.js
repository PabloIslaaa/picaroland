// assets/js/store.js
const LS_CART_KEY = "cart_v1";
const LS_FAV_KEY  = "fav_v1";
const LS_USER_KEY = "user_v1";

export const loadCart = () => JSON.parse(localStorage.getItem(LS_CART_KEY) || "[]");
export const saveCart = (cart) => localStorage.setItem(LS_CART_KEY, JSON.stringify(cart));

export const loadFav = () => new Set(JSON.parse(localStorage.getItem(LS_FAV_KEY) || "[]"));
export const saveFav = (set) => localStorage.setItem(LS_FAV_KEY, JSON.stringify([...set]));

export const addToCart = (id, qty=1) => {
  const cart = loadCart();
  const i = cart.findIndex(x => x.id === id);
  if (i >= 0) cart[i].qty += qty; else cart.push({ id, qty });
  saveCart(cart);
};

export const removeFromCart = (id) => {
  saveCart(loadCart().filter(x => x.id !== id));
};

export const setQty = (id, qty) => {
  const cart = loadCart().map(x => x.id === id ? {...x, qty} : x);
  saveCart(cart);
};

export const toggleFav = (id) => {
  const fav = loadFav();
  fav.has(id) ? fav.delete(id) : fav.add(id);
  saveFav(fav);
  return fav.has(id);
};

// “Login” simulado local (solo demo, NO es seguro)
export const getUser = () => JSON.parse(localStorage.getItem(LS_USER_KEY) || "null");
export const login = (email) => localStorage.setItem(LS_USER_KEY, JSON.stringify({ email }));
export const logout = () => localStorage.removeItem(LS_USER_KEY);
