/**
 * MIT License
 *
 * Copyright (c) 2021@quick-toolkit/antd-plus ranyunlong<549510622@qq.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Form, FormItemProps } from 'antd';
import classNames from 'classnames';
import { ApiPropertyDecorate } from '@quick-toolkit/http';
import React, { cloneElement, useContext, useMemo } from 'react';
import { PlusFormContext } from '../form';
import { PlusContext } from '../provider';
import { zh_CN } from '../../locales';

/**
 * 表单Item组件
 * @param props
 * @constructor
 */
export const PlusFormItem = (props: PlusFormItemProps) => {
  const mirrorMap = useContext(PlusFormContext);
  const { locale = zh_CN, antLocale } = useContext(PlusContext);
  const {
    name,
    index,
    label,
    hidden,
    rules = [],
    dependencies,
    shouldUpdate,
    children,
    ...rest
  } = props;
  const child = useMemo(
    () =>
      shouldUpdate || (Array.isArray(dependencies) && dependencies.length)
        ? children
        : React.Children.only(children),
    [children, shouldUpdate, dependencies]
  );

  const { placeholder, ...options } = useMemo<
    FormItemProps & { placeholder?: string }
  >(() => {
    const newProps: FormItemProps & { placeholder?: string } = {
      name,
      rules,
      label,
    };
    if (name && !hidden) {
      const mirror = mirrorMap.get(name);
      if (mirror) {
        mirror.getAllDecorates(ApiPropertyDecorate).forEach((o) => {
          if (o.metadata) {
            const hasRequired = rules.some((rule) => {
              return typeof rule !== 'function' && rule.required !== undefined;
            });
            if (!newProps.label && o.metadata && !newProps.label) {
              if (o.metadata.locales) {
                const lang = o.metadata.locales[locale.language];
                if (lang) {
                  newProps.label = lang || label || o.metadata.description;
                }
              } else {
                newProps.label = label || o.metadata.description;
              }
            }
            if (o.metadata.required !== false && !hasRequired) {
              rules.push({
                required: true,
              });
              newProps.rules = rules;
            }
          }
        });
      }
    }
    if (typeof newProps.label === 'string') {
      if (
        antLocale &&
        antLocale.Form &&
        antLocale.Form.defaultValidateMessages &&
        typeof antLocale.Form.defaultValidateMessages.required === 'string'
      ) {
        newProps.placeholder =
          antLocale.Form.defaultValidateMessages.required.replace(
            // eslint-disable-next-line no-template-curly-in-string
            '${label}',
            newProps.label
          );
      } else {
        newProps.placeholder = newProps.label;
      }

      if (Array.isArray(newProps.rules) && newProps.placeholder) {
        const find: any = newProps.rules.find((rule: any) => rule.required);
        if (find && !find.message) {
          find.message = newProps.placeholder;
        }
      }
    }
    return newProps;
  }, [locale.language, name, rules, label, mirrorMap, hidden, antLocale]);

  return (
    <Form.Item
      {...rest}
      {...options}
      hidden={hidden}
      shouldUpdate={shouldUpdate}
      dependencies={dependencies}
      name={typeof index === 'number' && name ? [index, name] : name}
      className={classNames('mq-plus-form-item', props.className)}
      children={
        shouldUpdate
          ? child
          : cloneElement(child as any, {
              placeholder,
            })
      }
    />
  );
};

export interface PlusFormItemProps extends Omit<FormItemProps, 'name'> {
  index?: number;
  placeholder?: string;
  name?: string;
}
