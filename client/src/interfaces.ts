export interface TodoItem {
    _id: string;
    createdAt: string;
    description: string;
    done: boolean;
    updatedAt: string;
}

export interface TodoList {
    items: TodoItem[] | [];
    meta: {
        hasNextPage: boolean;
        hasPrevPage: boolean;
        itemCount: number;
        limit: number;
        nextPage: number | null;
        offset: number;
        page: number;
        pageCount: number;
        prevPage: number | null;
    }
}

export enum TimeUnits {
    day = 'day',
    hour = 'hour',
    minute = 'minute'
}

export type PaginationSteps = {
    nextPage: string;
    prevPage: string;

}

// export { TodoItem, TodoList, TimeUnits };
