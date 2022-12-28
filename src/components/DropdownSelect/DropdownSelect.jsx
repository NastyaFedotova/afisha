import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@bem-react/classname';
import { useClickOutside } from '../../hooks/useClickOutside';
import './DropdownSelect.scss';
import { OpenSelectorIcon } from '../../assets';

const cnDropdownSelect = cn('dropdownSelect');

export const DropdownSelect = ({ options, onChange }) => {
    const [title, setTitle] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        onChange(title);
    }, [onChange, title]);

    const refEl = useRef(null);

    const onClickOption = useCallback(
        (item) => () => {
            setTitle(item);
            setIsOpen(false);
        },
        [],
    );
    const onClick = useCallback((event) => {
        event.stopPropagation();
        setIsOpen((prevState) => !prevState);
    }, []);
    const onClickOutside = useCallback(() => {
        setIsOpen(false);
    }, []);

    useClickOutside(refEl, onClickOutside);
    return (
        <div className={cnDropdownSelect()} ref={refEl}>
            <div className={cnDropdownSelect('title-wrapper', { isOpen: isOpen })} onClick={onClick}>
                <div className={cnDropdownSelect('title')}>{title ?? 'Выберите пользователя'}</div>
                <OpenSelectorIcon className={cnDropdownSelect('icon', { isOpen: isOpen })} />
            </div>
            {isOpen && (
                <div className={cnDropdownSelect('options')}>
                    {options?.map((item, index) => (
                        <div
                            className={cnDropdownSelect('option', { current: item === title })}
                            key={index}
                            onClick={onClickOption(item)}
                        >
                            <div className={cnDropdownSelect('title')}>{item}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
