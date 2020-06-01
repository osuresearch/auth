import React from 'react';
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
}
declare const Emulation: React.FC<Props>;
export default Emulation;
//# sourceMappingURL=Emulation.d.ts.map