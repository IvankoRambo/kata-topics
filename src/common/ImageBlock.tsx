import { ReactElement } from 'react';
import { BaseImage } from '../app/interfaces';
import { URL_PHOTO_STOCK } from '../app/constants';

const ImageBlock = ({
  image: {
    imageSrc,
    user: {
      username,
      name,
    },
  },
} : BaseImage): ReactElement =>
  (
    <>
      <img src={imageSrc} alt="" />
      <div className="author">
        Author:
        <a
          target="_blank"
          rel="noreferrer"
          href={`${URL_PHOTO_STOCK}/@${username}`}>
          {name}
        </a>
      </div>
    </>
  );

export default ImageBlock;
