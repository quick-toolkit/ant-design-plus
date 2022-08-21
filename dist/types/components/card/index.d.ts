import { CardProps, ResultProps } from 'antd';
import { AxiosResponse } from 'axios';
import { ReactNode } from 'react';
/**
 * Card 组件
 * @param props
 * @constructor
 */
export declare function PlusCard<T>(props: PlusCardProps<T>): JSX.Element;
export interface PlusCardProps<T> extends Omit<CardProps, 'children'> {
    response?: AxiosResponse<T>;
    children: (value: T) => ReactNode;
    getResultProps?: (code: number) => ResultProps;
}
