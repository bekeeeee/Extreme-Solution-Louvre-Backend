"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneArtDto = void 0;
class GetOneArtDto {
    constructor(id) {
        this.id = id;
    }
    static from(body) {
        if (!body.id) {
            throw new Error("missing id property");
        }
        return new GetOneArtDto(body.id);
    }
}
exports.GetOneArtDto = GetOneArtDto;
