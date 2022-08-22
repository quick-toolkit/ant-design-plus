import { Card, CardProps, Result, ResultProps } from 'antd';
import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';

/**
 * Card 组件
 * @param props
 * @constructor
 */
export function PlusCard<T>(props: PlusCardProps<T>) {
  const { response, children, getResultProps, ...rest } = props;

  if (response) {
    switch (response.status) {
      case 200:
        return <Card children={children(response.data)} {...rest} />;
      case 403:
        return (
          <Card {...rest}>
            <Result
              title="403"
              subTitle="Forbidden"
              {...(getResultProps ? getResultProps(response.status) : {})}
              status={403}
            />
          </Card>
        );
      case 404:
        return (
          <Card {...rest}>
            <Result
              title="404"
              subTitle="Page not found"
              {...(getResultProps ? getResultProps(response.status) : {})}
              status={404}
            />
          </Card>
        );
      default:
        return (
          <Card {...rest}>
            <Result
              title="500"
              subTitle="Internal server error"
              {...(getResultProps ? getResultProps(response.status) : {})}
              status={500}
            />
          </Card>
        );
    }
  }
  return <Card {...rest} children={children(undefined)} />;
}

export interface PlusCardProps<T> extends Omit<CardProps, 'children'> {
  response?: AxiosResponse<T>;
  children: (value?: T) => ReactNode;
  getResultProps?: (code: number) => ResultProps;
}
