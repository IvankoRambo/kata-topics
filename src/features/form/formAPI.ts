import { Photo, GenericObject } from '../../app/interfaces';
import { URL_GET_PHOTOS } from '../../app/constants';

const getPhotos = async (paramsObjArg?: GenericObject): Promise<{
  status: number;
  type: string;
  response?: {
    results: Photo[];
  };
  errors?: string[];
}> => {
  const paramsObj: GenericObject = paramsObjArg || {};
  const params = new URLSearchParams();
  Object.keys(paramsObj).forEach((key) => params.append(key, paramsObj[key].toString()));

  const response = await fetch(`${URL_GET_PHOTOS}?${params}`, {
    method: 'GET',
  });

  return response.json();
};

export {
  getPhotos,
};
