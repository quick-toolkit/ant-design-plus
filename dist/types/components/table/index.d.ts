import React, { ReactNode } from 'react';
import { TableProps } from 'antd';
import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { PlusColumnsType } from './types';
/**
 * Table component
 * @param props
 * @constructor
 */
export declare function PlusTable<T extends {}>(props: PlusTableProps<T>): React.ReactElement<import("antd").CardProps & React.RefAttributes<HTMLDivElement>, string | React.JSXElementConstructor<any>>;
export interface PlusTableProps<T> extends Omit<TableProps<T>, 'columns'> {
    model: ClassConstructor<T>;
    columns?: PlusColumnsType<T>;
    beforeTools?: ReactNode;
    afterTools?: ReactNode;
    onReload?: () => void;
    noStyle?: boolean;
    noTools?: boolean;
}
