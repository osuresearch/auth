
import React, { Children } from 'react';
import { useIdentity } from '..';

/**
 * Interface for an object that contains one or more attached policies
 */
interface IHasPolicies {
    policies: string[]
}

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
    const { user } = useIdentity();

    let allowed = false;

    if (typeof props.on !== 'undefined') {
        allowed = props.on.policies.indexOf(props.do) >= 0;
    } else if (user) {
        // TODO: policies in @oris/auth user model. For now, we unsafely hack it in.
        allowed = user.permissions.indexOf(props.do) >= 0
                || (user as any as IHasPolicies).policies.indexOf(props.do) >= 0;
    }

    if (!allowed) {
        return null;
    }

    return (
        <>{props.children}</>
    );
}

export default Can;
