/**
 * ClickUp Checklists Service
 * 
 * This service provides functionality for managing task checklists in ClickUp,
 * including creating, editing, and deleting checklists and checklist items.
 */

import axios, { AxiosInstance } from 'axios';

/**
 * Service for interacting with ClickUp's checklist APIs.
 * Handles task checklists and checklist items.
 */
export class ClickUpChecklistsService {
    private static instance: ClickUpChecklistsService;
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
     * Initialize the ClickUpChecklistsService singleton.
     * @param apiKey - ClickUp API key
     * @param teamId - ClickUp team ID
     * @returns The ClickUpChecklistsService instance
     */
    public static initialize(apiKey: string, teamId: string): ClickUpChecklistsService {
        if (!ClickUpChecklistsService.instance) {
            ClickUpChecklistsService.instance = new ClickUpChecklistsService(apiKey, teamId);
        }
        return ClickUpChecklistsService.instance;
    }

    /**
     * Get the team ID.
     * @returns The team ID
     */
    public getTeamId(): string {
        return this.teamId;
    }

    // Checklist Operations

    /**
     * Create a new checklist on a task.
     * @param taskId - ID of the task to add a checklist to
     * @param name - Name of the checklist
     * @param customTaskIds - Whether to use custom task IDs
     * @param teamId - Team ID (required when customTaskIds is true)
     * @returns The response from the API
     */
    public async createChecklist(
        taskId: string,
        name: string,
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

            const url = `/task/${taskId}/checklist?${queryParams.toString()}`;
            const body = { name };

            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error creating checklist:', error);
            throw error;
        }
    }

    /**
     * Edit an existing checklist.
     * @param checklistId - ID of the checklist to edit
     * @param name - New name for the checklist
     * @param position - Position of the checklist among other checklists on the task
     * @returns The response from the API
     */
    public async editChecklist(
        checklistId: string,
        name?: string,
        position?: number
    ): Promise<any> {
        try {
            const url = `/checklist/${checklistId}`;
            const body: any = {};

            if (name !== undefined) {
                body.name = name;
            }

            if (position !== undefined) {
                body.position = position;
            }

            const response = await this.axiosInstance.put(url, body);
            return response.data;
        } catch (error) {
            console.error('Error editing checklist:', error);
            throw error;
        }
    }

    /**
     * Delete a checklist from a task.
     * @param checklistId - ID of the checklist to delete
     * @returns The response from the API
     */
    public async deleteChecklist(checklistId: string): Promise<any> {
        try {
            const url = `/checklist/${checklistId}`;
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error('Error deleting checklist:', error);
            throw error;
        }
    }

    // Checklist Item Operations

    /**
     * Create a new checklist item.
     * @param checklistId - ID of the checklist to add an item to
     * @param name - Name of the checklist item
     * @param assignee - User ID to assign the checklist item to
     * @returns The response from the API
     */
    public async createChecklistItem(
        checklistId: string,
        name: string,
        assignee?: number
    ): Promise<any> {
        try {
            const url = `/checklist/${checklistId}/checklist_item`;
            const body: any = { name };

            if (assignee !== undefined) {
                body.assignee = assignee;
            }

            const response = await this.axiosInstance.post(url, body);
            return response.data;
        } catch (error) {
            console.error('Error creating checklist item:', error);
            throw error;
        }
    }

    /**
     * Edit an existing checklist item.
     * @param checklistId - ID of the checklist containing the item
     * @param checklistItemId - ID of the checklist item to edit
     * @param name - New name for the checklist item
     * @param assignee - User ID to assign the checklist item to, or null to remove assignment
     * @param resolved - Whether the item is resolved (completed) or not
     * @param parent - ID of the parent checklist item for nesting, or null to make it a top-level item
     * @returns The response from the API
     */
    public async editChecklistItem(
        checklistId: string,
        checklistItemId: string,
        name?: string,
        assignee?: number | null,
        resolved?: boolean,
        parent?: string | null
    ): Promise<any> {
        try {
            const url = `/checklist/${checklistId}/checklist_item/${checklistItemId}`;
            const body: any = {};

            if (name !== undefined) {
                body.name = name;
            }

            if (assignee !== undefined) {
                body.assignee = assignee;
            }

            if (resolved !== undefined) {
                body.resolved = resolved;
            }

            if (parent !== undefined) {
                body.parent = parent;
            }

            const response = await this.axiosInstance.put(url, body);
            return response.data;
        } catch (error) {
            console.error('Error editing checklist item:', error);
            throw error;
        }
    }

    /**
     * Delete a checklist item.
     * @param checklistId - ID of the checklist containing the item
     * @param checklistItemId - ID of the checklist item to delete
     * @returns The response from the API
     */
    public async deleteChecklistItem(
        checklistId: string,
        checklistItemId: string
    ): Promise<any> {
        try {
            const url = `/checklist/${checklistId}/checklist_item/${checklistItemId}`;
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error('Error deleting checklist item:', error);
            throw error;
        }
    }
}
