import {
  useState,
  useMemo,
  useEffect,
  useRef,
  ReactElement,
  ChangeEvent,
  memo,
} from 'react';
import { debounce } from 'lodash';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setFirstName,
  setLastName,
  setTopic,
  clearTopic,
  refreshCard,
  searchForPhoto,
  selectInProgressCard,
} from './inProgressCardSlice';
import { addCard } from '../cards/cardsSlice';
import ImageBlock from '../../common/ImageBlock';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { PHOTOS_PER_PAGE } from '../../app/constants';

const ImageBlockMemo = memo(ImageBlock);

const Form = (): ReactElement => {
  const {
    firstName,
    lastName,
    topic,
    image: {
      inited,
      status,
      data: {
        id: imageId = '',
        urls: {
          regular = '',
        } = {},
        user: {
          username = '',
          name = '',
        } = {},
      } = {},
    },
  } = useAppSelector(selectInProgressCard);

  const dispatch = useAppDispatch();
  const [topicSelectValue, setTopicSelectValue] = useState('');
  const textareaTopicInput = useRef<HTMLTextAreaElement>(null);
  const disabledSubmitBtn = !firstName || !lastName || !topic;
  const disabledReSearchBtn = !topic;

  const baseImage = useMemo(() => ({
    id: imageId,
    imageSrc: regular,
    user: {
      username,
      name,
    },
  }), [regular, username, name, imageId]);
  
  const handleInputChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    switch (input.getAttribute('id')) {
      case 'firstName':
        dispatch(setFirstName(input.value));
        break;
      case 'lastName':
        dispatch(setLastName(input.value));
        break;
      default:
        break;
    }
  };

  const handleTextAreaChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    dispatch(setTopic(value));
    if (value) {
      dispatch(searchForPhoto({
        topic: value,
        quantity: PHOTOS_PER_PAGE,
      }));
    }
  };

  const handleTopicChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLSelectElement).value;

    setTopicSelectValue(value);

    if (value !== 'other') {
      dispatch(setTopic(value));
      dispatch(searchForPhoto({
        topic: value,
        quantity: PHOTOS_PER_PAGE,
      }));
    } else {
      dispatch(clearTopic());
    }
  };

  const handlerCardSubmit = () => {
    if (textareaTopicInput.current) {
      textareaTopicInput.current.value = '';
    }

    setTopicSelectValue('');

    dispatch(addCard({
      firstName,
      lastName,
      topic,
      image: baseImage,
    }));

    dispatch(refreshCard());
  };

  const debouncedHandleTextAreaChange =
    useMemo(() => debounce(handleTextAreaChange, 300), []);

  useEffect(() => {
    return () => {
      debouncedHandleTextAreaChange.cancel();
    };
  }, []);

  return (
    <div className="flex-center">
      <div className="form">
        <div className="text-center bold title">Set your card</div>
        <Input
          value={firstName}
          label="Your First Name"
          id="firstName"
          handler={handleInputChange} />
        <Input
          value={lastName}
          label="Your Last Name"
          id="lastName"
          handler={handleInputChange} />
        <div className="flex-center field">
          <label htmlFor="topicSelector">Your Preferred Topic</label>
          <select id="topicSelector" value={topicSelectValue} onChange={handleTopicChange}>
            <option value="" disabled hidden>Choose topic</option>
            <option value="travel">Travel</option>
            <option value="cars">Cars</option>
            <option value="wildlife">Wildlife</option>
            <option value="technology">Technology</option>
            <option value="other">Other</option>
          </select>
        </div>
        {topicSelectValue === 'other' && (
          <div className="flex-center field">
            <label htmlFor="topicTextArea">Type topic name as a free text</label>
            <textarea
              id="topicTextArea"
              ref={textareaTopicInput}
              onChange={debouncedHandleTextAreaChange} />
          </div>
        )}
        {status === 'loading' && (
          <div className="text-center field">
            Image is loading...
          </div>
        )}
        {status === 'failed' && (
          <div className="text-center errored field">
            Server error. Please retry...
          </div>
        )}
        {inited && status === 'idle' && (
          <>
            {!imageId ? (
              <div className="text-center errored errored field">
                For some reason no image is returned. Please retry...
              </div>
            ): (
              <div className="flex-center column field">
                <ImageBlockMemo image={baseImage} />
                <div className="btnsContainer">
                  <Button
                      value="Accept"
                      className="primary"
                      disabled={disabledSubmitBtn}
                      handler={handlerCardSubmit} />
                  <Button
                      className="secondary"
                      value="Reject"
                      disabled={disabledReSearchBtn}
                      handler={() => dispatch(searchForPhoto({
                        topic,
                        quantity: PHOTOS_PER_PAGE,
                      }))} />
                </div>
              </div>
            )}
          </>
        )}
        {(status === 'failed' || (inited && !imageId && status === 'idle')) && (
          <div className="flex-center btnContainer">
              <Button
                value="Retry"
                className="secondary"
                disabled={disabledReSearchBtn}
                handler={() => dispatch(searchForPhoto({
                  topic,
                  quantity: PHOTOS_PER_PAGE,
                }))} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
