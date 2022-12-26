# react-icon

Base icon components that support React and React native

## Installation

> yarn add @bearei/react-icon --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| size | `small` `medium` `large` | ✘ | Icon size |
| width | `string` `number` | ✘ | Icon width |
| height | `string` `number` | ✘ | Icon height |
| fill | `string` | ✘ | Icon fill color |
| content | `ReactNode` | ✘ | Icon content |
| renderMain | `(props: IconMainProps) => ReactNode` | ✔ | Render the icon main |
| renderContainer | `(props: IconContainerProps) => ReactNode` | ✔ | Render the icon container |

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Icon from '@bearei/react-icon';

const icon = (
  <Icon
    renderMain={() => <i>{'icon'}</i>}
    renderContainer={({id, children}) => (
      <div data-id={id} tabIndex={1}>
        {children}
      </div>
    )}
  />
);

ReactDOM.render(icon, container);
```
