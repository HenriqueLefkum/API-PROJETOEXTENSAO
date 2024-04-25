const { hash } = require('bcryptjs');
const sqliteConnection = require('../database/sqlite3');
const AppError = require('../utils/AppError');


class UserController{
    async create(request, response){
        const {name , email, password} = request.body;

        const database = await sqliteConnection();
        
        const checkUserExists = await database.get("SELECT * FROM users WHERE EMAIL = (?)", [email]);

        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso!");
        }

        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (? ,? ,?)", [name,email,hashedPassword]);

        return response.status(201).json();
    }
    
    
}

module.exports = UserController;