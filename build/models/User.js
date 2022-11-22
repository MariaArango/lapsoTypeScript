"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(user) {
        this.id = user.iduser || 0;
        this.username = user.username;
        this.email = user.email;
        this.rol = user.rol;
    }
}
exports.User = User;
