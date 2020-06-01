import React from 'react';
export declare type Props = {
    className?: string;
    /**
     * Title to display in the header of the modal.
     */
    title: string;
    /**
     * Should the modal be displayed as open
     */
    isOpen?: boolean;
    /**
     * When the user requests the modal be closed (e.g. via the X button).
     *
     * The modal will not be closed automatically, but instead request
     * that the parent component decide whether or not to allow it to be
     * closed by updating the `isOpen` prop.
     *
     * Must be set if `hasCloseButton` is true.
     */
    onRequestClose?(): void;
    /**
     * Should the modal provide a close button to the user (defaults to `true`)
     */
    hasCloseButton?: boolean;
};
/**
 * Wrapper around Bootstrap 4 Modals.
 *
 * This is an updated non-compatible version of the @oris/ui Modal
 * that is more React friendly. Eventually moved into @oris/ui.
 */
declare const Modal: React.FC<Props>;
export default Modal;
//# sourceMappingURL=Modal.d.ts.map