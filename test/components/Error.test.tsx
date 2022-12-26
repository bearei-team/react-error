import '@testing-library/jest-dom';
import React from 'react';
import Error from '../../src/components/Error';
import { render } from '../utils/testUtils';
import userEvent from '@testing-library/user-event';

describe('test/components/Error.test.ts', () => {
  test('It should be a render error', async () => {
    const { getByDataCy } = render(
      <Error
        renderMain={() => <i data-cy="error">{'error'}</i>}
        renderContainer={({ id, children }) => (
          <div data-cy="container" data-id={id} tabIndex={1}>
            {children}
          </div>
        )}
      />,
    );

    expect(getByDataCy('container')).toHaveAttribute('tabIndex');
    expect(getByDataCy('error')).toHaveTextContent('error');
  });

  test('It should be a error click', async () => {
    const user = userEvent.setup();
    let eventType!: string | undefined;

    const { getByDataCy } = render(
      <Error
        onClick={e => (eventType = e?.type)}
        renderMain={({ onClick }) => (
          <i onClick={onClick} data-cy="error">
            {'error'}
          </i>
        )}
        renderContainer={({ id, children }) => (
          <div data-cy="container" data-id={id} tabIndex={1}>
            {children}
          </div>
        )}
      />,
    );

    await user.click(getByDataCy('error'));
    expect(eventType).toEqual('click');
  });
});
