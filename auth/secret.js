module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'keep it safe' //environment or hardoceded development secret not good for production
}