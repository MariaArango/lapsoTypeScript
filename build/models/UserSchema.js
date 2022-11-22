"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
class UserSchema {
    constructor(user) {
        this.iduser = user.iduser;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.rol = user.rol;
    }
}
exports.UserSchema = UserSchema;
