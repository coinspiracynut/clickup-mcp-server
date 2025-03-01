# ClickUp MCP Server

This is an enhanced version of the [ClickUp MCP Server](https://github.com/TaazKareem/clickup-mcp-server) originally created by [TaazKareem](https://github.com/TaazKareem).

## Enhancements

This fork adds the following features to the original ClickUp MCP Server:

### Task Relationships API Support

- **Task Dependencies**: Create and manage dependencies between tasks
  - Add dependencies to establish which tasks must be completed before others
  - Remove dependencies when they're no longer needed

- **Task Links**: Connect related tasks without creating dependencies
  - Add links between tasks to show relationships
  - Remove links when they're no longer relevant

- **Task Tags**: Organize tasks with tags
  - Add tags to tasks for better categorization
  - Remove tags from tasks when needed

- **Comments API**: Comprehensive comment management
  - Task Comments: Add and retrieve comments on tasks
  - List Comments: Add and retrieve comments on lists
  - Chat View Comments: Add and retrieve comments in chat views
  - Threaded Comments: Support for comment threads and replies
  - Comment Operations: Update and delete comments

## Original Features

The original server provides tools for:

- Workspace hierarchy navigation
- Task creation and management
- List and folder operations
- Task movement and duplication
- Filtering and searching tasks

## Setup

1. Clone this repository
2. Install dependencies with `npm install`
3. Build the project with `npm run build`
4. Configure your ClickUp API key in the settings

## Usage

This server can be used with AI assistants that support the Model Context Protocol (MCP). Once connected, the assistant can use all the tools to interact with your ClickUp workspace.

## Credits

- Original implementation by [TaazKareem](https://github.com/TaazKareem)
- Enhanced with relationship APIs by [Your Name/Username]

## License

This project is licensed under the terms of the original repository's license.
