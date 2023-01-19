
import React, { createRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export type Props = {
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
 * This is an updated non-compatible version of the @osuresearch/ui Modal
 * that is more React friendly. Eventually moved into @osuresearch/ui.
 */
const Modal: React.FC<Props> = ({
    onRequestClose,
    title,
    className = '',
    isOpen = false,
    hasCloseButton = true,
    children 
}) => {
    const ref = createRef<HTMLDivElement>();

    // Sanity check for invalid prop combinations
    if (hasCloseButton && !onRequestClose) {
        throw new Error(
            'Modal cannot have a close button without a `onRequestClose` callback'
        );
    }

    useEffect(() => {
        // @ts-ignore 
        const $el = window.$(ref.current);

        $el.modal({
            // Disable the user's ability to close this modal.
            // We'll use a custom close mechanic that integrates
            // better with React.
            keyboard: false,
            backdrop: 'static',
            show: false
        });
    }, [ref]);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        // @ts-ignore 
        const $el = window.$(ref.current);

        if (isOpen) {
            $el.modal('show');
        } else {
            $el.modal('hide');
        }

    }, [ref, isOpen]);

    return createPortal(
        <div className="modal fade" 
            tabIndex={-1} 
            role="dialog"
            aria-hidden="true" ref={ref}
        >
            <div className={`modal-dialog ${className}`} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {title}
                        </h5>

                        {(hasCloseButton && onRequestClose) &&
                        <button type="button" 
                            className="close"
                            aria-label="Close"
                            onClick={onRequestClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button> 
                        }
                    </div>

                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
