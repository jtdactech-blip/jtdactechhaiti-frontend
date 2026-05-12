import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("React error boundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
          <div className="surface-card" style={{ maxWidth: 520, textAlign: "center" }}>
            <h1>Yon erè rive sou aplikasyon an</h1>
            <p className="surface-muted">Rafrechi paj la oswa reconnecte pou kontinye.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
