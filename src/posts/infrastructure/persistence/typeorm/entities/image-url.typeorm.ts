import {Column} from "typeorm";

export class ImageUrlTypeORM {
  @Column('varchar', {name: 'image_url', length: 1000, nullable: false })
  public image_url: string;

  private constructor(image_url: string) {
    this.image_url = image_url;
  }

  public static from(image_url: string) : ImageUrlTypeORM {
    return new ImageUrlTypeORM(image_url);
  }
}