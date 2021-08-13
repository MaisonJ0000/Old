import Cropper from 'cropperjs';

const image = `<div>
  <img id="image" src='https://dable-public.s3-ap-northeast-1.amazonaws.com/ad/thumbnails/library-dev/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2020-07-12+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+12.51.31.png'>
</div>`;
const cropper = new Cropper(image, {
  crop(event) {
    console.log(event.detail.x);
    console.log(event.detail.y);
    console.log(event.detail.width);
    console.log(event.detail.height);
    console.log(event.detail.rotate);
    console.log(event.detail.scaleX);
    console.log(event.detail.scaleY);
  },
});
