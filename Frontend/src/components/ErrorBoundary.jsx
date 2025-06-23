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
    // Aap chahein to yahan error logging service call bhi kar sakte hain
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, textAlign: "center" }}>
          <h2 style={{ color: "red" }}>Something went wrong.</h2>
          {this.state.error && (
            <details style={{ whiteSpace: "pre-wrap", color: "#222", marginTop: 16 }}>
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