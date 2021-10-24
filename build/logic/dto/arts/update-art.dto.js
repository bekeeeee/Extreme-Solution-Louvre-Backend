"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArtDto = void 0;
const validate_1 = require("../utils/validate");
class UpdateArtDto {
    constructor(id, image, description, artist) {
        this.id = id;
        this.image = image;
        this.description = description;
        this.artist = artist;
    }
    static from(body) {
        if (!body.id) {
            throw new Error("missing id property");
        }
        if (body.image) {
            validate_1.Validate.validateSize(body.image, 5, "image");
        }
        if (body.artist) {
            validate_1.Validate.validateSize(body.artist, 5, "artist");
        }
        if (body.description) {
            validate_1.Validate.validateSize(body.description, 5, "description");
        }
        return new UpdateArtDto(body.id, body.image, body.description, body.artist);
    }
}
exports.UpdateArtDto = UpdateArtDto;
