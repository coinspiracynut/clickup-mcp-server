/**
 * ClickUp Relationships Service
 * 
 * This service provides functionality for managing task relationships in ClickUp,
 * including dependencies, links, attachments, tags, and comments.
 */

import axios, { AxiosInstance } from 'axios';

/**
 * Service for interacting with ClickUp's relationship APIs.
 * Handles task dependencies, links, attachments, tags, and comments.
 */
export class ClickUpRelationshipsService {
    private static instance: ClickUpRelationshipsService;
    private apiKey: string;
    private teamId: string;
    private axiosInstance: AxiosInstance;

    /**
     * Private constructor to enforce singleton pattern.
     * @param apiKey - ClickUp API key
     * @param teamId - ClickUp team ID
     */
    private constructor(apiKey: string, teamId: string) {
        this.apiKey = apiKey;
        this.teamId = teamId;
        this.axiosInstance = axios.create({
            baseURL: 'https://api.clickup.com/api/v2',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Initialize the ClickUpRelationshipsService singleton.
     * @param apiKey - ClickUp API key
     * @param teamId - ClickUp team ID
     * @returns The ClickUpRelationshipsService instance
     */
    public static initialize(apiKey: string, teamId: string): ClickUpRelationshipsService {
        if (!ClickUpRelationshipsService.instance) {
            ClickUpRelationshipsService.instance = new ClickUpRelationshipsService(apiKey, teamId);
        }
        return ClickUpRelationshipsService.instance;
    }

    /**
     * Get the team ID.
     * @returns The team ID
     */
    public getTeamId(): string {
        return this.teamId;
    }

    // Task Dependencies

    /**
     * Add a dependency relationship between two tasks.
     * @param taskId - ID of the task which is waiting on or blocking another task
     * @param dependsOn - ID of the task that must be completed first (optional if dependencyOf is provided)
     * @param dependencyOf - ID of the task that's waiting for this task (optional if dependsOn is provided)
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async addTaskDependency(
        taskId: string,
        dependsOn?: string,
        dependencyOf?: string,
        customTaskIds?: boolean,
        teamId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }

            const url = `/task/${taskId}/dependency?${queryParams.toString()}`;
            const body = dependsOn ? { depends_on: dependsOn } : { dependency_of: dependencyOf };

            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error adding task dependency:', error);
            throw error;
        }
    }

    /**
     * Delete a dependency relationship between two tasks.
     * @param taskId - ID of the task
     * @param dependsOn - ID of the task that needed to be completed first
     * @param dependencyOf - ID of the task that was waiting
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async deleteTaskDependency(
        taskId: string,
        dependsOn: string,
        dependencyOf: string,
        customTaskIds?: boolean,
        teamId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('depends_on', dependsOn);
            queryParams.append('dependency_of', dependencyOf);

            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }

            const url = `/task/${taskId}/dependency?${queryParams.toString()}`;
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error('Error deleting task dependency:', error);
            throw error;
        }
    }

    // Task Links

    /**
     * Add a link between two tasks.
     * @param taskId - ID of the task to initiate the link from
     * @param linksTo - ID of the task to link to
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async addTaskLink(
        taskId: string,
        linksTo: string,
        customTaskIds?: boolean,
        teamId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }

            const url = `/task/${taskId}/link/${linksTo}?${queryParams.toString()}`;
            const response = await this.axiosInstance.post(url);
            return response.data;
        } catch (error) {
            console.error('Error adding task link:', error);
            throw error;
        }
    }

    /**
     * Delete a link between two tasks.
     * @param taskId - ID of the first task in the link
     * @param linksTo - ID of the second task in the link
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async deleteTaskLink(
        taskId: string,
        linksTo: string,
        customTaskIds?: boolean,
        teamId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }

            const url = `/task/${taskId}/link/${linksTo}?${queryParams.toString()}`;
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error('Error deleting task link:', error);
            throw error;
        }
    }

    // Task Tags

    /**
     * Add a tag to a task.
     * @param taskId - ID of the task
     * @param tagName - Name of the tag to add
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async addTagToTask(
        taskId: string,
        tagName: string,
        customTaskIds?: boolean,
        teamId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }

            const url = `/task/${taskId}/tag/${encodeURIComponent(tagName)}?${queryParams.toString()}`;
            const response = await this.axiosInstance.post(url);
            return response.data;
        } catch (error) {
            console.error('Error adding tag to task:', error);
            throw error;
        }
    }

    /**
     * Remove a tag from a task.
     * @param taskId - ID of the task
     * @param tagName - Name of the tag to remove
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async removeTagFromTask(
        taskId: string,
        tagName: string,
        customTaskIds?: boolean,
        teamId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }

            const url = `/task/${taskId}/tag/${encodeURIComponent(tagName)}?${queryParams.toString()}`;
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error('Error removing tag from task:', error);
            throw error;
        }
    }

    // Task Comments

    /**
     * Get comments for a specific task.
     * @param taskId - ID of the task
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @param start - Unix timestamp in milliseconds to get comments from a specific date
     * @param startId - Comment ID to start pagination from
     * @returns The response from the API
     */
    public async getTaskComments(
        taskId: string,
        customTaskIds?: boolean,
        teamId?: string,
        start?: number,
        startId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }
            if (start) {
                queryParams.append('start', start.toString());
            }
            if (startId) {
                queryParams.append('start_id', startId);
            }

            const url = `/task/${taskId}/comment?${queryParams.toString()}`;
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Error getting task comments:', error);
            throw error;
        }
    }

    /**
     * Create a comment on a task.
     * @param taskId - ID of the task
     * @param commentText - Content of the comment
     * @param assignee - User ID to assign the comment to (optional)
     * @param groupAssignee - Group to assign the comment to (optional)
     * @param notifyAll - If true, notifications will be sent to everyone including the comment creator
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async createTaskComment(
        taskId: string,
        commentText: string,
        assignee?: number,
        groupAssignee?: string,
        notifyAll: boolean = false,
        customTaskIds?: boolean,
        teamId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (customTaskIds) {
                queryParams.append('custom_task_ids', 'true');
                if (teamId) {
                    queryParams.append('team_id', teamId);
                } else {
                    queryParams.append('team_id', this.teamId);
                }
            }

            const url = `/task/${taskId}/comment?${queryParams.toString()}`;
            const body: any = {
                comment_text: commentText,
                notify_all: notifyAll
            };

            if (assignee) {
                body.assignee = assignee;
            }
            if (groupAssignee) {
                body.group_assignee = groupAssignee;
            }

            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error creating task comment:', error);
            throw error;
        }
    }

    // List Comments

    /**
     * Get comments for a specific list.
     * @param listId - ID of the list
     * @param start - Unix timestamp in milliseconds to get comments from a specific date
     * @param startId - Comment ID to start pagination from
     * @returns The response from the API
     */
    public async getListComments(
        listId: string,
        start?: number,
        startId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (start) {
                queryParams.append('start', start.toString());
            }
            if (startId) {
                queryParams.append('start_id', startId);
            }

            const url = `/list/${listId}/comment?${queryParams.toString()}`;
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Error getting list comments:', error);
            throw error;
        }
    }

