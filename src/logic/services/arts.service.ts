import { ArtsRepository } from "@data/art/arts.repository";
import { ArtDto } from "@logic/dto/arts";
import { CreateArtDto } from "@logic/dto/arts/create-art.dto";
import { injectable } from "inversify";

@injectable()
export class ArtsService {
  constructor(private readonly _artsRepo: ArtsRepository) {}

  async create(createArtDto: CreateArtDto) {
    const createdArt = await this._artsRepo.create(createArtDto);
    return ArtDto.from(createdArt);
  }

  async all() {
    const subscribers = await this._artsRepo.all();
    return ArtDto.fromMany(subscribers);
  }
}
