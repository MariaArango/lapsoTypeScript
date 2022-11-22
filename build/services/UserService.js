"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs = require('bcryptjs');
const sql_client_1 = require("../repositories/mysql/sql-client");
const User_1 = require("../models/User");
const UserSchema_1 = require("../models/UserSchema");
const Course_1 = require("../models/Course");
const jwt = require('../services/jwt');
class UserService {
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = yield sql_client_1.client.query('select * from user');
                return results.map((user) => new User_1.User(user));
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getUsersById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield sql_client_1.client.query('select * from user where iduser =?', idUser);
                return new User_1.User(result[0]);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static deleteUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sql_client_1.client.query('delete from user where iduser =?', idUser);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sql_client_1.client.query('update user set username = ?, email = ? where iduser = ?', [user.username, user.email, id]);
                return this.getUsersById(id);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = bcryptjs.genSaltSync(10);
                user.password = yield bcryptjs.hash(user.password, salt);
                const [result] = yield sql_client_1.client.query('insert into user (username, email, password, rol) values (?,?,?,?)', [user.username, user.email, user.password, user.rol]);
                return this.getUsersById(result.insertId);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getUsersByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield sql_client_1.client.query('select * from user where email =?', email);
                return new UserSchema_1.UserSchema(result[0]);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // aca se busca el usuario por email
                const user = yield this.getUsersByEmail(email);
                //si usuario no se encuentra se devuelve un error
                if (!user)
                    throw { msg: 'error en el email o contraseña' };
                //se compara la contraseña
                const passwordSuccess = yield bcryptjs.compare(password, user.password);
                // si no coincide se devuelve un error
                if (!passwordSuccess)
                    throw { msg: '---error en el email o contraseña' };
                const userModel = new User_1.User(user);
                //si coincide se devuelve el token
                return { token: jwt.createToken(userModel, '12h') };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static addCourse(user, course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sql_client_1.client.query('insert into learning (course, user) values (?,?)', [course, user]);
                return true;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCourses(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = yield sql_client_1.client.query('select c.* from course c inner join learning l on c.idcourse = l.course where l.user = ?', id);
                return results.map((course) => new Course_1.Course(course));
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserService = UserService;
