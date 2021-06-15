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
exports.processUpload = void 0;
const fs_1 = require("fs");
const nanoid_1 = require("nanoid");
const mime_types_1 = require("mime-types");
const mkdirp_1 = __importDefault(require("mkdirp"));
const storeUpload = ({ createReadStream, mimetype, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield mkdirp_1.default(`public/images/${userId}`).then(made => {
        if (!made) {
            console.log('UNSUCSESS', made);
        }
        else {
            console.log('SUCSESSSSS', made);
        }
    });
    const name = `${nanoid_1.nanoid(10)}.${mime_types_1.extension(mimetype)}`;
    const path = `public/images/${userId}/${name}`;
    return new Promise((resolve, reject) => createReadStream()
        .pipe(fs_1.createWriteStream(path))
        .on("finish", () => resolve({ name }))
        .on("error", () => reject));
});
const processUpload = (upload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield upload;
    let pictureUrl = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const { createReadStream, mimetype } = yield file;
        const { name } = yield storeUpload({ createReadStream, mimetype, userId });
        return name;
    })));
    return pictureUrl;
});
exports.processUpload = processUpload;
//# sourceMappingURL=processImage.js.map