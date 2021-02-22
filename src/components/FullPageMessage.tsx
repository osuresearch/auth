import React from 'react';

type Props = {
    title: string
}

const FullPageMessage: React.FC<Props> = ({ title, children }) => {
    // CSS is baked in for now since it's the only component with css
    return (
        <div style={{
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            backgroundColor: '#efefef',
            textAlign: 'center',
            backgroundImage: 'url(https://orapps.osu.edu/assets/img/buckeye-leaf.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '80%',
            backgroundPosition: '5% 15%',
        }}>
            <div className="auth-error-banner" style={{
                borderBottom: '10px solid #BB0000',
                backgroundImage: 'url(https://orapps.osu.edu/assets/img/grey-ohio-banner.jpg)',
                height: 175,
                backgroundPosition: 'center right',
                backgroundSize: '100% auto',
            }}></div>

            <div style={{ padding: '5% 15%' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>{title}</h1>

                {children}
            </div>
        </div>
    );
};

export default FullPageMessage;
