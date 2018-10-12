import React, { Component } from 'react'

export default function withPrompt(WrappedComponent) {
  const HOC = class extends Component {
    state = {
      isPromptOpen: false,
      promptText: null,
      promptId: null
    }

    closePrompt = () => {
      this.setState({
        isPromptOpen: false,
        promptText: null,
        promptId: null
      })
    }

    openPrompt = (isPromptOpen, data) => {
      this.setState({
        isPromptOpen,
        promptId: data.promptId || null,
        promptText: data.promptText || null
      })
    }

    render() {
      const { isPromptOpen, promptText, promptId } = this.state

      return (<WrappedComponent
        {...this.props}
        openPrompt={this.openPrompt}
        closePrompt={this.closePrompt}
        isPromptOpen={isPromptOpen}
        promptText={promptText}
        promptId={promptId}
      />)
    }
  }

  return HOC
}
