import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import Form from '../../../features/form/Form';
import { Photo } from '../../../app/interfaces';

const mockResponse = {
  status: 200,
  type: 'success',
  response: {
    results: [{
      id: 'id',
      urls: {
        regular: 'https://www.imgSrc.com/image1'
      },
      user: {
        username: 'user1',
        name: 'User1',
      },
    } as Photo]
  },
};

const handlers = [
  rest.get('api/photos', (req, res, ctx) =>
    res(ctx.json(mockResponse), ctx.delay(100))),
];

const server = setupServer(...handlers);

describe('Form component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should fetch and receive an image after changing the imput to topic except Other', async () => {
    renderWithProviders(<Form />);

    const select = screen.getByRole('combobox');

    expect(screen.queryByText('User1')).not.toBeInTheDocument();
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'travel' } });

    expect(screen.getByText('Image is loading...')).toBeInTheDocument();
    expect(screen.queryByText('User1')).not.toBeInTheDocument();

    expect(await screen.findByText('User1')).toBeInTheDocument();
  });
});
