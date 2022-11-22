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
exports.UserController = void 0;
const Rol_1 = require("../models/Rol");
const UserSchema_1 = require("../models/UserSchema");
const UserService_1 = require("../services/UserService");
class UserController {
    static getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserService_1.UserService.getUsers();
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = Number(req.params.id);
                const data = yield UserService_1.UserService.getUsersById(idUser);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = Number(req.params.id);
                yield UserService_1.UserService.deleteUser(idUser);
                res.status(204).json();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body;
                const idUser = Number(req.params.id);
                const user = req.body;
                const data = yield UserService_1.UserService.updateUser(idUser, user);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new UserSchema_1.UserSchema(req.body);
                user.rol = Rol_1.rol.admin;
                const data = yield UserService_1.UserService.createUser(user);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new UserSchema_1.UserSchema(req.body);
                user.rol = Rol_1.rol.user;
                const data = yield UserService_1.UserService.createUser(user);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const data = yield UserService_1.UserService.login(email, password);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static addCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { course } = req.body;
            const user = req.body.userlogued.id;
            try {
                const data = yield UserService_1.UserService.addCourse(course, user);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body.userlogued.id;
            console.log(user);
            try {
                const data = yield UserService_1.UserService.getCourses(user);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updatePerfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.body.userlogued.id;
                const user = req.body;
                const data = yield UserService_1.UserService.updateUser(idUser, user);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserController = UserController;
