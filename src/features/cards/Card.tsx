import { ReactElement } from 'react';
import { upperFirst } from 'lodash';
import { Card as CardProps } from '../../app/interfaces';
import ImageBlock from '../../common/ImageBlock';

const Card = ({
  card: {
    firstName,
    lastName,
    topic,
    image,
  }
}: { card: CardProps }): ReactElement =>
  (
    <div className="card flex-center column">
      <ImageBlock image={image} />
      <span className="span-field">
        First Name: <span className="bold">{firstName}</span>
      </span>
      <span className="span-field">
        Last Name: <span className="bold">{lastName}</span>
      </span>
      <span className="span-field">
        Topic: <span className="bold">{upperFirst(topic)}</span>
      </span>
    </div>
  );

export default Card;
