import {
  bindEvents,
  handleDefaultEvent,
} from '@bearei/react-util/lib/commonjs/event';
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
  TouchEvent,
} from 'react';
import { useId } from 'react';
import type { GestureResponderEvent, ViewProps } from 'react-native';

/**
 * Base error props
 */
export interface BaseErrorProps<T>
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<T>, T> & ViewProps,
    'title' | 'onClick' | 'onTouchEnd' | 'onPress'
  > {
  /**
   * Custom ref
   */
  ref?: Ref<T>;

  /**
   * Default image of error page
   */
  defaultImage?: ReactNode;

  /**
   * Error page title
   */
  title?: ReactNode;

  /**
   * Error page alert message
   */
  tip?: ReactNode;

  /**
   * Error page custom button
   */
  button?: ReactNode;

  /**
   * Error page button text
   */
  buttonText?: string;

  /**
   * This function is called when button is clicked
   */
  onClick?: (e: MouseEvent<T>) => void;

  /**
   * This function is called when the button is pressed
   */
  onTouchEnd?: (e: TouchEvent<T>) => void;

  /**
   * This function is called when the button is pressed -- react native
   */
  onPress?: (e: GestureResponderEvent) => void;
}

/**
 * Error props
 */
export interface ErrorProps<T> extends BaseErrorProps<T> {
  /**
   * Render the error main
   */
  renderMain: (props: ErrorMainProps<T>) => ReactNode;

  /**
   * Render the error container
   */
  renderContainer: (props: ErrorContainerProps<T>) => ReactNode;
}

/**
 * Error children props
 */
export interface ErrorChildrenProps<T> extends Omit<BaseErrorProps<T>, 'ref'> {
  /**
   * Component unique ID
   */
  id: string;
  children?: ReactNode;
}

export type ErrorMainProps<T> = ErrorChildrenProps<T> &
  Pick<BaseErrorProps<T>, 'ref'>;

export type ErrorContainerProps<T> = ErrorChildrenProps<T>;
export type EventType = 'onClick' | 'onPress' | 'onTouchEnd';

const Error = <T extends HTMLElement = HTMLElement>(props: ErrorProps<T>) => {
  const {
    ref,
    onClick,
    onPress,
    onTouchEnd,
    renderMain,
    renderContainer,
    ...args
  } = props;

  const id = useId();
  const bindEvenNames = ['onClick', 'onPress', 'onTouchEnd'];
  const eventNames = Object.keys(props).filter(key =>
    bindEvenNames.includes(key),
  ) as EventType[];

  const childrenProps = { ...args, id };
  const handleResponse = <E,>(e: E, callback?: (e: E) => void) => {
    callback?.(e);
  };

  const handleCallback = (event: EventType) => {
    const eventFunctions = {
      onClick: handleDefaultEvent((e: MouseEvent<T>) =>
        handleResponse(e, onClick),
      ),
      onTouchEnd: handleDefaultEvent((e: TouchEvent<T>) =>
        handleResponse(e, onTouchEnd),
      ),
      onPress: handleDefaultEvent((e: GestureResponderEvent) =>
        handleResponse(e, onPress),
      ),
    };

    return eventFunctions[event];
  };

  const main = renderMain({
    ...childrenProps,
    ref,
    ...(bindEvents(eventNames, handleCallback) as {
      onClick?: (e: MouseEvent<T>) => void;
      onTouchEnd?: (e: TouchEvent<T>) => void;
      onPress?: (e: GestureResponderEvent) => void;
    }),
  });

  const container = renderContainer({ ...childrenProps, children: main });

  return <>{container}</>;
};

export default Error;
