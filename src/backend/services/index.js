import LoggerService from './Logger';
import NotificationService from './Notification';
import CustomService from './custom';



function setupAllServices(db) {
    return function() {
        const app = this;
        app
            .configure(new CustomService(db))
        // .configure(LoggerService(db))
        // .configure(NotificationService(db));
    }
}

export default setupAllServices;