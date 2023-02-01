import { MouseEvent, ChangeEvent } from 'react';

type Statuses = 'idle' | 'loading' | 'failed';

interface BaseCard {
  firstName: string;
  lastName: string;
  topic: string;
}

export interface BaseImage {
  image: {
    id: string;
    imageSrc: string;
    user: {
      username: string;
      name: string;
    }; 
  }
}

export interface GenericObject {
  [key: string]: any;
}

 export interface Photo {
  id: string;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
}

export interface InProgressCard extends BaseCard {
  image: {
    data?: Photo;
    status: Statuses;
    inited: boolean;
  };
}

export interface Card extends BaseCard, BaseImage {}

export interface ButtonProps {
  value: string;
  handler: (event?: MouseEvent) => void;
  disabled: boolean;
  className?: string;
}

export interface InputProps {
  value?: string;
  handler: (event: ChangeEvent) => void;
  label: string;
  id: string;
  type?: string;
}

