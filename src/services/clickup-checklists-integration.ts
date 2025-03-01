/**
 * ClickUp Checklists Integration
 * 
 * This file integrates the checklist tools with the main MCP server.
 * It provides the tool definitions and handlers for task checklists and checklist items.
 */

import { ClickUpChecklistsService } from './clickup-checklists.js';
import {
    CreateChecklistData,
    EditChecklistData,
    DeleteChecklistData,
    CreateChecklistItemData,
    EditChecklistItemData,
    DeleteChecklistItemData
} from '../types/clickup-checklists.js';

/**
 * Defines the checklist tools that will be added to the MCP server.
 * Each tool includes a name, description, and input schema.
 */
export const checklistTools = [
    // Checklist Operations
    {
        name: "create_checklist",
        description: "Add a new checklist to a task. Checklists help organize subtasks or steps needed to complete a task.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task to add a checklist to"
                },
                name: {
                    type: "string",
                    description: "Name of the checklist"
                },
                customTaskIds: {
                    type: "boolean",
                    description: "Whether to use custom task IDs"
                },
                teamId: {
                    type: "string",
                    description: "Team ID (required when customTaskIds is true)"
                }
            },
            required: ["taskId", "name"]
        }
    },
    {
        name: "edit_checklist",
        description: "Rename a task checklist or reorder it among other checklists on a task.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist to edit"
                },
                name: {
                    type: "string",
                    description: "New name for the checklist"
                },
                position: {
                    type: "number",
                    description: "Position of the checklist among other checklists on the task (0 places it at the top)"
                }
            },
            required: ["checklistId"]
        }
    },
    {
        name: "delete_checklist",
        description: "Delete a checklist from a task. This removes the entire checklist and all its items.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist to delete"
                }
            },
            required: ["checklistId"]
        }
    },

    // Checklist Item Operations
    {
        name: "create_checklist_item",
        description: "Add a line item to a task checklist. Checklist items represent individual steps or subtasks.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist to add an item to"
                },
                name: {
                    type: "string",
                    description: "Name of the checklist item"
                },
                assignee: {
                    type: "number",
                    description: "User ID to assign the checklist item to"
                }
            },
            required: ["checklistId", "name"]
        }
    },
    {
        name: "edit_checklist_item",
        description: "Update an individual line item in a task checklist. Use this to rename, reassign, mark as resolved, or nest items.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist containing the item"
                },
                checklistItemId: {
                    type: "string",
                    description: "ID of the checklist item to edit"
                },
                name: {
                    type: "string",
                    description: "New name for the checklist item"
                },
                assignee: {
                    type: ["number", "null"],
                    description: "User ID to assign the checklist item to, or null to remove assignment"
                },
                resolved: {
                    type: "boolean",
                    description: "Whether the item is resolved (completed) or not"
                },
                parent: {
                    type: ["string", "null"],
                    description: "ID of the parent checklist item for nesting, or null to make it a top-level item"
                }
            },
            required: ["checklistId", "checklistItemId"]
        }
    },
    {
        name: "delete_checklist_item",
        description: "Delete a line item from a task checklist. This permanently removes the item.",
        inputSchema: {
            type: "object",
            properties: {
                checklistId: {
                    type: "string",
                    description: "ID of the checklist containing the item"
                },
                checklistItemId: {
                    type: "string",
                    description: "ID of the checklist item to delete"
                }
            },
            required: ["checklistId", "checklistItemId"]
        }
    }
];

/**
 * Handles the execution of checklist tools.
 * This function processes the tool request and calls the appropriate method
 * in the ClickUpChecklistsService.
 * 
 * @param toolName - The name of the tool to execute
 * @param args - The arguments for the tool
 * @param checklistsService - The ClickUpChecklistsService instance
 * @returns Promise resolving to the result of the tool execution
 */
export async function handleChecklistTool(
    toolName: string,
    args: any,
    checklistsService: ClickUpChecklistsService
): Promise<any> {
    try {
        switch (toolName) {
            // Checklist Operations
            case "create_checklist": {
                const data = args as CreateChecklistData;
                return await checklistsService.createChecklist(
                    data.taskId,
                    data.name,
                    data.customTaskIds,
                    data.teamId
                );
            }

            case "edit_checklist": {
                const data = args as EditChecklistData;
                return await checklistsService.editChecklist(
                    data.checklistId,
                    data.name,
                    data.position
                );
            }

            case "delete_checklist": {
                const data = args as DeleteChecklistData;
                return await checklistsService.deleteChecklist(
                    data.checklistId
                );
            }

            // Checklist Item Operations
            case "create_checklist_item": {
                const data = args as CreateChecklistItemData;
                return await checklistsService.createChecklistItem(
                    data.checklistId,
                    data.name,
                    data.assignee
                );
            }

            case "edit_checklist_item": {
                const data = args as EditChecklistItemData;
                return await checklistsService.editChecklistItem(
                    data.checklistId,
                    data.checklistItemId,
                    data.name,
                    data.assignee,
                    data.resolved,
                    data.parent
                );
            }

            case "delete_checklist_item": {
                const data = args as DeleteChecklistItemData;
                return await checklistsService.deleteChecklistItem(
                    data.checklistId,
                    data.checklistItemId
                );
            }

            default:
                throw new Error(`Unknown checklist tool: ${toolName}`);
        }
    } catch (error) {
        console.error(`Error executing checklist tool ${toolName}:`, error);
        throw error;
    }
}
