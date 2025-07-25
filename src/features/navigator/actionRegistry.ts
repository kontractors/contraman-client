import type {JSX} from "react";

export type ActionCategory = 'navigation' | 'create' | 'edit' | 'view' | 'delete' | 'settings' | 'toggle' | 'execute';

interface BaseAction {
    id: string;
    title: string;
    description?: string;
    category: ActionCategory;
    keywords: string[];
    icon?: JSX.Element;
    requiresPermissions?: string[];
    isAvailable?: () => boolean;
}

export interface NavigationAction extends BaseAction {
    type: 'navigation';
    href: string;
}

export interface CommandAction extends BaseAction {
    type: 'command';
    execute: () => void | Promise<void>;
}

export interface ToggleAction extends BaseAction {
    type: 'toggle';
    isToggled: () => boolean;
    onToggle: (isToggled: boolean) => Promise<void>
}

export type Action = NavigationAction | CommandAction | ToggleAction;

class ActionRegistry {
    private actions = new Map<string, Action>();

    register(action: Action) {
        this.actions.set(action.id, action);
    }

    unregister(actionId: string) {
        this.actions.delete(actionId);
    }

    getAll(): Action[] {
        console.log("returning all")
        return [...this.actions.values()];
    }

    search(query: string): Action[] {
        console.log("query ", query);
        if (!query || query.length < 3) return this.getAll();

        const normalized = query.toLowerCase();

        return this.getAll().filter(action => {
            if (action.isAvailable && !action.isAvailable()) return false;

            const content = [action.title, action.description, ...action.keywords].join(' ').toLowerCase();
            return content.includes(normalized);
        });
    }
}

export const actionRegistry = new ActionRegistry();
