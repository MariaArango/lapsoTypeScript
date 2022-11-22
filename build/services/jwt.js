"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'H98DFADmdfadfe8987';
function createToken(user, expiresIn) {
    const { id, email, rol } = user;
    const payload = { id, email, rol };
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
}
exports.createToken = createToken;
function decodeToken(token) {
    return jsonwebtoken_1.default.verify(token, SECRET_KEY);
}
exports.decodeToken = decodeToken;
// module.exports = {
//   createToken,
//   decodeToken,
// };
