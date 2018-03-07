import setup from './app';

const startServer = async () => {
    const app = await setup();
    app.listen(3000, () => {
        console.log('PORT AT 3000');
    });
}

startServer();