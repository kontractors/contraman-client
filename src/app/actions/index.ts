import {coreActions} from './core.actions';
import {clientActions} from './clients.actions';
import {actionRegistry} from "../../features/navigator";

export const registerAllActions = () => {
    const all = [
        ...coreActions,
        ...clientActions,
    ];

    all.forEach(action => {
        actionRegistry.register(action);
    });
};
