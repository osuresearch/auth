
import React, { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Wrapper around Bootstrap 4 Modals
 */
const Modal: React.FC = ({ children }) => {
    const ref = createRef<HTMLDivElement>();

    useEffect(() => {
        // @ts-ignore 
        window.$(ref.current).modal({
            // Disable the user's ability to close this modal
            keyboard: false,
            backdrop: 'static'
        });

        return () => {
            // @ts-ignore
            window.$(ref.current).modal('hide');
        }
    }, [ref]);

    return createPortal(
        <div className="modal fade" tabIndex={-1} role="dialog"
            aria-hidden="true" ref={ref}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
