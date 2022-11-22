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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = 'H98DFADmdfadfe8987';
const whiteList = ['/user/login', '/user/register'];
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!whiteList.includes(req.originalUrl)) {
            if (!req.header('Authorization')) {
                res
                    .status(401)
                    .json({ msg: 'la petición no tiene cabecera de Autenticación' });
            }
            else {
                const token = ((_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '')) || '';
                const tokenDecode = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
                req.body.userlogued = tokenDecode;
                next();
            }
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(400).json({ msg: 'token invalido' });
    }
});
exports.auth = auth;
