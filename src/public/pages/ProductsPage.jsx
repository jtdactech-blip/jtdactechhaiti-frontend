import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../../services/api";
import { addToCart } from "../utils/cart";

const fallbackProducts = [
  { id: 1, name: "Laptop HP 250 G8", description: "Core i5, 8Go RAM, SSD 256Go", price: 650, category: "Informatique" },
  { id: 2, name: "Imprimante Canon LBP", description: "Impression rapide bureau", price: 250, category: "Impression" },
  { id: 3, name: "Dell OptiPlex 3080", description: "Unite centrale business", price: 400, category: "Desktop" },
  { id: 4, name: "Ecran Samsung 24\"", description: "Moniteur Full HD", price: 180, category: "Ecrans" },
  { id: 5, name: "Clavier Logitech K120", description: "Clavier filaire robuste", price: 25, category: "Accessoires" },
  { id: 6, name: "Routeur TP-Link", description: "Routeur Wi-Fi entreprise", price: 45, category: "Reseau" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes categories");

  useEffect(() => {
    API
      .get("/products")
      .then((res) => {
        const items = Array.isArray(res.data?.data) ? res.data.data : [];
        setProducts(items.length ? items : fallbackProducts);
      })
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(["Toutes categories"]);
    products.forEach((product) => set.add(product.category || "Informatique"));
    return Array.from(set);
  }, [products]);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.description || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const itemCategory = product.category || "Informatique";
      const matchesCategory = category === "Toutes categories" || itemCategory === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, products, search]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      kind: "product",
      name: product.name,
      price: Number(product.price),
    });

    setMessage(`${product.name} ajoute nan panier la.`);
  };

  return (
    <div className="public-shell">
      <div className="public-frame">
        <Navbar />

        <section className="public-section">
          <div className="section-heading">
            <div>
              <h1>Nos Produits</h1>
              <p>Catalogue principal repanse pou sanble ak layout referans la.</p>
            </div>
            <Link to="/checkout" className="btn-primary">
              Voir le panier
            </Link>
          </div>

          <div className="catalog-toolbar">
            <div className="toolbar-grow">
              <input
                className="search-input"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="toolbar-fixed">
              <select
                className="select-input"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {message ? <div className="message-banner" style={{ marginBottom: 18 }}>{message}</div> : null}

          <div className="catalog-grid">
            {visibleProducts.map((product, index) => (
              <article key={product.id} className="catalog-card">
                <div className="catalog-thumb">{String(index + 1).padStart(2, "0")}</div>
                <div className="catalog-meta">
                  <h3>{product.name}</h3>
                  <p className="surface-muted">
                    {product.description || "Pa gen deskripsyon pou atik sa a."}
                  </p>
                </div>
                <div className="price-row">
                  <strong>${Number(product.price).toFixed(2)}</strong>
                  <button type="button" onClick={() => handleAddToCart(product)} className="btn-soft">
                    Ajouter
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
