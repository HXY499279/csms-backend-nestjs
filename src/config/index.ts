export const configuration = () => ({
    http: {
        port: parseInt(process.env.PORT, 10) || 3000
    },
    auth: {
        jwt: {
            secret_key: 'asdfhasjkdfhaskjfhaskhfaksdhfksajd',
            expire_time: `${2 * 60 * 60}s`
        }
    },
    database: {
        mysql: {
            host: process.env.DATABASE_HOST || '101.43.27.216',
            port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
            pwd: '870903-pw',
            user: 'root',
            databse_name: 'zqj'
        }
    }
});