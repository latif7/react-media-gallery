import request from "./request";
import { UPLOAD_IMAGE, GET_IMAGES, UPDATE_IMAGE, GET_IMAGE } from "./api";

class ImageService {
  async upload(data) {
    return await request.post(UPLOAD_IMAGE, data);
  }

  async getImages(data) {
    return await request.get(GET_IMAGES);
  }
  async updateImage(data) {
    return await request.post(UPDATE_IMAGE, data);
  }
  async getImage(image) {
    return await request.get(GET_IMAGE + "?image=" + image);
  }
}

export default new ImageService();
