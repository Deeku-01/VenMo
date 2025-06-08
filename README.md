# Venmo Client

This is the client-side monorepo for the Venmo application, built using Turborepo.

## Project Structure

This monorepo includes the following packages/apps:

### Apps

- `user-app`: The main user-facing application built with Next.js
- `merchant-app`: The merchant dashboard application built with Next.js

### Packages

- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This project uses several development tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Turborepo](https://turborepo.org/) for monorepo management


# Architechture 

![image](https://github.com/user-attachments/assets/a62680c7-5a0e-4550-9232-acac312f99b0)


## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

```sh
# Install dependencies
npm install
```

### Development

To start development servers for all apps:

```sh
npm run dev
```

To start a specific app:

```sh
# Start user app
npm run dev --workspace=user-app

# Start merchant app
npm run dev --workspace=merchant-app
```

### Build

To build all apps and packages:

```sh
npm run build
```

To build a specific app:

```sh
# Build user app
npm run build --workspace=user-app

# Build merchant app
npm run build --workspace=merchant-app
```

## Project Structure

```
apps/
  ├── user-app/        # User-facing application
  └── merchant-app/    # Merchant dashboard application
packages/
  ├── eslint-config/   # Shared ESLint configuration
  └── typescript-config/ # Shared TypeScript configuration
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.
