import ExpressConfig from './express.config.js';

const app = await ExpressConfig();
const PORT = process.env.PORT ?? 3003;

app.listen(Number(PORT), '::', () => {
    console.log(`>> Server running on [::]${PORT} <<`);
});
