You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

### 5. Development Status and Refactoring Guidance

- This project is currently under active development. Backward compatibility with previous versions is **not required** when performing refactors or major changes.
- If components, features, or plugins break due to a refactor, it is expected that they be updated or rewritten to match the new architecture or patterns.
- Prioritize modern best practices and project improvements over maintaining legacy code compatibility. Use this freedom to iterate quickly and keep the codebase clean and current.

### 6. Important: Separation of Tauri Logic

Do **not** include any Tauri-specific logic directly inside plugin packages. All Tauri API usage and logic should be handled exclusively within the main app layer (e.g., in `@stream-kit/app`). Plugins should only interact with Tauri or platform-specific features by calling app-provided APIs or interfaces. For example, if a plugin needs filesystem access, it should use an abstraction like `app.fs` rather than importing or using Tauri APIs directly. This ensures plugins remain portable, testable, and decoupled from Tauri, while keeping all platform logic centralized in the app itself.
