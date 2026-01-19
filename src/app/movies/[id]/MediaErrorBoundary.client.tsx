"use client";

import { Component, ReactNode } from "react";

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class MediaErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
