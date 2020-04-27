
import React, { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface Props {
    keyboard?: boolean;
    backdrop?: string;
}

/**
 * Wrapper around Bootstrap 4 Modals
 */
const Modal: React.FC<Props> = ({ keyboard, backdrop, children }) => {
    const ref = createRef<HTMLDivElement>();

    // window.$(this.ref.current).modal('hide');

    useEffect(() => {
        // @ts-ignore 
        window.$(ref.current).modal({
            keyboard,
            backdrop
        });

        return () => {
            // @ts-ignore
            window.$(ref.current).modal('hide');
        }
    }, [ref, keyboard, backdrop]);

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