    /**
     * Create a comment on a list.
     * @param listId - ID of the list
     * @param commentText - Content of the comment
     * @param assignee - User ID to assign the comment to
     * @param notifyAll - If true, notifications will be sent to everyone including the comment creator
     * @returns The response from the API
     */
    public async createListComment(
        listId: string,
        commentText: string,
        assignee: number,
        notifyAll: boolean = false
    ): Promise<any> {
        try {
            const url = `/list/${listId}/comment`;
            const body = {
                comment_text: commentText,
                assignee,
                notify_all: notifyAll
            };

            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error creating list comment:', error);
            throw error;
        }
    }

    // Chat View Comments

    /**
     * Get comments from a Chat view.
     * @param viewId - ID of the Chat view
     * @param start - Unix timestamp in milliseconds to get comments from a specific date
     * @param startId - Comment ID to start pagination from
     * @returns The response from the API
     */
    public async getChatViewComments(
        viewId: string,
        start?: number,
        startId?: string
    ): Promise<any> {
        try {
            const queryParams = new URLSearchParams();
            if (start) {
                queryParams.append('start', start.toString());
            }
            if (startId) {
                queryParams.append('start_id', startId);
            }

            const url = `/view/${viewId}/comment?${queryParams.toString()}`;
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Error getting chat view comments:', error);
            throw error;
        }
    }

    /**
     * Create a comment on a Chat view.
     * @param viewId - ID of the Chat view
     * @param commentText - Content of the comment
     * @param notifyAll - If true, notifications will be sent to everyone including the comment creator
     * @returns The response from the API
     */
    public async createChatViewComment(
        viewId: string,
        commentText: string,
        notifyAll: boolean = false
    ): Promise<any> {
        try {
            const url = `/view/${viewId}/comment`;
            const body = {
                comment_text: commentText,
                notify_all: notifyAll
            };

            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error creating chat view comment:', error);
            throw error;
        }
    }

    // General Comment Operations

    /**
     * Update an existing comment.
     * @param commentId - ID of the comment to update
     * @param commentText - New content for the comment
     * @param assignee - User ID to assign the comment to
     * @param groupAssignee - Group to assign the comment to
     * @param resolved - Mark comment as resolved or not
     * @returns The response from the API
     */
    public async updateComment(
        commentId: string,
        commentText: string,
        assignee: number,
        groupAssignee?: number,
        resolved: boolean = false
    ): Promise<any> {
        try {
            const url = `/comment/${commentId}`;
            const body: any = {
                comment_text: commentText,
                assignee,
                resolved
            };

            if (groupAssignee) {
                body.group_assignee = groupAssignee;
            }

            const response = await this.axiosInstance.put(url, body);
            return response.data;
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    }

    /**
     * Delete a comment.
     * @param commentId - ID of the comment to delete
     * @returns The response from the API
     */
    public async deleteComment(commentId: string): Promise<any> {
        try {
            const url = `/comment/${commentId}`;
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }

    // Threaded Comments

    /**
     * Get threaded comments for a parent comment.
     * @param commentId - ID of the parent comment
     * @returns The response from the API
     */
    public async getThreadedComments(commentId: string): Promise<any> {
        try {
            const url = `/comment/${commentId}/reply`;
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Error getting threaded comments:', error);
            throw error;
        }
    }

    /**
     * Create a threaded comment as a reply to another comment.
     * @param commentId - ID of the parent comment
     * @param commentText - Content of the threaded comment
     * @param assignee - User ID to assign the comment to (optional)
     * @param groupAssignee - Group to assign the comment to (optional)
     * @param notifyAll - If true, notifications will be sent to everyone including the comment creator
     * @returns The response from the API
     */
    public async createThreadedComment(
        commentId: string,
        commentText: string,
        assignee?: number,
        groupAssignee?: string,
        notifyAll: boolean = false
    ): Promise<any> {
        try {
            const url = `/comment/${commentId}/reply`;
            const body: any = {
                comment_text: commentText,
                notify_all: notifyAll
            };

            if (assignee) {
                body.assignee = assignee;
            }
            if (groupAssignee) {
                body.group_assignee = groupAssignee;
            }

            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error creating threaded comment:', error);
            throw error;
        }
    }
}
