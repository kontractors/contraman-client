import {Users, Plus} from 'lucide-react';
import type {NavigationAction} from "../../features/navigator";

export const clientActions: NavigationAction[] = [
    {
        id: 'nav.clients',
        title: 'View Clients',
        description: 'Manage your client list',
        category: 'navigation',
        keywords: ['clients', 'customers'],
        type: 'navigation',
        href: '/clients',
        icon: <Users className="w-4 h-4"/>,
    },
    {
        id: 'create.client',
        title: 'Create New Client',
        description: 'Add a new client to your business',
        category: 'create',
        keywords: ['add', 'client', 'new'],
        type: 'navigation',
        href: '/clients/new',
        icon: <Plus className="w-4 h-4"/>,
    },
];
