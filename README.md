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

### Local Development

1. Clone this repository
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env` and add your ClickUp API key and team ID
4. Build the project with `npm run build`
5. Run the server with `node build/index.js`

### Railway Deployment

This repository includes configuration for easy deployment on [Railway](https://railway.app/):

1. Fork or clone this repository to your GitHub account
2. Create a new project on Railway from your GitHub repository
3. Add the following environment variables in Railway:
   - `CLICKUP_API_KEY`: Your ClickUp API key
   - `CLICKUP_TEAM_ID`: Your ClickUp team ID
4. Deploy the project - Railway will automatically build and run the server

## Usage

This server can be used with AI assistants that support the Model Context Protocol (MCP). Once connected, the assistant can use all the tools to interact with your ClickUp workspace.

### Connecting to Claude

1. Open Claude Desktop app
2. Go to Settings > MCP Servers
3. Add a new MCP server with the following configuration:
   ```json
   "clickup": {
     "command": "curl",
     "args": ["-s", "https://your-railway-app-url.railway.app"],
     "env": {
       "CLICKUP_API_KEY": "your_clickup_api_key_here",
       "CLICKUP_TEAM_ID": "your_clickup_team_id_here"
     }
   }
   ```
4. Replace `https://your-railway-app-url.railway.app` with your actual Railway app URL
5. Replace the API key and team ID with your actual credentials

## Credits

- Original implementation by [TaazKareem](https://github.com/TaazKareem)
- Enhanced with relationship APIs by [v4lheru](https://github.com/v4lheru)

## License

This project is licensed under the terms of the original repository's license.
