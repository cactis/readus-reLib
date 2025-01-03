# Readus reLib

A local ebook library manager and reader, built with Electron, React, and Epub.js.

<img src='(/assets/images/logo.png' width='50%'/>

## Overview

Readus reLib is a desktop application designed for managing your local ebook collection, with a focus on EPUB files. Instead of importing or copying your ebooks, Readus reLib adds them to its library catalog by referencing their original location. This allows you to organize your books without altering your existing file structure.

## Key Features:

- Local Ebook Management: Add and manage ebooks from your local computer.
- Non-Importing Catalog: Books are cataloged by referencing their existing file location.
- Built-in EPUB Reader: Open and read ebooks directly within the application.
- Powered by Epub.js: Provides a robust reading experience.
- Electron and React: Cross-platform desktop application with a modern user interface.

## Technologies Used

- Electron: For building cross-platform desktop applications with web technologies.
- React: For building a dynamic and responsive user interface.
- Epub.js: For rendering and navigating EPUB ebooks.

## Installation

To get started with Readus reLib, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/cactis/readus-reLib.git
```

2. Navigate to the project directory:

```bash
cd readus-reLib
```

3. Install dependencies:

```bash
npm install
```

4. Start the application:

```bash
npm start
```

This command will start the Electron app in development mode.

## Building for Production

To create a distributable app:

1. Ensure dependencies are installed:

```bash
npm install
```

2. Run the build script:

```bash
npm run build
```

This will create an executable for your operating system. The output folder depends on your OS, usually in a folder called `/dist`.

## Testing

There are currently no automated tests in this version of the project. However, you can manually test by:

1. Running the application: Follow the installation steps above.
2. Adding books: Navigate through the UI to add local EPUB files.
3. Opening books: Verify that you can open and navigate through the content of the added ebooks.
4. Check UI Responsiveness: Make sure components are functioning and the UI is responsive to different user actions.
   We are planning to add automated tests in the future for better code quality and maintainability.

## Contributing

Contributions are welcome! If you have a bug fix, feature idea, or any other improvement, feel free to:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them with clear messages.
4. Push your changes to your fork.
5. Submit a pull request.
   Please follow the existing code style and conventions.

## Feedback and Issues

If you find a bug or have a feature request, please submit an issue on the GitHub repository:
[https://github.com/cactis/readus-reLib/issues](https://github.com/cactis/readus-reLib/issues)
You can also reach out with questions or general feedback by creating a new issue or if your question isn't specific to the code, you are welcome to join us on the [Discussions](https://github.com/cactis/readus-reLib/discussions) section of the repository.

## License

[Add License Information Here, e.g., MIT License]
This project is licensed under the [License Name] - see the [LICENSE.md](LICENSE.md) file for details.
