# Scale AI Challenge

A React-based 3D visualization tool that renders point clouds and cuboids from JSON data using Three.js and React Three Fiber.

The challenge requirements can be found in [challenge.md](docs/challenge.md).

## Table of contents

- [Features](#features)
- [Stack](#stack)
- [Folder structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building the application](#building-the-application)
- [Running in development mode](#running-in-development-mode)
- [Contributing](#contributing)

## Features

- Full-screen 3D visualization
- Interactive camera controls (pan, zoom, rotate)
- Interactive timeline for frame navigation
- Cache layer to avoid fetching the same frame multiple times
- Basic decoupling using dependency inversion principle
- Accessibility:
  - Tab navigation
  - Screen reader support
  - Aria live region for the timeline

## Folder structure

```
src
    ├── components
    ├── lib
    │   ├── clients
    │   ├── context
    │   ├── helpers
    │   ├── hooks
    │   ├── interfaces
    │   ├── services
    │   └── types
    └── pages
    └── styles
```

## Prerequisites

- Node.js v22
- pnpm

## Installation

1. Clone the repository
2. Install dependencies:

```bash
cd challenge-scale-ai
nvm use
pnpm install
```

## Building the application

1. Build the application:

```bash
pnpm build
pnpm start
```

2. Go to http://localhost:3000 to see the application.

## Running in development mode

```bash
pnpm dev
```

## Contributing

This repository is not accepting direct contributions.
If you have any suggestions or improvements, please open an issue.
