# ClickUp MCP Server

This is an enhanced version of the [ClickUp MCP Server](https://github.com/TaazKareem/clickup-mcp-server) originally created by [TaazKareem](https://github.com/TaazKareem).

## Enhancements and Architectural Improvements

This fork adds new features and improves the architecture of the original ClickUp MCP Server:

### New Features: Task Relationships API Support

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

### Architectural Improvements

We've made the codebase more modular and maintainable:

1. **Service-Based Architecture**:
   - Separated core ClickUp service from relationship-specific functionality
   - Created dedicated service classes with clear responsibilities
   - Improved code organization and maintainability

2. **Type-Driven Development**:
   - Enhanced TypeScript type definitions for all API interactions
   - Separated type definitions into domain-specific files
   - Improved code completion and error detection

3. **Tool Integration Layer**:
   - Created a dedicated integration layer for MCP tools
   - Centralized tool definitions and handlers
   - Made adding new tools more straightforward

4. **Deployment Configuration**:
   - Added Railway deployment support
   - Included environment variable templates
   - Simplified deployment process

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

## Extending the Server

### How to Add New Tools

This server is designed to be easily extensible. Follow these steps to add new ClickUp API tools:

1. **Define Types** (in `src/types/`):
   - Create or update type definitions for your new tool's input/output data
   - Example: `export interface NewToolData { param1: string; param2: number; }`

2. **Implement Service Methods** (in `src/services/`):
   - Add methods to the appropriate service class or create a new service
   - Example:
     ```typescript
     public async newToolMethod(param1: string, param2: number): Promise<any> {
       try {
         const url = `/some/api/endpoint`;
         const response = await this.axiosInstance.post(url, { param1, param2 });
         return response.data;
       } catch (error) {
         console.error('Error in new tool method:', error);
         throw error;
       }
     }
     ```

3. **Define Tool Schema** (in `src/services/clickup-tools-integration.ts`):
   - Add a new tool definition to the appropriate tools array
   - Example:
     ```typescript
     {
       name: "new_tool_name",
       description: "Description of what the tool does and when to use it",
       inputSchema: {
         type: "object",
         properties: {
           param1: {
             type: "string",
             description: "Description of parameter 1"
           },
           param2: {
             type: "number",
             description: "Description of parameter 2"
           }
         },
         required: ["param1"]
       }
     }
     ```

4. **Implement Tool Handler** (in `src/services/clickup-tools-integration.ts`):
   - Add a case to the `handleRelationshipTool` function (or create a new handler)
   - Example:
     ```typescript
     case "new_tool_name": {
       const data = args as NewToolData;
       return await relationshipsService.newToolMethod(
         data.param1,
         data.param2
       );
     }
     ```

5. **Update the Main Server** (if needed, in `src/index.ts`):
   - If you created a new service or handler, import and initialize it
   - Make sure your tool is included in the appropriate tools array

### Example: Adding a New ClickUp API Tool

Let's say you want to add support for ClickUp's Time Tracking API:

1. Create `src/types/clickup-timetracking.ts` with interfaces for time entries
2. Create `src/services/clickup-timetracking.ts` with methods to interact with time tracking endpoints
3. Create `src/services/clickup-timetracking-integration.ts` with tool definitions and handlers
4. Update `src/index.ts` to import and initialize your new service and tools

This modular approach makes it easy to add new functionality without modifying existing code, following the Open/Closed Principle.

## Credits

- Original implementation by [TaazKareem](https://github.com/TaazKareem)
- Enhanced with relationship APIs by [v4lheru](https://github.com/v4lheru)

## License

This project is licensed under the terms of the original repository's license.
