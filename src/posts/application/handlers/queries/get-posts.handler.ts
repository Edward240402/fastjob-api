import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPostsQuery } from "../../queries/get-posts.query";
import { getManager } from "typeorm";
import { GetPostsDto } from "../../dtos/queries/get-posts.dto";

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor() {}

  async execute(query: GetPostsQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      employee_id,
      publish_date,
      image_url,
      text,
      job
    FROM 
      posts
    ORDER BY
      id;`;

    const ormPosts = await manager.query(sql);
    if(ormPosts.length <= 0) {
      return [];
    }

    const posts: GetPostsDto[] = ormPosts.map(function(ormPost) {
      let postDto = new GetPostsDto();
      postDto.id = Number(ormPost.id);
      postDto.employeeId = Number(ormPost.employee_id);
      postDto.publishDate = ormPost.publish_date;
      postDto.imageUrl = ormPost.image_url;
      postDto.text = ormPost.text;
      postDto.jobType = ormPost.job;
      return postDto;
    });
    return posts;
  }
}