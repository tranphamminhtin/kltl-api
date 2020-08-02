module.exports = {
    apps: [{
        name: "api",
        script: "node index",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}