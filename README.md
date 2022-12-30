# react-error

Base error components that support React and React native

## Installation

> yarn add @bearei/react-error --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| defaultImage | `ReactNode` | ✘ | Default image of error page |
| title | `ReactNode` | ✘ | Error page title |
| tip | `ReactNode` | ✘ | Error page alert message |
| button | `ReactNode` | ✘ | Error page custom button |
| buttonText | `string` | ✘ | Error page button text |
| onClick | `(e: React.MouseEvent) => void` | ✘ | This function is called when button is clicked |
| onTouchEnd | `(e: React.TouchEvent) => void` | ✘ | This function is called when the button is pressed |
| onPress | `(e: GestureResponderEvent) => void` | ✘ | This function is called when the button is pressed -- react native |
| renderMain | `(props: ErrorMainProps) => ReactNode` | ✔ | Render the error main |
| renderContainer | `(props: ErrorContainerProps) => ReactNode` | ✔ | Render the error container |

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Icon from '@bearei/react-error';

const error = (
  <Error
    renderMain={() => <i>{'error'}</i>}
    renderContainer={({ id, children }) => <div>{children}</div>}
  />
);

ReactDOM.render(error, container);
```
