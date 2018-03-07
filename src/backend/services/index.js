import LoggerService from './Logger';
import NotificationService from './Notification';

function setupAllServices(db) {
    return function() {
        const app = this;
        app
        .configure(LoggerService(db))
        .configure(NotificationService(db));
    }
}

export default setupAllServices;