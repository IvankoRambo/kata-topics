import { ReactElement, memo } from 'react';
import { selectCards } from './cardsSlice';
import { useAppSelector } from '../../app/hooks';
import Card from './Card';
import { Card as Item } from '../../app/interfaces';

const CardMemo = memo(Card, (
  { card: prevCard }: { card: Item },
  { card: nextCard }: { card: Item }
): boolean => {
  return prevCard.image.id === nextCard.image.id;
});

const Cards = (): ReactElement | null => {
  const cards = useAppSelector(selectCards);

  //Used index as key for now as list is not reordered
  return <>
    {cards.length > 0 ? (
      <div className="flex-stretch">
        {cards.map((card, index) =>
          <CardMemo card={card} key={index} />)}
      </div>
    ) : null}
  </>;
};

export default Cards;
