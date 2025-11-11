# AI Topic Analyzer with Finite State Machine

An interactive web application that analyzes text content and identifies relevant topics using AI embeddings, powered by a finite state machine architecture.

## Overview

This app processes user-provided text through a multi-stage pipeline: summarization, embedding generation, and topic scoring. The entire workflow is orchestrated using XState, providing a robust and visualized state machine that manages the analysis lifecycle.

## Features

- **Real-time State Machine Visualization** - Watch the FSM transition through states as your text is analyzed
- **Client-side AI Processing** - No server required, runs entirely in your browser using Hugging Face Transformers
- **Multi-topic Similarity Scoring** - Analyzes text against predefined topic categories (Technical, Marketing, Formal, Emotional)
- **Recursive Text Summarization** - Handles long inputs by intelligently chunking and summarizing
- **Interactive Radar Chart** - Visual representation of topic scores using Recharts
- **Built with XState** - Predictable state management and transitions

## Demo

🎬 **[Try the Live Demo](https://your-demo-url-here.com)**

![App Demo](https://github.com/atorov/shrd-qb-hack-days-25-agents-fsm/blob/master/public/demo.gif)
_Animated demonstration of the AI Topic Analyzer in action_

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **State Management**: XState 5 & @xstate/react
- **AI/ML**: Hugging Face Transformers.js (client-side embeddings)
- **Visualization**: Recharts (radar charts), Mermaid (state diagrams)
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite (with Rolldown)

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/atorov/shrd-qb-hack-days-25-agents-fsm.git
cd shrd-qb-hack-days-25-agents-fsm

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## How It Works

1. **Input**: User provides text for analysis
2. **Summarization**: Long text is recursively summarized into manageable chunks
3. **Embedding Generation**: AI generates vector embeddings for the summarized text
4. **Topic Scoring**: Compares input embeddings against predefined topic vectors using cosine similarity
5. **Results Display**: Shows topic scores in an interactive radar chart

The entire process is managed by an XState finite state machine with states:

- `idle` → `summarizing` → `embedding` → `scoring` → `done`
