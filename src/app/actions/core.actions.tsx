import {Settings} from "lucide-react";
import type {ToggleAction} from "../../features/navigator";

export const coreActions: ToggleAction[] = [
    {
        id: 'toggle.darkmode',
        title: 'Toggle Dark Mode',
        description: 'Switch between light and dark themes',
        category: 'toggle',
        keywords: ['dark', 'theme', 'mode'],
        type: 'toggle',
        isToggled: () => document.documentElement.classList.contains('dark'),
        icon: <Settings className="w-4 h-4"/>,
        onToggle: (value: boolean): Promise<void> => {
            document.documentElement.classList.toggle('dark', !value);
            return Promise.resolve();
        }
    }
];
