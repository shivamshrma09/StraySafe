import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <h2 style={{color: 'red'}}>Error: {this.state.error || "Something went wrong."}</h2>;
    }
    return this.props.children;
  }
}