export const configuration = () => ({
    http: {
        port: parseInt(process.env.PORT, 10) || 8080
    },
    auth: {
        jwt: {
            secret_key: 'asdfhasjkdfhaskjfhaskhfaksdhfksajd',
            expire_time: `${2 * 60 * 60}s`
        }
    },
    database: {
        mongodb: {
            host: process.env.DATABASE_HOST || '101.43.146.27',
            port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
            pwd: '@Hxy020414',
            user: 'admin',
            databse_name: 'csms_mislab'
        }
    }
});