import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 32,
          textAlign: "center",
          background: "#fff3f3",
          borderRadius: 10,
          boxShadow: "0 2px 12px rgba(255,0,0,0.07)",
          margin: "2rem auto",
          maxWidth: 520
        }}>
          <h2 style={{ color: "#d32f2f" }}>Something went wrong.</h2>
          {this.state.error && (
            <details style={{
              whiteSpace: "pre-wrap",
              color: "#444",
              marginTop: 16,
              background: "#fff",
              padding: "12px 14px",
              borderRadius: 6,
              border: "1px solid #ffe0e0"
            }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>Error Details</summary>
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;