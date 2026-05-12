const CART_KEY = "public_cart";

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item) => {
  const cart = getCart();
  const existing = cart.find(
    (entry) => entry.id === item.id && entry.kind === item.kind,
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  return cart;
};

export const updateCartQuantity = (kind, id, quantity) => {
  const cart = getCart().map((item) =>
    item.kind === kind && item.id === id
      ? { ...item, quantity: Math.max(1, Number(quantity)) }
      : item,
  );

  saveCart(cart);
  return cart;
};

export const removeFromCart = (kind, id) => {
  const cart = getCart().filter((item) => !(item.kind === kind && item.id === id));
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const cartTotal = (items) =>
  items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
