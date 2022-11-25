import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong, please try again later...</p>
    }

    return this.props.children
  }
}
