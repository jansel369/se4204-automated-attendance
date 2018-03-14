import LoggerService from './Logger';
import StudentService from './Student';
import CustomService from './custom';



function setupAllServices(db) {
    return function() {
        const app = this;
        app
            .configure(new CustomService(db))
            .configure(LoggerService(db))
            .configure(StudentService(db));
    }
}

export default setupAllServices;