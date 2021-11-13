import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";


export class ListTagsService {

  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    /* let tags = await tagsRepositories.find();
    tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` })) */

    const tags = await tagsRepositories.find();


    return classToPlain(tags);
  }
}