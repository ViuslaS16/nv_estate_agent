import './Notification.css';

function Notification({ message, type = 'success' }) {
    const typeClass = type === 'success' ? 'notificationSuccess'
        : type === 'warning' ? 'notificationWarning'
            : 'notificationError';

    return (
        <div className={`notification ${typeClass}`} role="alert">
            <span className="notificationIcon" aria-hidden="true">
                {type === 'success' && '✓'}
                {type === 'warning' && '⚠'}
                {type === 'error' && '✕'}
            </span>
            <span className="notificationMessage">{message}</span>
        </div>
    );
}

export default Notification;
