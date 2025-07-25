import {useMemo, useRef, useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {closePalette} from './navigatorSlice.ts';
import {type Action, actionRegistry} from './actionRegistry.ts';
import {CircleDashed, Search} from 'lucide-react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    useDisclosure, Listbox, ListboxItem, addToast, Switch
} from '@heroui/react'; // Adjust the import path if different

export const Navigator = ({onNavigate}: { onNavigate?: (href: string) => void }) => {
    const isOpen = useAppSelector(state => state.commandPalette.isOpen)
    const {onOpenChange} = useDisclosure();

    const dispatch = useAppDispatch();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const results = useMemo(() => actionRegistry.search(query), [query]);

    useEffect(() => {
        if (isOpen) {
            console.log("open");
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100); // Delay to ensure modal is rendered
        }
    }, [isOpen]);

    const execute = async (action: Action) => {
        try {
            switch (action.type) {
                case 'navigation':
                    if (action.href) onNavigate?.(action.href);
                    break;

                case 'command':
                    if (action.execute) await action.execute();
                    break;

                case 'toggle':
                    if (action.onToggle && action.isToggled) {
                        await action.onToggle(action.isToggled());
                    }
                    break;

                default:
                    return;
            }

            if (action.type !== 'navigation') {
                addToast({
                    title: action.title,
                    description: action.type + ' Action completed successfully.',
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: 'success',
                });
            }
            dispatch(closePalette());
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Action failed';
            console.error('Action failed:', error);

            addToast({
                title: action.title,
                description: message,
                color: 'warning',
            });
        }
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selectedIndex]) {
                execute(results[selectedIndex]).then(() => console.log(results[selectedIndex].title));
            }
        } else if (e.key === 'Escape') {
            dispatch(closePalette());
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={() => dispatch(closePalette())} size="lg" backdrop="opaque"
               classNames={{
                   backdrop: "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
               }}>
            <ModalContent>
                <ModalHeader className={"flex flex-col gap-2 bg-[hsl(var(--heroui-content3))]"}>
                    <p className={"text-sm text-[hsl(var(--heroui-content4-foreground))]"}>
                        Search anything!
                    </p>
                    <Input
                        ref={inputRef}
                        variant={"flat"}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Search actions..."
                        startContent={<Search size={18}/>}
                        autoFocus
                        isClearable={true}
                        onClear={() => setQuery('')}
                    />
                </ModalHeader>
                <ModalBody className={"p-0"}>
                    {results.length === 0 ? (
                        <p className={"text-center text-muted-foreground font-semibold"}>
                            No actions found for "{query}"
                        </p>
                    ) : (
                        <Listbox style={{overflowY: 'auto'}} selectedKeys={[results[selectedIndex].id]}
                                 className={"p-0"}
                                 variant={"solid"}
                                 itemClasses={{
                                     base: "rounded-none gap-3 h-12",
                                 }}
                        >
                            {results.map((action, index) => {
                                return (
                                    <ListboxItem
                                        key={action.id}
                                        onClick={() => execute(action)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={"px-5"}
                                        startContent={action.icon || <CircleDashed/>}
                                        description={action.description}
                                        endContent={
                                            action.type === 'toggle' &&
                                            <Switch color={"success"} size="sm" onValueChange={()=>execute(action)} isSelected={action.isToggled()}/>
                                        }
                                    >
                                        {action.title}
                                    </ListboxItem>
                                );
                            })}
                        </Listbox>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
