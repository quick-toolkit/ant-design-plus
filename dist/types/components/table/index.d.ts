import React, { ReactNode } from 'react';
import { CardProps, TableProps } from 'antd';
import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { PlusColumnsType } from './types';
/**
 * Table component
 * @param props
 * @constructor
 */
export declare function PlusTable<T extends {}>(props: PlusTableProps<T>): React.ReactElement<CardProps & React.RefAttributes<HTMLDivElement>, string | React.JSXElementConstructor<any>>;
export interface PlusTableProps<T extends {}> extends Omit<TableProps<T>, 'columns'> {
    cardProps?: Omit<CardProps, 'children'>;
    model: ClassConstructor<T>;
    columns?: PlusColumnsType<T>;
    beforeTools?: ReactNode;
    afterTools?: ReactNode;
    onReload?: () => void;
    noStyle?: boolean;
    noTools?: boolean;
}
