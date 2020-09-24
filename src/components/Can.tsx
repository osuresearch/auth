
import React, { Children } from 'react';
import { IHasPolicies } from '../types';
import { useIdentity } from '..';

type Props = {
    /**
     * The policy or permission name to test against
     */
    do: string

    /** 
     * Contextual object to check for a matching policy. 
     * 
     * If not supplied, this component will check `do` against the 
     * logged in user's policies and permissions. 
     */
    on?: IHasPolicies
}

/**
 * Check against policies and permissions before rendering children.
 * 
 * If `on` is not provided, the authenticated user's policies and
 * permissions are checked for a match to `do`. 
 * 
 * If `on` is provided, the policies declared in the `on` object
 * will be checked for a match to `do`.
 */
const Can: React.FC<Props> = (props)  => {
    const { can } = useIdentity();

    if (!can(props.do, props.on)) {
        return null;
    }

    return (
        <>{props.children}</>
    );
}

export default Can;
