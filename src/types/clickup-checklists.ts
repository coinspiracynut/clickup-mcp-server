/**
 * Type definitions for ClickUp checklist tools.
 * These types define the data structures used for task checklists and checklist items.
 */

// Checklist Operations

/**
 * Data for creating a checklist on a task.
 */
export interface CreateChecklistData {
    /**
     * ID of the task to add a checklist to.
     */
    taskId: string;

    /**
     * Name of the checklist.
     */
    name: string;

    /**
     * Whether to use custom task IDs.
     */
    customTaskIds?: boolean;

    /**
     * Team ID (required when customTaskIds is true).
     */
    teamId?: string;
}

/**
 * Data for editing a checklist.
 */
export interface EditChecklistData {
    /**
     * ID of the checklist to edit.
     */
    checklistId: string;

    /**
     * New name for the checklist.
     */
    name?: string;

    /**
     * Position of the checklist among other checklists on the task.
     */
    position?: number;
}

/**
 * Data for deleting a checklist.
 */
export interface DeleteChecklistData {
    /**
     * ID of the checklist to delete.
     */
    checklistId: string;
}

// Checklist Item Operations

/**
 * Data for creating a checklist item.
 */
export interface CreateChecklistItemData {
    /**
     * ID of the checklist to add an item to.
     */
    checklistId: string;

    /**
     * Name of the checklist item.
     */
    name: string;

    /**
     * User ID to assign the checklist item to.
     */
    assignee?: number;
}

/**
 * Data for editing a checklist item.
 */
export interface EditChecklistItemData {
    /**
     * ID of the checklist containing the item.
     */
    checklistId: string;

    /**
     * ID of the checklist item to edit.
     */
    checklistItemId: string;

    /**
     * New name for the checklist item.
     */
    name?: string;

    /**
     * User ID to assign the checklist item to, or null to remove assignment.
     */
    assignee?: number | null;

    /**
     * Whether the item is resolved (completed) or not.
     */
    resolved?: boolean;

    /**
     * ID of the parent checklist item for nesting, or null to make it a top-level item.
     */
    parent?: string | null;
}

/**
 * Data for deleting a checklist item.
 */
export interface DeleteChecklistItemData {
    /**
     * ID of the checklist containing the item.
     */
    checklistId: string;

    /**
     * ID of the checklist item to delete.
     */
    checklistItemId: string;
}
