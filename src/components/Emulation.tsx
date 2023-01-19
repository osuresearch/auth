
import React, { useState } from 'react';

// PersonSearchResult is missing from the index.d.ts file for osuresearch/ui
// This will eventually be fixed once the UI project moves to Typescript.
// @ts-ignore
import { Search, PersonSearchResult } from '@osuresearch/ui';

import useIdentity from '../hooks/useIdentity';
import useEmulation from '../hooks/useEmulation';
import Modal from '../internal/Modal';

export interface Props {
    /**
     * API endpoint for looking up possible users to emulate.
     *
     * Defaults to the ORIS API to provide all users. May be
     * overridden if there's only a subset of whitelisted users
     * for a particular application.
     */
    lookupEndpoint?: string;

    /**
     * Key used for storing emulation history locally for
     * quick access to previously emulated users.
     */
    localStorageKey?: string;

    /**
     * Class names to apply to the button that toggles the modal
     */
    className?: string;
};

interface EmulationHistoryData {
    id: string;
    name: string;
}

function getEmulationHistory(localStorageKey: string): EmulationHistoryData[] {
    const localStorage = window.localStorage.getItem(localStorageKey);

    if (localStorage) {
        return JSON.parse(localStorage);
    }

    return [];
}

function addToEmulationHistory(localStorageKey: string, value: EmulationHistoryData) {
    const people = getEmulationHistory(localStorageKey);
    const matches = people.filter((item) => item.id === value.id);

    // If they're already in recent history, do nothing
    if (matches.length) {
        return;
    }

    // Insert the new person into local storage
    people.push(value);

    // Only show the last N individuals emulated
    if (people.length > 4) {
        people.shift();
    }

    window.localStorage.setItem(localStorageKey, JSON.stringify(people));
}

const Emulation: React.FC<Props> = ({
    lookupEndpoint = 'https://orapps.osu.edu/api/v1/person',
    localStorageKey = 'emulation-history',
    className = 'btn btn-danger'
}) => {
    const [showModal, setShowModal] = useState(false);

    const { user } = useIdentity();
    const { emulate, active, allowed } = useEmulation();

    const history = getEmulationHistory(localStorageKey);

    // onChange handler for oris/ui Search.
    const onEmulate = (e: any) => {
        const person = {
            id: e.target.value.key,
            name: e.target.value.value
        };

        if (person.id) {
            addToEmulationHistory(localStorageKey, person);
            emulate(person.id);
        }
    };

    const onClearEmulation = () => emulate();

    // If emulation isn't available, just don't render anything at all.
    if (!allowed) return null;

    // Can't nest Modal inside of button - the button's onClick will fire
    // when anything is clicked in the modal - causing showModal to always be true.
    return (
    <>
        <button className={className} onClick={() => setShowModal(true)}>
            Emulate
        </button>

        <Modal title="Emulate"
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <div className="modal-body">
                <Search
                    name="emulate-user-lookup"
                    endpoint={lookupEndpoint}
                    hasClearButton={false}
                    onChange={onEmulate}
                    resultComponent={PersonSearchResult}
                />

                {active && user &&
                    <small className="form-text">
                        Currently emulating <strong>{user.username}. </strong>

                        <button className="btn-link" onClick={onClearEmulation}>
                            Click to clear emulation.
                        </button>
                    </small>
                }

                <div className="emulate-history">
                    {history.map((item) =>
                        <span key={item.id}> <a href="#" className="badge badge-secondary"
                            onClick={() => emulate(item.id)}>
                            {item.name}
                        </a></span>
                    )}
                </div>
            </div>
        </Modal>
    </>
    );
}

export default Emulation;
