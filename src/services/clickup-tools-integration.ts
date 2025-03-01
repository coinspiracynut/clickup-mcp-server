/**
 * ClickUp Tools Integration
 * 
 * This file integrates the relationship tools with the main MCP server.
 * It provides the tool definitions and handlers for task dependencies, links,
 * attachments, tags, and comments functionality.
 */

import { ClickUpRelationshipsService } from './clickup-relationships.js';
import {
    AddTaskDependencyData,
    DeleteTaskDependencyData,
    AddTaskLinkData,
    DeleteTaskLinkData,
    AddTagToTaskData,
    RemoveTagFromTaskData,
    GetTaskCommentsData,
    CreateTaskCommentData,
    GetListCommentsData,
    CreateListCommentData,
    GetChatViewCommentsData,
    CreateChatViewCommentData,
    UpdateCommentData,
    GetThreadedCommentsData,
    CreateThreadedCommentData
} from '../types/clickup-relationships.js';

/**
 * Defines the relationship tools that will be added to the MCP server.
 * Each tool includes a name, description, and input schema.
 */
export const relationshipTools = [
    // Task Dependencies
    {
        name: "add_task_dependency",
        description: "Create a dependency relationship between two tasks. Use this to establish that one task must be completed before another can start. You must specify either 'dependsOn' (the task that must be completed first) or 'dependencyOf' (the task that's waiting for this task), but not both.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task which is waiting on or blocking another task"
                },
                dependsOn: {
                    type: "string",
                    description: "ID of the task that must be completed first (optional if dependencyOf is provided)"
                },
                dependencyOf: {
                    type: "string",
                    description: "ID of the task that's waiting for this task (optional if dependsOn is provided)"
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
            required: ["taskId"],
            oneOf: [
                { required: ["dependsOn"] },
                { required: ["dependencyOf"] }
            ]
        }
    },
    {
        name: "delete_task_dependency",
        description: "Remove a dependency relationship between two tasks. This allows tasks to be completed independently of each other.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task"
                },
                dependsOn: {
                    type: "string",
                    description: "ID of the task that needed to be completed first"
                },
                dependencyOf: {
                    type: "string",
                    description: "ID of the task that was waiting"
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
            required: ["taskId", "dependsOn", "dependencyOf"]
        }
    },

    // Task Links
    {
        name: "add_task_link",
        description: "Create a link between two tasks. Unlike dependencies, links are just references between related tasks without enforcing completion order.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task to initiate the link from"
                },
                linksTo: {
                    type: "string",
                    description: "ID of the task to link to"
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
            required: ["taskId", "linksTo"]
        }
    },
    {
        name: "delete_task_link",
        description: "Remove a link between two tasks. This removes the reference between the tasks.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the first task in the link"
                },
                linksTo: {
                    type: "string",
                    description: "ID of the second task in the link"
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
            required: ["taskId", "linksTo"]
        }
    },

    // Task Tags
    {
        name: "add_tag_to_task",
        description: "Add a tag to a task for better organization and filtering. Tags help categorize tasks across different lists and projects.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task"
                },
                tagName: {
                    type: "string",
                    description: "Name of the tag to add"
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
            required: ["taskId", "tagName"]
        }
    },
    {
        name: "remove_tag_from_task",
        description: "Remove a tag from a task. This does not delete the tag from the Space, just removes it from the specific task.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task"
                },
                tagName: {
                    type: "string",
                    description: "Name of the tag to remove"
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
            required: ["taskId", "tagName"]
        }
    },

    // Task Comments
    {
        name: "get_task_comments",
        description: "Retrieve comments for a specific task. Comments provide discussion history and context for the task.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task"
                },
                customTaskIds: {
                    type: "boolean",
                    description: "Whether to use custom task IDs"
                },
                teamId: {
                    type: "string",
                    description: "Team ID (required when customTaskIds is true)"
                },
                start: {
                    type: "number",
                    description: "Unix timestamp in milliseconds to get comments from a specific date"
                },
                startId: {
                    type: "string",
                    description: "Comment ID to start pagination from"
                }
            },
            required: ["taskId"]
        }
    },
    {
        name: "create_task_comment",
        description: "Add a new comment to a task. Comments can be assigned to team members and include rich text formatting.",
        inputSchema: {
            type: "object",
            properties: {
                taskId: {
                    type: "string",
                    description: "ID of the task"
                },
                commentText: {
                    type: "string",
                    description: "Content of the comment"
                },
                assignee: {
                    type: "number",
                    description: "User ID to assign the comment to (optional)"
                },
                groupAssignee: {
                    type: "string",
                    description: "Group to assign the comment to (optional)"
                },
                notifyAll: {
                    type: "boolean",
                    description: "If true, notifications will be sent to everyone including the comment creator"
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
            required: ["taskId", "commentText"]
        }
    },

    // List Comments
    {
        name: "get_list_comments",
        description: "Retrieve comments for a specific list. List comments apply to the entire list rather than individual tasks.",
        inputSchema: {
            type: "object",
            properties: {
                listId: {
                    type: "string",
                    description: "ID of the list"
                },
                start: {
                    type: "number",
                    description: "Unix timestamp in milliseconds to get comments from a specific date"
                },
                startId: {
                    type: "string",
                    description: "Comment ID to start pagination from"
                }
            },
            required: ["listId"]
        }
    },
    {
        name: "create_list_comment",
        description: "Add a new comment to a list. List comments can be used for general discussion about the list's purpose or status.",
        inputSchema: {
            type: "object",
            properties: {
                listId: {
                    type: "string",
                    description: "ID of the list"
                },
                commentText: {
                    type: "string",
                    description: "Content of the comment"
                },
                assignee: {
                    type: "number",
                    description: "User ID to assign the comment to"
                },
                notifyAll: {
                    type: "boolean",
                    description: "If true, notifications will be sent to everyone including the comment creator"
                }
            },
            required: ["listId", "commentText", "assignee"]
        }
    },

    // Chat View Comments
    {
        name: "get_chat_view_comments",
        description: "Retrieve comments from a Chat view. Chat views provide a dedicated space for team discussions.",
        inputSchema: {
            type: "object",
            properties: {
                viewId: {
                    type: "string",
                    description: "ID of the Chat view"
                },
                start: {
                    type: "number",
                    description: "Unix timestamp in milliseconds to get comments from a specific date"
                },
                startId: {
                    type: "string",
                    description: "Comment ID to start pagination from"
                }
            },
            required: ["viewId"]
        }
    },
    {
        name: "create_chat_view_comment",
        description: "Add a new comment to a Chat view. Chat view comments facilitate team discussions outside of specific tasks or lists.",
        inputSchema: {
            type: "object",
            properties: {
                viewId: {
                    type: "string",
                    description: "ID of the Chat view"
                },
                commentText: {
                    type: "string",
                    description: "Content of the comment"
                },
                notifyAll: {
                    type: "boolean",
                    description: "If true, notifications will be sent to everyone including the comment creator"
                }
            },
            required: ["viewId", "commentText"]
        }
    },

    // General Comment Operations
    {
        name: "update_comment",
        description: "Modify an existing comment. This can be used to edit the content, change assignees, or mark comments as resolved.",
        inputSchema: {
            type: "object",
            properties: {
                commentId: {
                    type: "string",
                    description: "ID of the comment to update"
                },
                commentText: {
                    type: "string",
                    description: "New content for the comment"
                },
                assignee: {
                    type: "number",
                    description: "User ID to assign the comment to"
                },
                groupAssignee: {
                    type: "number",
                    description: "Group to assign the comment to"
                },
                resolved: {
                    type: "boolean",
                    description: "Mark comment as resolved or not"
                }
            },
            required: ["commentId", "commentText", "assignee"]
        }
    },
    {
        name: "delete_comment",
        description: "Remove a comment. This permanently deletes the comment and cannot be undone.",
        inputSchema: {
            type: "object",
            properties: {
                commentId: {
                    type: "string",
                    description: "ID of the comment to delete"
                }
            },
            required: ["commentId"]
        }
    },

    // Threaded Comments
    {
        name: "get_threaded_comments",
        description: "Retrieve threaded comments for a parent comment. Threaded comments allow for organized discussions within a comment thread.",
        inputSchema: {
            type: "object",
            properties: {
                commentId: {
                    type: "string",
                    description: "ID of the parent comment"
                }
            },
            required: ["commentId"]
        }
    },
    {
        name: "create_threaded_comment",
        description: "Add a reply to an existing comment. Threaded comments help keep discussions organized by grouping related comments together.",
        inputSchema: {
            type: "object",
            properties: {
                commentId: {
                    type: "string",
                    description: "ID of the parent comment"
                },
                commentText: {
                    type: "string",
                    description: "Content of the threaded comment"
                },
                assignee: {
                    type: "number",
                    description: "User ID to assign the comment to (optional)"
                },
                groupAssignee: {
                    type: "string",
                    description: "Group to assign the comment to (optional)"
                },
                notifyAll: {
                    type: "boolean",
                    description: "If true, notifications will be sent to everyone including the comment creator"
                }
            },
            required: ["commentId", "commentText"]
        }
    }
];

/**
 * Handles the execution of relationship tools.
 * This function processes the tool request and calls the appropriate method
 * in the ClickUpRelationshipsService.
 * 
 * @param toolName - The name of the tool to execute
 * @param args - The arguments for the tool
 * @param relationshipsService - The ClickUpRelationshipsService instance
 * @returns Promise resolving to the result of the tool execution
 */
export async function handleRelationshipTool(
    toolName: string,
    args: any,
    relationshipsService: ClickUpRelationshipsService
): Promise<any> {
    try {
        switch (toolName) {
            // Task Dependencies
            case "add_task_dependency": {
                const data = args as AddTaskDependencyData;
                return await relationshipsService.addTaskDependency(
                    data.taskId,
                    data.dependsOn,
                    data.dependencyOf,
                    data.customTaskIds,
                    data.teamId
                );
            }

            case "delete_task_dependency": {
                const data = args as DeleteTaskDependencyData;
                return await relationshipsService.deleteTaskDependency(
                    data.taskId,
                    data.dependsOn,
                    data.dependencyOf,
                    data.customTaskIds,
                    data.teamId
                );
            }

            // Task Links
            case "add_task_link": {
                const data = args as AddTaskLinkData;
                return await relationshipsService.addTaskLink(
                    data.taskId,
                    data.linksTo,
                    data.customTaskIds,
                    data.teamId
                );
            }

            case "delete_task_link": {
                const data = args as DeleteTaskLinkData;
                return await relationshipsService.deleteTaskLink(
                    data.taskId,
                    data.linksTo,
                    data.customTaskIds,
                    data.teamId
                );
            }

            // Task Tags
            case "add_tag_to_task": {
                const data = args as AddTagToTaskData;
                return await relationshipsService.addTagToTask(
                    data.taskId,
                    data.tagName,
                    data.customTaskIds,
                    data.teamId
                );
            }

            case "remove_tag_from_task": {
                const data = args as RemoveTagFromTaskData;
                return await relationshipsService.removeTagFromTask(
                    data.taskId,
                    data.tagName,
                    data.customTaskIds,
                    data.teamId
                );
            }

            // Task Comments
            case "get_task_comments": {
                const data = args as GetTaskCommentsData;
                return await relationshipsService.getTaskComments(
                    data.taskId,
                    data.customTaskIds,
                    data.teamId,
                    data.start,
                    data.startId
                );
            }

            case "create_task_comment": {
                const data = args as CreateTaskCommentData;
                return await relationshipsService.createTaskComment(
                    data.taskId,
                    data.commentText,
                    data.assignee,
                    data.groupAssignee,
                    data.notifyAll || false,
                    data.customTaskIds,
                    data.teamId
                );
            }

            // List Comments
            case "get_list_comments": {
                const data = args as GetListCommentsData;
                return await relationshipsService.getListComments(
                    data.listId,
                    data.start,
                    data.startId
                );
            }

            case "create_list_comment": {
                const data = args as CreateListCommentData;
                return await relationshipsService.createListComment(
                    data.listId,
                    data.commentText,
                    data.assignee,
                    data.notifyAll || false
                );
            }

            // Chat View Comments
            case "get_chat_view_comments": {
                const data = args as GetChatViewCommentsData;
                return await relationshipsService.getChatViewComments(
                    data.viewId,
                    data.start,
                    data.startId
                );
            }

            case "create_chat_view_comment": {
                const data = args as CreateChatViewCommentData;
                return await relationshipsService.createChatViewComment(
                    data.viewId,
                    data.commentText,
                    data.notifyAll || false
                );
            }

            // General Comment Operations
            case "update_comment": {
                const data = args as UpdateCommentData;
                return await relationshipsService.updateComment(
                    data.commentId,
                    data.commentText,
                    data.assignee,
                    data.groupAssignee,
                    data.resolved || false
                );
            }

            case "delete_comment": {
                return await relationshipsService.deleteComment(args.commentId);
            }

            // Threaded Comments
            case "get_threaded_comments": {
                const data = args as GetThreadedCommentsData;
                return await relationshipsService.getThreadedComments(data.commentId);
            }

            case "create_threaded_comment": {
                const data = args as CreateThreadedCommentData;
                return await relationshipsService.createThreadedComment(
                    data.commentId,
                    data.commentText,
                    data.assignee,
                    data.groupAssignee,
                    data.notifyAll || false
                );
            }

            default:
                throw new Error(`Unknown relationship tool: ${toolName}`);
        }
    } catch (error) {
        console.error(`Error executing relationship tool ${toolName}:`, error);
        throw error;
    }
}
