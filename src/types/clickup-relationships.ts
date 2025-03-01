/**
 * Type definitions for ClickUp relationship tools.
 * These types define the data structures used for task dependencies, links,
 * attachments, tags, and comments functionality.
 */

// Task Dependencies

/**
 * Data for adding a task dependency.
 */
export interface AddTaskDependencyData {
    /**
     * ID of the task which is waiting on or blocking another task.
     */
    taskId: string;

    /**
     * ID of the task that must be completed first (optional if dependencyOf is provided).
     */
    dependsOn?: string;

    /**
     * ID of the task that's waiting for this task (optional if dependsOn is provided).
     */
    dependencyOf?: string;

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
 * Data for deleting a task dependency.
 */
export interface DeleteTaskDependencyData {
    /**
     * ID of the task.
     */
    taskId: string;

    /**
     * ID of the task that needed to be completed first.
     */
    dependsOn: string;

    /**
     * ID of the task that was waiting.
     */
    dependencyOf: string;

    /**
     * Whether to use custom task IDs.
     */
    customTaskIds?: boolean;

    /**
     * Team ID (required when customTaskIds is true).
     */
    teamId?: string;
}

// Task Links

/**
 * Data for adding a task link.
 */
export interface AddTaskLinkData {
    /**
     * ID of the task to initiate the link from.
     */
    taskId: string;

    /**
     * ID of the task to link to.
     */
    linksTo: string;

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
 * Data for deleting a task link.
 */
export interface DeleteTaskLinkData {
    /**
     * ID of the first task in the link.
     */
    taskId: string;

    /**
     * ID of the second task in the link.
     */
    linksTo: string;

    /**
     * Whether to use custom task IDs.
     */
    customTaskIds?: boolean;

    /**
     * Team ID (required when customTaskIds is true).
     */
    teamId?: string;
}

// Task Tags

/**
 * Data for adding a tag to a task.
 */
export interface AddTagToTaskData {
    /**
     * ID of the task.
     */
    taskId: string;

    /**
     * Name of the tag to add.
     */
    tagName: string;

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
 * Data for removing a tag from a task.
 */
export interface RemoveTagFromTaskData {
    /**
     * ID of the task.
     */
    taskId: string;

    /**
     * Name of the tag to remove.
     */
    tagName: string;

    /**
     * Whether to use custom task IDs.
     */
    customTaskIds?: boolean;

    /**
     * Team ID (required when customTaskIds is true).
     */
    teamId?: string;
}

// Task Comments

/**
 * Data for getting task comments.
 */
export interface GetTaskCommentsData {
    /**
     * ID of the task.
     */
    taskId: string;

    /**
     * Whether to use custom task IDs.
     */
    customTaskIds?: boolean;

    /**
     * Team ID (required when customTaskIds is true).
     */
    teamId?: string;

    /**
     * Unix timestamp in milliseconds to get comments from a specific date.
     */
    start?: number;

    /**
     * Comment ID to start pagination from.
     */
    startId?: string;
}

/**
 * Data for creating a task comment.
 */
export interface CreateTaskCommentData {
    /**
     * ID of the task.
     */
    taskId: string;

    /**
     * Content of the comment.
     */
    commentText: string;

    /**
     * User ID to assign the comment to (optional).
     */
    assignee?: number;

    /**
     * Group to assign the comment to (optional).
     */
    groupAssignee?: string;

    /**
     * If true, notifications will be sent to everyone including the comment creator.
     */
    notifyAll?: boolean;

    /**
     * Whether to use custom task IDs.
     */
    customTaskIds?: boolean;

    /**
     * Team ID (required when customTaskIds is true).
     */
    teamId?: string;
}

// List Comments

/**
 * Data for getting list comments.
 */
export interface GetListCommentsData {
    /**
     * ID of the list.
     */
    listId: string;

    /**
     * Unix timestamp in milliseconds to get comments from a specific date.
     */
    start?: number;

    /**
     * Comment ID to start pagination from.
     */
    startId?: string;
}

/**
 * Data for creating a list comment.
 */
export interface CreateListCommentData {
    /**
     * ID of the list.
     */
    listId: string;

    /**
     * Content of the comment.
     */
    commentText: string;

    /**
     * User ID to assign the comment to.
     */
    assignee: number;

    /**
     * If true, notifications will be sent to everyone including the comment creator.
     */
    notifyAll?: boolean;
}

// Chat View Comments

/**
 * Data for getting chat view comments.
 */
export interface GetChatViewCommentsData {
    /**
     * ID of the Chat view.
     */
    viewId: string;

    /**
     * Unix timestamp in milliseconds to get comments from a specific date.
     */
    start?: number;

    /**
     * Comment ID to start pagination from.
     */
    startId?: string;
}

/**
 * Data for creating a chat view comment.
 */
export interface CreateChatViewCommentData {
    /**
     * ID of the Chat view.
     */
    viewId: string;

    /**
     * Content of the comment.
     */
    commentText: string;

    /**
     * If true, notifications will be sent to everyone including the comment creator.
     */
    notifyAll?: boolean;
}

// General Comment Operations

/**
 * Data for updating a comment.
 */
export interface UpdateCommentData {
    /**
     * ID of the comment to update.
     */
    commentId: string;

    /**
     * New content for the comment.
     */
    commentText: string;

    /**
     * User ID to assign the comment to.
     */
    assignee: number;

    /**
     * Group to assign the comment to.
     */
    groupAssignee?: number;

    /**
     * Mark comment as resolved or not.
     */
    resolved?: boolean;
}

/**
 * Data for getting threaded comments.
 */
export interface GetThreadedCommentsData {
    /**
     * ID of the parent comment.
     */
    commentId: string;
}

/**
 * Data for creating a threaded comment.
 */
export interface CreateThreadedCommentData {
    /**
     * ID of the parent comment.
     */
    commentId: string;

    /**
     * Content of the threaded comment.
     */
    commentText: string;

    /**
     * User ID to assign the comment to (optional).
     */
    assignee?: number;

    /**
     * Group to assign the comment to (optional).
     */
    groupAssignee?: string;

    /**
     * If true, notifications will be sent to everyone including the comment creator.
     */
    notifyAll?: boolean;
}
