
import React, { useState } from 'react';
import useIdentity from '../hooks/useIdentity';
import useEmulation from '../hooks/useEmulation';

/**
 * Component to test the different authentication features
 */
function TestAuth() {
    const { user, logout, verifyLogin } = useIdentity();
    const { emulate, active, allowed } = useEmulation();
    const [loading, setLoading] = useState(false);

    const testVerify = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        console.log('Start verifier');
        await verifyLogin();
        
        // do your other (a)sync work here
        alert('Verified');

        setLoading(false);
    };

    return (
        <div className="test-auth">
            <p>Test functionality of auth components</p>

            <p>Current user is {user?.username || 'not logged in'}</p>

            <p>Emulate is {active ? 'active' : 'not active'} / {allowed ? 'allowed' : 'not allowed'}</p>
            
            <button onClick={testVerify}>
                {loading && 'Loading'}
                {!loading && 'Test Verify'}
            </button>

            <button onClick={() => emulate('93111472')}>Emulate John</button>
            <button onClick={() => emulate()}>Clear emulate</button>
            
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default TestAuth;

